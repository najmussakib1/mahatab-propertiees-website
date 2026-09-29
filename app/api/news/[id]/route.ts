import { NextResponse } from "next/server";
import { getDb, getNewsEventById } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";

export const dynamic = "force-dynamic";

type Params = { params: { id: string } };

export async function PUT(req: Request, { params }: Params) {
  try {
    requireAdmin();
    const id = Number(params.id);
    if (!Number.isFinite(id) || !getNewsEventById(id)) {
      return NextResponse.json({ error: "News item not found" }, { status: 404 });
    }
    const body = await req.json();
    const s = (v: unknown, fallback = "") => (typeof v === "string" ? v.trim() : fallback);
    const category = s(body.category, "news");
    const data = {
      title: s(body.title),
      category: category === "event" ? "event" : "news",
      date: s(body.date),
      excerpt: s(body.excerpt),
      body: s(body.body),
      image: s(body.image),
    };
    if (!data.title) return NextResponse.json({ error: "Title is required" }, { status: 400 });

    getDb()
      .prepare(
        `UPDATE news_events SET title=@title, category=@category, date=@date,
         excerpt=@excerpt, body=@body, image=@image WHERE id=@id`
      )
      .run({ ...data, id });
    return NextResponse.json({ ok: true });
  } catch (err) {
    const message = err instanceof Error && err.message === "Unauthorized" ? "Unauthorized" : "Bad request";
    return NextResponse.json({ error: message }, { status: message === "Unauthorized" ? 401 : 400 });
  }
}

export async function DELETE(_req: Request, { params }: Params) {
  try {
    requireAdmin();
    const id = Number(params.id);
    const db = getDb();
    if (!Number.isFinite(id) || !getNewsEventById(id)) {
      return NextResponse.json({ error: "News item not found" }, { status: 404 });
    }
    db.prepare("DELETE FROM news_events WHERE id = ?").run(id);
    return NextResponse.json({ ok: true });
  } catch (err) {
    const message = err instanceof Error && err.message === "Unauthorized" ? "Unauthorized" : "Bad request";
    return NextResponse.json({ error: message }, { status: message === "Unauthorized" ? 401 : 400 });
  }
}