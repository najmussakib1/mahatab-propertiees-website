import crypto from "crypto";
import { cookies } from "next/headers";

export const ADMIN_COOKIE = "mpl_admin";

const SECRET = process.env.ADMIN_SECRET || "mpl-admin-dev-secret";
const SESSION_TTL_MS = 1000 * 60 * 60 * 12; // 12 hours

interface SessionPayload {
  username: string;
  iat: number;
  exp: number;
}

function b64url(input: string): string {
  return Buffer.from(input).toString("base64url");
}

function fromB64url(input: string): string {
  return Buffer.from(input, "base64url").toString("utf8");
}

export function createSessionToken(username: string): string {
  const now = Date.now();
  const payload: SessionPayload = { username, iat: now, exp: now + SESSION_TTL_MS };
  const body = b64url(JSON.stringify(payload));
  const sig = crypto.createHmac("sha256", SECRET).update(body).digest("base64url");
  return `${body}.${sig}`;
}

export function verifySessionToken(token: string | undefined): SessionPayload | null {
  if (!token) return null;
  const [body, sig] = token.split(".");
  if (!body || !sig) return null;
  const expected = crypto.createHmac("sha256", SECRET).update(body).digest("base64url");
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return null;
  try {
    const payload = JSON.parse(fromB64url(body)) as SessionPayload;
    if (typeof payload.username !== "string" || payload.exp < Date.now()) return null;
    return payload;
  } catch {
    return null;
  }
}

/** Returns the logged-in username or null when the session is invalid/expired. */
export function getSession(): string | null {
  const store = cookies();
  const token = store.get(ADMIN_COOKIE)?.value;
  const payload = verifySessionToken(token);
  return payload ? payload.username : null;
}

/** Verifies a session and throws an error if not authenticated (for route handlers). */
export function requireAdmin(): string {
  const username = getSession();
  if (!username) {
    throw new Error("Unauthorized");
  }
  return username;
}