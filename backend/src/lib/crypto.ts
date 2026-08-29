import crypto from "node:crypto";

/**
 * Envelope encryption for bank account numbers.
 *
 * AES-256-GCM: authenticated, so a tampered ciphertext fails to decrypt rather
 * than silently returning garbage that we might then wire money to. A fresh
 * random IV per encryption means the same account number stored twice produces
 * different ciphertext, so the database cannot be scanned for duplicates.
 *
 * ────────────────────────────────────────────────────────────────────────────
 * PRODUCTION REQUIREMENT, NOT YET MET
 *
 * The key is read from KYC_ENCRYPTION_KEY. That is fine for development, but
 * in production a key sitting in an environment variable is only as protected
 * as the deploy dashboard and every log line that might print process.env.
 * Before real bank details are collected, move this to a managed KMS
 * (AWS KMS, GCP KMS, Vault) so the key material never reaches the app process
 * and key rotation is possible. `getKey()` is the single place to change.
 * ────────────────────────────────────────────────────────────────────────────
 */

const ALGORITHM = "aes-256-gcm";
const IV_BYTES = 12; // 96 bits, the size GCM is designed for
const KEY_BYTES = 32;

let cachedKey: Buffer | null = null;

function getKey(): Buffer {
  if (cachedKey) return cachedKey;

  const raw = process.env.KYC_ENCRYPTION_KEY;
  if (!raw) {
    throw new Error(
      "KYC_ENCRYPTION_KEY is not set. Generate one with: openssl rand -base64 32",
    );
  }

  const key = Buffer.from(raw, "base64");
  if (key.length !== KEY_BYTES) {
    throw new Error(
      `KYC_ENCRYPTION_KEY must decode to ${KEY_BYTES} bytes, got ${key.length}. ` +
        `Generate one with: openssl rand -base64 32`,
    );
  }

  cachedKey = key;
  return key;
}

/** Returns `v1.<iv>.<authTag>.<ciphertext>`, all base64url. */
export function encryptSecret(plaintext: string): string {
  const iv = crypto.randomBytes(IV_BYTES);
  const cipher = crypto.createCipheriv(ALGORITHM, getKey(), iv);

  const ciphertext = Buffer.concat([cipher.update(plaintext, "utf8"), cipher.final()]);
  const authTag = cipher.getAuthTag();

  // Version prefix so a future key rotation or algorithm change can be
  // recognised and migrated rather than guessed at.
  return [
    "v1",
    iv.toString("base64url"),
    authTag.toString("base64url"),
    ciphertext.toString("base64url"),
  ].join(".");
}

export function decryptSecret(payload: string): string {
  const parts = payload.split(".");
  if (parts.length !== 4 || parts[0] !== "v1") {
    throw new Error("Unrecognised ciphertext format");
  }

  const [, ivB64, tagB64, dataB64] = parts;
  const decipher = crypto.createDecipheriv(
    ALGORITHM,
    getKey(),
    Buffer.from(ivB64, "base64url"),
  );
  decipher.setAuthTag(Buffer.from(tagB64, "base64url"));

  return Buffer.concat([
    decipher.update(Buffer.from(dataB64, "base64url")),
    decipher.final(),
  ]).toString("utf8");
}

/**
 * Salted hash of a client IP, for referral click logs.
 *
 * A bare SHA-256 of an IPv4 address is trivially reversible — the whole space
 * is 4 billion entries, which is minutes of work. The server-side salt is what
 * makes the hash actually one-way.
 */
export function hashIp(ip: string): string {
  const salt = process.env.AUTH_SECRET ?? "";
  return crypto.createHash("sha256").update(`${salt}:${ip}`).digest("base64url").slice(0, 32);
}
