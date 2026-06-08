import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { checkAdminAuth } from "@/lib/admin-auth";

// GET /api/admin/bookings — список всех заявок (только для админа)
export async function GET(req: Request) {
  // Проверяем авторизацию
  const authError = checkAdminAuth(req);
  if (authError) return authError;

  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status"); // фильтр по статусу
  const page = parseInt(searchParams.get("page") ?? "1", 10);
  const perPage = 20;
  const from = (page - 1) * perPage;
  const to = from + perPage - 1;

  let query = supabase
    .from("bookings")
    .select("*", { count: "exact" })
    .order("created_at", { ascending: false })
    .range(from, to);

  if (status && status !== "all") {
    query = query.eq("status", status);
  }

  const { data, error, count } = await query;

  if (error) {
    return NextResponse.json(
      { error: "Не удалось получить заявки" },
      { status: 500 }
    );
  }

  return NextResponse.json({
    bookings: data,
    total: count,
    page,
    perPage,
    totalPages: Math.ceil((count ?? 0) / perPage),
  });
}
