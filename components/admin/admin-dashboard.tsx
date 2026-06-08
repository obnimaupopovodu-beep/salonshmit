"use client";

import { useEffect, useState, useCallback } from "react";
import type { Booking, BookingStatus } from "@/lib/database.types";

const STATUS_LABELS: Record<BookingStatus, string> = {
  new: "Заявка",
  confirmed: "Подтверждена",
  cancelled: "Отменена",
};

const STATUS_STYLES: Record<BookingStatus, string> = {
  new: "bg-amber-100 text-amber-800",
  confirmed: "bg-green-100 text-green-800",
  cancelled: "bg-stone-100 text-stone-500 line-through",
};

const STATUS_FILTERS = [
  { label: "Все", value: "all" },
  { label: "Новые", value: "new" },
  { label: "Подтверждённые", value: "confirmed" },
  { label: "Отменённые", value: "cancelled" },
];

interface AdminDashboardProps {
  authToken: string;
}

export function AdminDashboard({ authToken }: AdminDashboardProps) {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  const fetchBookings = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/bookings?status=${filter}&page=${page}`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      if (!res.ok) throw new Error();
      const data = await res.json();
      setBookings(data.bookings ?? []);
      setTotalPages(data.totalPages ?? 1);
      setTotal(data.total ?? 0);
    } catch {
      setBookings([]);
    } finally {
      setLoading(false);
    }
  }, [filter, page, authToken]);

  useEffect(() => { fetchBookings(); }, [fetchBookings]);
  useEffect(() => { setPage(1); }, [filter]);

  async function updateStatus(id: string, status: BookingStatus) {
    setUpdatingId(id);
    try {
      const res = await fetch(`/api/bookings/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${authToken}` },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error();
      setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, status } : b)));
    } finally {
      setUpdatingId(null);
    }
  }

  async function deleteBooking(id: string) {
    setUpdatingId(id);
    try {
      const res = await fetch(`/api/bookings/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${authToken}` },
      });
      if (!res.ok) throw new Error();
      setBookings((prev) => prev.filter((b) => b.id !== id));
      setTotal((t) => t - 1);
    } finally {
      setUpdatingId(null);
      setConfirmDeleteId(null);
    }
  }

  const formatDate = (iso: string | null) => {
    if (!iso) return "—";
    return new Date(iso).toLocaleDateString("ru-RU", { day: "numeric", month: "short", year: "numeric" });
  };

  const formatCreatedAt = (iso: string) =>
    new Date(iso).toLocaleString("ru-RU", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" });

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Шапка */}
      <header className="sticky top-0 z-40 border-b border-stone-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <div>
            <h1 className="text-xl font-semibold text-stone-900">Записи</h1>
            <p className="text-xs text-stone-500">Салон красоты — панель администратора</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="rounded-full bg-stone-100 px-3 py-1 text-xs font-medium text-stone-600">
              {total} заявок
            </span>
            <button onClick={fetchBookings} className="rounded-full border border-stone-300 px-4 py-2 text-xs font-medium text-stone-700 transition hover:border-stone-500">Обновить</button>
            <a href="/" className="rounded-full border border-stone-300 px-4 py-2 text-xs font-medium text-stone-700 transition hover:border-stone-500">Сайт →</a>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Фильтры */}
        <div className="mb-6 flex flex-wrap gap-2">
          {STATUS_FILTERS.map((f) => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                filter === f.value
                  ? "bg-stone-900 text-white"
                  : "border border-stone-300 bg-white text-stone-700 hover:border-stone-500"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Список */}
        {loading ? (
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-20 animate-pulse rounded-2xl bg-stone-200" />
            ))}
          </div>
        ) : bookings.length === 0 ? (
          <div className="flex flex-col items-center gap-3 py-24 text-center">
            <div className="text-4xl">📂</div>
            <p className="text-lg font-semibold text-stone-900">Заявок нет</p>
            <p className="text-sm text-stone-500">По выбранному фильтру ничего не нашлось</p>
          </div>
        ) : (
          <div className="space-y-3">
            {bookings.map((booking) => (
              <article key={booking.id} className="rounded-2xl border border-stone-200 bg-white p-5 transition hover:shadow-sm">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  {/* Инфо о клиенте */}
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-base font-semibold text-stone-900">{booking.name}</span>
                      <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${STATUS_STYLES[booking.status]}`}>
                        {STATUS_LABELS[booking.status]}
                      </span>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-sm text-stone-600">
                      <a href={`tel:${booking.phone}`} className="font-medium text-stone-900 hover:underline">{booking.phone}</a>
                      <span>💅 {booking.service}</span>
                      {booking.preferred_date && (
                        <span>📅 {formatDate(booking.preferred_date)}{booking.preferred_time ? ` в ${booking.preferred_time}` : ""}</span>
                      )}
                    </div>
                    {booking.comment && (
                      <p className="mt-2 text-xs text-stone-500 italic">«{booking.comment}»</p>
                    )}
                    <p className="mt-2 text-xs text-stone-400">Поступила: {formatCreatedAt(booking.created_at)}</p>
                  </div>

                  {/* Кнопки действий */}
                  <div className="flex shrink-0 flex-wrap items-center gap-2">
                    {booking.status !== "confirmed" && (
                      <button
                        onClick={() => updateStatus(booking.id, "confirmed")}
                        disabled={updatingId === booking.id}
                        className="rounded-full bg-green-600 px-4 py-2 text-xs font-semibold text-white transition hover:bg-green-700 disabled:opacity-50"
                      >
                        ✓ Подтвердить
                      </button>
                    )}
                    {booking.status !== "cancelled" && (
                      <button
                        onClick={() => updateStatus(booking.id, "cancelled")}
                        disabled={updatingId === booking.id}
                        className="rounded-full border border-stone-300 px-4 py-2 text-xs font-semibold text-stone-600 transition hover:border-red-300 hover:text-red-600 disabled:opacity-50"
                      >
                        × Отменить
                      </button>
                    )}
                    {booking.status !== "new" && (
                      <button
                        onClick={() => updateStatus(booking.id, "new")}
                        disabled={updatingId === booking.id}
                        className="rounded-full border border-stone-300 px-4 py-2 text-xs font-semibold text-stone-600 transition hover:border-stone-500 disabled:opacity-50"
                      >
                        ← Вернуть
                      </button>
                    )}

                    {/* Кнопка удаления */}
                    {confirmDeleteId === booking.id ? (
                      <div className="flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-3 py-1.5">
                        <span className="text-xs text-red-700">Удалить навсегда?</span>
                        <button
                          onClick={() => deleteBooking(booking.id)}
                          disabled={updatingId === booking.id}
                          className="text-xs font-semibold text-red-600 hover:text-red-800 disabled:opacity-50"
                        >
                          Да
                        </button>
                        <span className="text-red-300">·</span>
                        <button
                          onClick={() => setConfirmDeleteId(null)}
                          className="text-xs font-semibold text-stone-500 hover:text-stone-700"
                        >
                          Нет
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setConfirmDeleteId(booking.id)}
                        disabled={updatingId === booking.id}
                        aria-label="Удалить заявку"
                        title="Удалить навсегда"
                        className="flex h-9 w-9 items-center justify-center rounded-full border border-stone-200 text-stone-400 transition hover:border-red-300 hover:bg-red-50 hover:text-red-500 disabled:opacity-50"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="3 6 5 6 21 6" />
                          <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                          <path d="M10 11v6" />
                          <path d="M14 11v6" />
                          <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
                        </svg>
                      </button>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Пагинация */}
        {totalPages > 1 && (
          <div className="mt-6 flex items-center justify-center gap-2">
            <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1} className="rounded-full border border-stone-300 px-4 py-2 text-sm font-medium text-stone-700 disabled:opacity-40 hover:border-stone-500">
              ← Назад
            </button>
            <span className="text-sm text-stone-500">{page} / {totalPages}</span>
            <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="rounded-full border border-stone-300 px-4 py-2 text-sm font-medium text-stone-700 disabled:opacity-40 hover:border-stone-500">
              Вперёд →
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
