import { z } from "zod";

// Минимальная дата — сегодня (серверная проверка)
function getTodayISO() {
  return new Date().toISOString().split("T")[0];
}

export const bookingSchema = z.object({
  name: z
    .string()
    .min(2, "Имя должно содержать минимум 2 символа")
    .max(100, "Имя слишком длинное"),
  phone: z
    .string()
    .regex(
      /^\+?[78][\s\-]?\(?\d{3}\)?[\s\-]?\d{3}[\s\-]?\d{2}[\s\-]?\d{2}$/,
      "Введите корректный номер телефона"
    ),
  service: z.string().min(1, "Выберите услугу"),
  preferred_date: z
    .string()
    .date("Введите корректную дату")
    .refine(
      (date) => date >= getTodayISO(),
      "Дата не может быть в прошлом"
    )
    .optional(),
  preferred_time: z.string().optional(),
  comment: z.string().max(500, "Комментарий слишком длинный").optional(),
});

export type BookingFormData = z.infer<typeof bookingSchema>;
