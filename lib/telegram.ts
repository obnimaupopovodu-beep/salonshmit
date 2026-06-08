import type { Booking } from "./database.types";

const STATUS_LABELS: Record<string, string> = {
  new: "🆕 Новая",
  confirmed: "✅ Подтверждена",
  cancelled: "❌ Отменена",
};

export async function sendTelegramNotification(booking: Booking) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    console.warn("Telegram credentials not configured, skipping notification");
    return;
  }

  const date = booking.preferred_date
    ? new Date(booking.preferred_date).toLocaleDateString("ru-RU")
    : "не указана";

  const time = booking.preferred_time ?? "не указано";

  const text = [
    `📋 *Новая запись в салон*`,
    ``,
    `👤 *Имя:* ${escapeMarkdown(booking.name)}`,
    `📞 *Телефон:* ${escapeMarkdown(booking.phone)}`,
    `💅 *Услуга:* ${escapeMarkdown(booking.service)}`,
    `📅 *Дата:* ${date}`,
    `🕐 *Время:* ${time}`,
    booking.comment ? `💬 *Комментарий:* ${escapeMarkdown(booking.comment)}` : null,
    ``,
    `🔖 *Статус:* ${STATUS_LABELS[booking.status] ?? booking.status}`,
    `🆔 ID: \`${booking.id}\``,
  ]
    .filter(Boolean)
    .join("\n");

  const res = await fetch(
    `https://api.telegram.org/bot${token}/sendMessage`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: "Markdown",
      }),
    }
  );

  if (!res.ok) {
    const err = await res.text();
    console.error("Telegram API error:", err);
  }
}

function escapeMarkdown(text: string): string {
  return text.replace(/[_*[\]()~`>#+\-=|{}.!]/g, "\\$&");
}
