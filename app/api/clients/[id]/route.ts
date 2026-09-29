import { NextResponse } from "next/server";
import { getDb, getClients } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";

export const dynamic = "force-dynamic";

type Params = { params: { id: string } };

export async function PUT(req: Request, { params }: Params) {
  try {
    requireAdmin();
    const id = Number(params.id);
    const existing = getClients().find((c) => c.id === id);
    if (!Number.isFinite(id) || !existing) {
      return NextResponse.json({ error: "Client not found" }, { status: 404 });
    }
    const body = await req.json();
    const name = typeof body.name === "string" ? body.name.trim() : "";
    const logo = typeof body.logo === "string" ? body.logo.trim() : existing.logo;
    if (!name) return NextResponse.json({ error: "Name is required" }, { status: 400 });

    getDb().prepare("UPDATE clients SET name = ?, logo = ? WHERE id = ?").run(name, logo, id);
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
    const existing = getClients().find((c) => c.id === id);
    if (!Number.isFinite(id) || !existing) {
      return NextResponse.json({ error: "Client not found" }, { status: 404 });
    }
    db.prepare("DELETE FROM clients WHERE id = ?").run(id);
    return NextResponse.json({ ok: true });
  } catch (err) {
    const message = err instanceof Error && err.message === "Unauthorized" ? "Unauthorized" : "Bad request";
    return NextResponse.json({ error: message }, { status: message === "Unauthorized" ? 401 : 400 });
  }
}