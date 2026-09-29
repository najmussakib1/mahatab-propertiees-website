import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET() {
  const username = getSession();
  return NextResponse.json({ authenticated: Boolean(username), username: username || null });
}