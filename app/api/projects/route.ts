import { NextResponse } from "next/server";
import { getDb, getProjects } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";

export const dynamic = "force-dynamic";

function normalizeProject(body: Record<string, unknown>) {
  const s = (v: unknown, fallback = "") => (typeof v === "string" ? v.trim() : fallback);
  const arr = (v: unknown, fallback: string[] = []) =>
    Array.isArray(v) ? v.filter((x): x is string => typeof x === "string").map((x) => x.trim()).filter(Boolean) : fallback;
  const status = s(body.status, "ongoing");
  return {
    name: s(body.name),
    location: s(body.location),
    status: status === "closed" ? "closed" : "ongoing",
    type: s(body.type),
    image: s(body.image),
    description: s(body.description),
    area: s(body.area),
    units: s(body.units),
    floors: s(body.floors),
    facing: s(body.facing),
    parking: s(body.parking),
    handover: s(body.handover),
    brochure: s(body.brochure),
    gallery: JSON.stringify(arr(body.gallery)),
    features: JSON.stringify(arr(body.features)),
    map_lat: s(body.map_lat),
    map_lng: s(body.map_lng),
  };
}

export async function GET() {
  return NextResponse.json(getProjects());
}

export async function POST(req: Request) {
  try {
    requireAdmin();
    const body = await req.json();
    const data = normalizeProject(body);
    if (!data.name) return NextResponse.json({ error: "Name is required" }, { status: 400 });

    const db = getDb();
    const maxOrder = (db.prepare("SELECT COALESCE(MAX(sort_order),0) AS m FROM projects").get() as { m: number }).m;
    const res = db
      .prepare(
        `INSERT INTO projects (name, location, status, type, image, description, area, units, floors, facing, parking, handover, brochure, gallery, features, map_lat, map_lng, sort_order)
         VALUES (@name, @location, @status, @type, @image, @description, @area, @units, @floors, @facing, @parking, @handover, @brochure, @gallery, @features, @map_lat, @map_lng, @sort_order)`
      )
      .run({ ...data, sort_order: maxOrder + 1 });
    return NextResponse.json({ ok: true, id: Number(res.lastInsertRowid) }, { status: 201 });
  } catch (err) {
    const message = err instanceof Error && err.message === "Unauthorized" ? "Unauthorized" : "Bad request";
    return NextResponse.json({ error: message }, { status: message === "Unauthorized" ? 401 : 400 });
  }
}