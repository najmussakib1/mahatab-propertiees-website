import crypto from "crypto";

/**
 * Password hashing helpers. The stored format is "salt:hash" where hash is a
 * 64-byte scrypt key (hex). This module has no DB dependency so it can be used
 * freely from both the DB seed code and the auth layer.
 */

const SALT = "mpl-admin-salt";
const KEYLEN = 64;

export function hashPassword(password: string): string {
  const hash = crypto.scryptSync(password, SALT, KEYLEN);
  return `${SALT}:${hash.toString("hex")}`;
}

export function verifyPassword(password: string, stored: string): boolean {
  const [salt, hash] = stored.split(":");
  if (!salt || !hash) return false;
  const candidate = crypto.scryptSync(password, salt, KEYLEN);
  const a = Buffer.from(hash, "hex");
  const b = candidate;
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}