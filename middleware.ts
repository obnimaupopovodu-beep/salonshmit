import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Защищаем только /admin (не /admin/login и не /api)
  if (pathname === "/admin" || pathname.startsWith("/admin/") && !pathname.startsWith("/admin/login")) {
    const authParam = req.nextUrl.searchParams.get("auth");
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminPassword || authParam !== adminPassword) {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};
