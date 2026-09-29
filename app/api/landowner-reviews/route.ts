import { NextResponse } from "next/server";
import { getDb, getLandownerReviews } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";

export const dynamic = "force-dynamic";

function normalizeReview(body: Record<string, unknown>) {
  const s = (v: unknown, fallback = "") => (typeof v === "string" ? v.trim() : fallback);
  return {
    name: s(body.name),
    role: s(body.role),
    company: s(body.company),
    comment: s(body.comment),
    avatar: s(body.avatar),
  };
}

export async function GET() {
  return NextResponse.json(getLandownerReviews());
}

export async function POST(req: Request) {
  try {
    requireAdmin();
    const body = await req.json();
    const data = normalizeReview(body);
    if (!data.name) return NextResponse.json({ error: "Name is required" }, { status: 400 });

    const db = getDb();
    const maxOrder = (db.prepare("SELECT COALESCE(MAX(sort_order),0) AS m FROM landowner_reviews").get() as { m: number }).m;
    const res = db
      .prepare(
        `INSERT INTO landowner_reviews (name, role, company, comment, avatar, sort_order)
         VALUES (@name, @role, @company, @comment, @avatar, @sort_order)`
      )
      .run({ ...data, sort_order: maxOrder + 1 });
    return NextResponse.json({ ok: true, id: Number(res.lastInsertRowid) }, { status: 201 });
  } catch (err) {
    const message = err instanceof Error && err.message === "Unauthorized" ? "Unauthorized" : "Bad request";
    return NextResponse.json({ error: message }, { status: message === "Unauthorized" ? 401 : 400 });
  }
}