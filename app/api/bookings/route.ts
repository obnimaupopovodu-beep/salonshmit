import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { bookingSchema } from "@/lib/validations";
import { sendTelegramNotification } from "@/lib/telegram";
import { rateLimit } from "@/lib/rate-limit";

export async function POST(req: Request) {
  // Rate limiting: 5 заявок в минуту с одного IP
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    req.headers.get("x-real-ip") ??
    "unknown";

  const { success } = rateLimit(ip, { limit: 5, windowMs: 60_000 });
  if (!success) {
    return NextResponse.json(
      { error: "Слишком много запросов. Попробуйте через минуту." },
      { status: 429 }
    );
  }

  try {
    const body = await req.json();

    const parsed = bookingSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Ошибка валидации", details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const data = parsed.data;

    const { data: booking, error } = await supabase
      .from("bookings")
      .insert([{
        name: data.name,
        phone: data.phone,
        service: data.service,
        preferred_date: data.preferred_date ?? null,
        preferred_time: data.preferred_time ?? null,
        comment: data.comment ?? null,
        status: "new",
      }])
      .select()
      .single();

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json(
        { error: "Не удалось сохранить заявку" },
        { status: 500 }
      );
    }

    sendTelegramNotification(booking).catch(console.error);

    return NextResponse.json({ success: true, booking }, { status: 201 });
  } catch (err) {
    console.error("Unexpected error:", err);
    return NextResponse.json(
      { error: "Внутренняя ошибка сервера" },
      { status: 500 }
    );
  }
}
