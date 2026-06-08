import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { checkAdminAuth } from "@/lib/admin-auth";
import type { BookingStatus } from "@/lib/database.types";

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const authError = checkAdminAuth(req);
  if (authError) return authError;

  const { status } = (await req.json()) as { status?: unknown };
  const allowed: BookingStatus[] = ["new", "confirmed", "cancelled"];
  if (typeof status !== "string" || !allowed.includes(status as BookingStatus)) {
    return NextResponse.json({ error: "Недопустимый статус" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("bookings")
    .update({ status: status as BookingStatus })
    .eq("id", params.id)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true, booking: data });
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const authError = checkAdminAuth(req);
  if (authError) return authError;

  const { error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", params.id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
