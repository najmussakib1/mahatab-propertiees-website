import { NextResponse } from "next/server";
import { getDb, getMessages } from "@/lib/db";
import { getSession } from "@/lib/auth";

export const dynamic = "force-dynamic";

/** Public: list messages (GET guarded for admin only). */
export async function GET() {
  const session = getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.json(getMessages());
}

/** Public: contact form submission. */
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const s = (v: unknown, fallback = "") =>
      typeof v === "string" ? v.slice(0, 4000).trim() : fallback;
    const name = s(body.name);
    const message = s(body.message);
    if (!name || !message) {
      return NextResponse.json({ error: "Name and message are required" }, { status: 400 });
    }
    const data = {
      name,
      email: s(body.email),
      phone: s(body.phone),
      subject: s(body.subject),
      message,
    };
    getDb()
      .prepare(
        "INSERT INTO messages (name, email, phone, subject, message, is_read) VALUES (@name, @email, @phone, @subject, @message, 0)"
      )
      .run(data);
    return NextResponse.json({ ok: true }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }
}