"use client";

import { useState } from "react";
import type { BookingFormData } from "@/lib/validations";

const SERVICES = [
  "Женская стрижка",
  "Мужская стрижка",
  "Детская стрижка",
  "Укладка / вечерняя причёска",
  "Окрашивание / мелирование",
  "Кератиновое выпрямление",
  "Маникюр",
  "Педикюр",
  "Покрытие гель-лак",
  "Косметология",
  "Брови / ресницы",
  "Эпиляция",
  "Другая услуга",
];

const TIME_SLOTS = [
  "09:00", "10:00", "11:00", "12:00", "13:00",
  "14:00", "15:00", "16:00", "17:00", "18:00",
  "19:00", "20:00",
];

type FormStatus = "idle" | "loading" | "success" | "error";
type FieldErrors = Partial<Record<keyof BookingFormData, string[]>>;

interface BookingFormProps {
  phoneDisplay: string;
  phoneHref: string;
}

export function BookingForm({ phoneDisplay, phoneHref }: BookingFormProps) {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [errorMessage, setErrorMessage] = useState("");

  // Минимальная дата — сегодня
  const today = new Date().toISOString().split("T")[0];
  // Максимальная — 60 дней вперёд
  const maxDate = new Date(Date.now() + 60 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split("T")[0];

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setFieldErrors({});
    setErrorMessage("");

    const formData = new FormData(e.currentTarget);
    const payload = {
      name: formData.get("name") as string,
      phone: formData.get("phone") as string,
      service: formData.get("service") as string,
      preferred_date: (formData.get("preferred_date") as string) || undefined,
      preferred_time: (formData.get("preferred_time") as string) || undefined,
      comment: (formData.get("comment") as string) || undefined,
    };

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const json = await res.json();

      if (!res.ok) {
        if (json.details) {
          setFieldErrors(json.details);
        } else {
          setErrorMessage(json.error ?? "Что-то пошло не так. Попробуйте ещё раз.");
        }
        setStatus("error");
        return;
      }

      setStatus("success");
    } catch {
      setErrorMessage("Нет связи. Позвоните нам напрямую.");
      setStatus("error");
    }
  }

  // --- Успех ---
  if (status === "success") {
    return (
      <div className="rounded-[2rem] bg-stone-50 p-8 text-stone-900 shadow-[0_24px_80px_rgba(12,10,9,0.22)] flex flex-col items-center text-center gap-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-stone-900">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h3 className="text-2xl font-semibold">Заявка принята!</h3>
        <p className="max-w-sm text-sm leading-7 text-stone-600">
          Администратор свяжется с вами в ближайшее время для подтверждения записи и уточнения деталей.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-2 rounded-full border border-stone-300 px-6 py-3 text-sm font-semibold text-stone-900 transition hover:border-stone-500"
        >
          Записаться ещё раз
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="overflow-hidden rounded-[2rem] bg-stone-50 p-4 sm:p-6 text-stone-900 shadow-[0_24px_80px_rgba(12,10,9,0.22)]"
      noValidate
    >
      <div className="grid gap-5 sm:grid-cols-2">

        {/* Имя */}
        <div className="sm:col-span-1">
          <label htmlFor="name" className="text-sm font-medium text-stone-700">
            Имя <span className="text-stone-400">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="given-name"
            required
            className={`mt-2 w-full rounded-2xl border bg-white px-4 py-3 outline-none transition placeholder:text-stone-400 focus:border-stone-900 ${
              fieldErrors.name ? "border-red-400" : "border-stone-300"
            }`}
            placeholder="Как к вам обращаться"
          />
          {fieldErrors.name && (
            <p className="mt-1 text-xs text-red-500">{fieldErrors.name[0]}</p>
          )}
        </div>

        {/* Телефон */}
        <div className="sm:col-span-1">
          <label htmlFor="phone" className="text-sm font-medium text-stone-700">
            Телефон <span className="text-stone-400">*</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            required
            className={`mt-2 w-full rounded-2xl border bg-white px-4 py-3 outline-none transition placeholder:text-stone-400 focus:border-stone-900 ${
              fieldErrors.phone ? "border-red-400" : "border-stone-300"
            }`}
            placeholder="+7 (___) ___-__-__"
          />
          {fieldErrors.phone && (
            <p className="mt-1 text-xs text-red-500">{fieldErrors.phone[0]}</p>
          )}
        </div>

        {/* Услуга */}
        <div className="sm:col-span-2">
          <label htmlFor="service" className="text-sm font-medium text-stone-700">
            Услуга <span className="text-stone-400">*</span>
          </label>
          <select
            id="service"
            name="service"
            required
            defaultValue=""
            className={`mt-2 w-full rounded-2xl border bg-white px-4 py-3 outline-none transition focus:border-stone-900 ${
              fieldErrors.service ? "border-red-400" : "border-stone-300"
            }`}
          >
            <option value="" disabled>Выберите направление</option>
            {SERVICES.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          {fieldErrors.service && (
            <p className="mt-1 text-xs text-red-500">{fieldErrors.service[0]}</p>
          )}
        </div>

        {/* Дата */}
        <div className="min-w-0 sm:col-span-1">
          <label htmlFor="preferred_date" className="text-sm font-medium text-stone-700">
            Удобная дата
          </label>
          <input
            id="preferred_date"
            name="preferred_date"
            type="date"
            min={today}
            max={maxDate}
            className="mt-2 w-full min-w-0 rounded-2xl border border-stone-300 bg-white px-2 py-3 sm:px-4 outline-none transition focus:border-stone-900"
          />
        </div>

        {/* Время */}
        <div className="min-w-0 sm:col-span-1">
          <label htmlFor="preferred_time" className="text-sm font-medium text-stone-700">
            Удобное время
          </label>
          <select
            id="preferred_time"
            name="preferred_time"
            defaultValue=""
            className="mt-2 w-full min-w-0 rounded-2xl border border-stone-300 bg-white px-2 py-3 sm:px-4 outline-none transition focus:border-stone-900"
          >
            <option value="">Любое</option>
            {TIME_SLOTS.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>

        {/* Комментарий */}
        <div className="sm:col-span-2">
          <label htmlFor="comment" className="text-sm font-medium text-stone-700">
            Комментарий
          </label>
          <textarea
            id="comment"
            name="comment"
            rows={3}
            maxLength={500}
            className="mt-2 w-full resize-none rounded-2xl border border-stone-300 bg-white px-4 py-3 outline-none transition placeholder:text-stone-400 focus:border-stone-900"
            placeholder="Пожелания, уточнения или вопросы к мастеру"
          />
          {fieldErrors.comment && (
            <p className="mt-1 text-xs text-red-500">{fieldErrors.comment[0]}</p>
          )}
        </div>
      </div>

      {/* Общая ошибка */}
      {status === "error" && errorMessage && (
        <div className="mt-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {errorMessage}
        </div>
      )}

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <button
          type="submit"
          disabled={status === "loading"}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-stone-900 px-6 py-4 text-sm font-semibold text-white transition hover:bg-stone-800 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {status === "loading" ? (
            <>
              <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z" />
              </svg>
              Отправляем...
            </>
          ) : (
            "Отправить заявку"
          )}
        </button>
        <a
          href={phoneHref}
          className="inline-flex items-center justify-center rounded-full border border-stone-300 px-6 py-4 text-sm font-semibold text-stone-900 transition hover:border-stone-400"
        >
          {phoneDisplay}
        </a>
      </div>

      <p className="mt-4 text-sm leading-6 text-stone-500">
        Администратор свяжется с вами для подтверждения записи и уточнения деталей.
      </p>
    </form>
  );
}