import { NextResponse } from "next/server";
import { getDb, getNewsEvents } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";

export const dynamic = "force-dynamic";

function normalizeNews(body: Record<string, unknown>) {
  const s = (v: unknown, fallback = "") => (typeof v === "string" ? v.trim() : fallback);
  const category = s(body.category, "news");
  return {
    title: s(body.title),
    category: category === "event" ? "event" : "news",
    date: s(body.date),
    excerpt: s(body.excerpt),
    body: s(body.body),
    image: s(body.image),
  };
}

export async function GET() {
  return NextResponse.json(getNewsEvents());
}

export async function POST(req: Request) {
  try {
    requireAdmin();
    const body = await req.json();
    const data = normalizeNews(body);
    if (!data.title) return NextResponse.json({ error: "Title is required" }, { status: 400 });

    const db = getDb();
    const maxOrder = (db.prepare("SELECT COALESCE(MAX(sort_order),0) AS m FROM news_events").get() as { m: number }).m;
    const res = db
      .prepare(
        `INSERT INTO news_events (title, category, date, excerpt, body, image, sort_order)
         VALUES (@title, @category, @date, @excerpt, @body, @image, @sort_order)`
      )
      .run({ ...data, sort_order: maxOrder + 1 });
    return NextResponse.json({ ok: true, id: Number(res.lastInsertRowid) }, { status: 201 });
  } catch (err) {
    const message = err instanceof Error && err.message === "Unauthorized" ? "Unauthorized" : "Bad request";
    return NextResponse.json({ error: message }, { status: message === "Unauthorized" ? 401 : 400 });
  }
}