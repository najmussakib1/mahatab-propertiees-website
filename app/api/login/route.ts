import { NextResponse } from "next/server";
import { getAdminByUsername } from "@/lib/db";
import { verifyPassword } from "@/lib/password";
import { ADMIN_COOKIE, createSessionToken } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const username = String(body.username || "").trim();
    const password = String(body.password || "");

    const admin = getAdminByUsername(username);
    if (!admin || !verifyPassword(password, admin.password_hash)) {
      return NextResponse.json({ error: "Invalid username or password" }, { status: 401 });
    }

    const res = NextResponse.json({ ok: true, username: admin.username });
    res.cookies.set(ADMIN_COOKIE, createSessionToken(admin.username), {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 12,
    });
    return res;
  } catch {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }
}