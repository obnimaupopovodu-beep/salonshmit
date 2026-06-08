/**
 * Простой in-memory rate limiter для API-маршрутов.
 * Ограничивает количество запросов с одного IP.
 * Для production лучше использовать Redis (Upstash).
 */

const requests = new Map<string, { count: number; resetAt: number }>();

interface RateLimitOptions {
  /** Максимум запросов за windowMs */
  limit: number;
  /** Окно в миллисекундах */
  windowMs: number;
}

export function rateLimit(
  ip: string,
  options: RateLimitOptions = { limit: 5, windowMs: 60_000 }
): { success: boolean; remaining: number } {
  const now = Date.now();
  const entry = requests.get(ip);

  if (!entry || now > entry.resetAt) {
    requests.set(ip, { count: 1, resetAt: now + options.windowMs });
    return { success: true, remaining: options.limit - 1 };
  }

  if (entry.count >= options.limit) {
    return { success: false, remaining: 0 };
  }

  entry.count++;
  return { success: true, remaining: options.limit - entry.count };
}
