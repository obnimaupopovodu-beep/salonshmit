import { NextResponse } from "next/server";

/**
 * Простая проверка авторизации для API-маршрутов админ-панели.
 * Клиент передаёт пароль в заголовке: Authorization: Bearer <ADMIN_PASSWORD>
 */
export function checkAdminAuth(req: Request): NextResponse | null {
  const authHeader = req.headers.get("authorization");
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminPassword) {
    console.error("ADMIN_PASSWORD is not set in environment variables");
    return NextResponse.json(
      { error: "Сервер не настроен" },
      { status: 500 }
    );
  }

  if (!authHeader || authHeader !== `Bearer ${adminPassword}`) {
    return NextResponse.json(
      { error: "Доступ запрещён" },
      { status: 401 }
    );
  }

  return null; // авторизация прошла успешно
}
