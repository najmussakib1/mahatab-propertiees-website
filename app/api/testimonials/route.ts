import { NextResponse } from "next/server";
import { getDb, getTestimonials } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json(getTestimonials());
}

export async function POST(req: Request) {
  try {
    requireAdmin();
    const body = await req.json();
    const s = (v: unknown, fallback = "") => (typeof v === "string" ? v.trim() : fallback);
    const data = {
      name: s(body.name),
      role: s(body.role),
      company: s(body.company),
      comment: s(body.comment),
      avatar: s(body.avatar),
    };
    if (!data.name) return NextResponse.json({ error: "Name is required" }, { status: 400 });

    const db = getDb();
    const maxOrder = (db.prepare("SELECT COALESCE(MAX(sort_order),0) AS m FROM testimonials").get() as { m: number }).m;
    const res = db
      .prepare(
        "INSERT INTO testimonials (name, role, company, comment, avatar, sort_order) VALUES (@name, @role, @company, @comment, @avatar, @sort_order)"
      )
      .run({ ...data, sort_order: maxOrder + 1 });
    return NextResponse.json({ ok: true, id: Number(res.lastInsertRowid) }, { status: 201 });
  } catch (err) {
    const message = err instanceof Error && err.message === "Unauthorized" ? "Unauthorized" : "Bad request";
    return NextResponse.json({ error: message }, { status: message === "Unauthorized" ? 401 : 400 });
  }
}