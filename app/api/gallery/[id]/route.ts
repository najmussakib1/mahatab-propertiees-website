import { NextResponse } from "next/server";
import { getDb, getGalleryImageById, GALLERY_CATEGORIES } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";

export const dynamic = "force-dynamic";

type Params = { params: { id: string } };

export async function PUT(req: Request, { params }: Params) {
  try {
    requireAdmin();
    const id = Number(params.id);
    if (!Number.isFinite(id) || !getGalleryImageById(id)) {
      return NextResponse.json({ error: "Gallery image not found" }, { status: 404 });
    }
    const body = await req.json();
    const s = (v: unknown, fallback = "") => (typeof v === "string" ? v.trim() : fallback);
    const category = s(body.category, "handover");
    const data = {
      title: s(body.title),
      category: GALLERY_CATEGORIES.some((c) => c.value === category) ? category : "handover",
      image: s(body.image),
    };
    if (!data.title) return NextResponse.json({ error: "Title is required" }, { status: 400 });
    if (!data.image) return NextResponse.json({ error: "Image is required" }, { status: 400 });

    getDb()
      .prepare(`UPDATE gallery SET title=@title, category=@category, image=@image WHERE id=@id`)
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
    if (!Number.isFinite(id) || !getGalleryImageById(id)) {
      return NextResponse.json({ error: "Gallery image not found" }, { status: 404 });
    }
    getDb().prepare("DELETE FROM gallery WHERE id = ?").run(id);
    return NextResponse.json({ ok: true });
  } catch (err) {
    const message = err instanceof Error && err.message === "Unauthorized" ? "Unauthorized" : "Bad request";
    return NextResponse.json({ error: message }, { status: message === "Unauthorized" ? 401 : 400 });
  }
}