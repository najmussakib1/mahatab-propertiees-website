import { NextResponse } from "next/server";
import { getDb, getTestimonials } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";

export const dynamic = "force-dynamic";

type Params = { params: { id: string } };

export async function PUT(req: Request, { params }: Params) {
  try {
    requireAdmin();
    const id = Number(params.id);
    const existing = getTestimonials().find((t) => t.id === id);
    if (!Number.isFinite(id) || !existing) {
      return NextResponse.json({ error: "Testimonial not found" }, { status: 404 });
    }
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

    getDb()
      .prepare(
        "UPDATE testimonials SET name=@name, role=@role, company=@company, comment=@comment, avatar=@avatar WHERE id=@id"
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
    const existing = getTestimonials().find((t) => t.id === id);
    if (!Number.isFinite(id) || !existing) {
      return NextResponse.json({ error: "Testimonial not found" }, { status: 404 });
    }
    db.prepare("DELETE FROM testimonials WHERE id = ?").run(id);
    return NextResponse.json({ ok: true });
  } catch (err) {
    const message = err instanceof Error && err.message === "Unauthorized" ? "Unauthorized" : "Bad request";
    return NextResponse.json({ error: message }, { status: message === "Unauthorized" ? 401 : 400 });
  }
}