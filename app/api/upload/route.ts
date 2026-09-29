import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { randomBytes } from "crypto";
import { requireAdmin } from "@/lib/auth";

export const dynamic = "force-dynamic";

const ALLOWED = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/svg+xml",
  "image/avif",
]);
const MAX_BYTES = 4 * 1024 * 1024;

export async function POST(req: Request) {
  try {
    requireAdmin();
    const formData = await req.formData();
    const file = formData.get("file");
    if (!(file instanceof File) || !file.size) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }
    if (!ALLOWED.has(file.type)) {
      return NextResponse.json({ error: "Unsupported file type" }, { status: 400 });
    }
    if (file.size > MAX_BYTES) {
      return NextResponse.json({ error: "File must be under 4MB" }, { status: 400 });
    }

    const ext = path.extname(file.name).toLowerCase() || (file.type === "image/svg+xml" ? ".svg" : ".png");
    const filename = `${Date.now()}-${randomBytes(4).toString("hex")}${ext}`;
    const dir = path.join(process.cwd(), "public", "uploads");
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    const bytes = Buffer.from(await file.arrayBuffer());
    fs.writeFileSync(path.join(dir, filename), bytes);

    return NextResponse.json({ ok: true, url: `/uploads/${filename}` });
  } catch (err) {
    const message = err instanceof Error && err.message === "Unauthorized" ? "Unauthorized" : "Upload failed";
    return NextResponse.json({ error: message }, { status: message === "Unauthorized" ? 401 : 400 });
  }
}