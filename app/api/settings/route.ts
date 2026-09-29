import { NextResponse } from "next/server";
import {
  isClientsSectionEnabled,
  setClientsSectionEnabled,
} from "@/lib/db";
import { requireAdmin } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({ showClientsSection: isClientsSectionEnabled() });
}

export async function PUT(req: Request) {
  try {
    requireAdmin();
    const body = await req.json();
    if (typeof body.showClientsSection !== "boolean") {
      return NextResponse.json(
        { error: "showClientsSection must be a boolean" },
        { status: 400 }
      );
    }
    setClientsSectionEnabled(body.showClientsSection);
    return NextResponse.json({ ok: true, showClientsSection: body.showClientsSection });
  } catch (err) {
    const message = err instanceof Error && err.message === "Unauthorized" ? "Unauthorized" : "Bad request";
    return NextResponse.json({ error: message }, { status: message === "Unauthorized" ? 401 : 400 });
  }
}