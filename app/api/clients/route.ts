import { NextResponse } from "next/server";
import { getDb, getClients } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json(getClients());
}

export async function POST(req: Request) {
  try {
    requireAdmin();
    const body = await req.json();
    const name = typeof body.name === "string" ? body.name.trim() : "";
    const logo = typeof body.logo === "string" ? body.logo.trim() : "";
    if (!name) return NextResponse.json({ error: "Name is required" }, { status: 400 });

    const res = getDb()
      .prepare("INSERT INTO clients (name, logo) VALUES (?, ?)")
      .run(name, logo);
    return NextResponse.json({ ok: true, id: Number(res.lastInsertRowid) }, { status: 201 });
  } catch (err) {
    const message = err instanceof Error && err.message === "Unauthorized" ? "Unauthorized" : "Bad request";
    return NextResponse.json({ error: message }, { status: message === "Unauthorized" ? 401 : 400 });
  }
}