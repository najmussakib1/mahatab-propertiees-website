import { NextResponse } from "next/server";
import { getDb, getGalleryImages, GALLERY_CATEGORIES } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";

export const dynamic = "force-dynamic";

function normalizeGallery(body: Record<string, unknown>) {
  const s = (v: unknown, fallback = "") => (typeof v === "string" ? v.trim() : fallback);
  const category = s(body.category, "handover");
  return {
    title: s(body.title),
    category: GALLERY_CATEGORIES.some((c) => c.value === category) ? category : "handover",
    image: s(body.image),
  };
}

export async function GET() {
  return NextResponse.json(getGalleryImages());
}

export async function POST(req: Request) {
  try {
    requireAdmin();
    const body = await req.json();
    const data = normalizeGallery(body);
    if (!data.title) return NextResponse.json({ error: "Title is required" }, { status: 400 });
    if (!data.image) return NextResponse.json({ error: "Image is required" }, { status: 400 });

    const db = getDb();
    const maxOrder = (db.prepare("SELECT COALESCE(MAX(sort_order),0) AS m FROM gallery").get() as { m: number }).m;
    const res = db
      .prepare(
        `INSERT INTO gallery (title, category, image, sort_order)
         VALUES (@title, @category, @image, @sort_order)`
      )
      .run({ ...data, sort_order: maxOrder + 1 });
    return NextResponse.json({ ok: true, id: Number(res.lastInsertRowid) }, { status: 201 });
  } catch (err) {
    const message = err instanceof Error && err.message === "Unauthorized" ? "Unauthorized" : "Bad request";
    return NextResponse.json({ error: message }, { status: message === "Unauthorized" ? 401 : 400 });
  }
}