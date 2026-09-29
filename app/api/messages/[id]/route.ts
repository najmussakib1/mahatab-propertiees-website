import { NextResponse } from "next/server";
import { getDb, getMessages } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";

export const dynamic = "force-dynamic";

type Params = { params: { id: string } };

export async function PATCH(req: Request, { params }: Params) {
  try {
    requireAdmin();
    const id = Number(params.id);
    const existing = getMessages().find((m) => m.id === id);
    if (!Number.isFinite(id) || !existing) {
      return NextResponse.json({ error: "Message not found" }, { status: 404 });
    }
    const body = await req.json().catch(() => ({}));
    const isRead = body.is_read === undefined ? 1 : body.is_read ? 1 : 0;
    getDb().prepare("UPDATE messages SET is_read = ? WHERE id = ?").run(isRead, id);
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
    const existing = getMessages().find((m) => m.id === id);
    if (!Number.isFinite(id) || !existing) {
      return NextResponse.json({ error: "Message not found" }, { status: 404 });
    }
    db.prepare("DELETE FROM messages WHERE id = ?").run(id);
    return NextResponse.json({ ok: true });
  } catch (err) {
    const message = err instanceof Error && err.message === "Unauthorized" ? "Unauthorized" : "Bad request";
    return NextResponse.json({ error: message }, { status: message === "Unauthorized" ? 401 : 400 });
  }
}