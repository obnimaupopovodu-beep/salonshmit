import { z } from "zod";

export const bookingSchema = z.object({
  name: z
    .string()
    .min(2, "Имя должно содержать минимум 2 символа")
    .max(100, "Имя слишком длинное"),
  phone: z
    .string()
    .regex(
      /^[\+]?[7|8]?[\s\-]?\(?[0-9]{3}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/,
      "Введите корректный номер телефона"
    ),
  service: z.string().min(1, "Выберите услугу"),
  preferred_date: z.string().optional(),
  preferred_time: z.string().optional(),
  comment: z.string().max(500, "Комментарий слишком длинный").optional(),
});

export type BookingFormData = z.infer<typeof bookingSchema>;
