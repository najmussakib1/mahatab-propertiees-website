import { NextResponse } from "next/server";
import { getDb, getProjectById } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";

export const dynamic = "force-dynamic";

type Params = { params: { id: string } };

export async function PUT(req: Request, { params }: Params) {
  try {
    requireAdmin();
    const id = Number(params.id);
    if (!Number.isFinite(id) || !getProjectById(id)) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }
    const body = await req.json();
    const s = (v: unknown, fallback = "") => (typeof v === "string" ? v.trim() : fallback);
    const arr = (v: unknown, fallback: string[] = []) =>
      Array.isArray(v) ? v.filter((x): x is string => typeof x === "string").map((x) => x.trim()).filter(Boolean) : fallback;
    const data = {
      name: s(body.name),
      location: s(body.location),
      status: s(body.status, "ongoing") === "closed" ? "closed" : "ongoing",
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
    if (!data.name) return NextResponse.json({ error: "Name is required" }, { status: 400 });

    getDb()
      .prepare(
        `UPDATE projects SET name=@name, location=@location, status=@status, type=@type, image=@image,
         description=@description, area=@area, units=@units, floors=@floors, facing=@facing, parking=@parking,
         handover=@handover, brochure=@brochure, gallery=@gallery, features=@features, map_lat=@map_lat, map_lng=@map_lng WHERE id=@id`
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
    if (!Number.isFinite(id) || !getProjectById(id)) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }
    db.prepare("DELETE FROM projects WHERE id = ?").run(id);
    return NextResponse.json({ ok: true });
  } catch (err) {
    const message = err instanceof Error && err.message === "Unauthorized" ? "Unauthorized" : "Bad request";
    return NextResponse.json({ error: message }, { status: message === "Unauthorized" ? 401 : 400 });
  }
}