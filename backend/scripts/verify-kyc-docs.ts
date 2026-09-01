/**
 * KYC document flow: private storage, signed access, submit gating.
 *
 *   pnpm verify:kyc-docs
 *
 * These are identity documents. The check that matters most is that a raw
 * ImageKit path is NOT publicly fetchable — if that regresses, someone's
 * Aadhaar card is on the open internet and nothing else here would notice.
 */
import { eq } from "drizzle-orm";

import { db } from "@/db";
import { users, kycSubmissions } from "@/db/schema";
import {
  uploadPrivateDocument,
  signedDocumentUrl,
  publicUrl,
  deleteObject,
  KYC_DOC_SLOTS,
} from "@/lib/imagekit";
import { generateUniqueReferralCode } from "@/lib/referral-code";

let failures = 0;
function check(label: string, ok: boolean, detail = "") {
  console.log(`${ok ? "PASS" : "FAIL"}  ${label}${detail ? ` — ${detail}` : ""}`);
  if (!ok) failures++;
}

/** Smallest valid PNG, so the test uploads real bytes rather than a stub. */
const PNG = Buffer.from(
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==",
  "base64",
);

async function main() {
  const stamp = Date.now();
  const [user] = await db.insert(users).values({
    name: "KYC Doc Test", email: `kycdoc${stamp}@test.local`,
    referralCode: await generateUniqueReferralCode(),
  }).returning({ id: users.id });

  check("all five slots defined", KYC_DOC_SLOTS.length === 5, KYC_DOC_SLOTS.join(", "));

  // --- rejects what it should ---
  const badType = await uploadPrivateDocument({
    file: PNG, contentType: "application/x-msdownload", slot: "panFront", userId: user.id,
  });
  check("rejects an executable", "error" in badType);

  const empty = await uploadPrivateDocument({
    file: Buffer.alloc(0), contentType: "image/png", slot: "panFront", userId: user.id,
  });
  check("rejects an empty file", "error" in empty);

  const huge = await uploadPrivateDocument({
    file: Buffer.alloc(11 * 1024 * 1024), contentType: "image/png",
    slot: "panFront", userId: user.id,
  });
  check("rejects an oversized file", "error" in huge);

  // --- real upload ---
  const up = await uploadPrivateDocument({
    file: PNG, contentType: "image/png", slot: "aadhaarFront", userId: user.id,
  });

  if ("error" in up) {
    check("uploads a document", false, up.error);
    console.log(`\n${failures + 1} check(s) FAILED.`);
    process.exit(1);
  }

  check("uploads a document", true, up.filePath);
  check("scoped to the user's folder", up.filePath.includes(`/kyc/${user.id}/`), up.filePath);
  check("random filename, not the original",
    /aadhaarFront-[0-9a-f-]{36}\.png$/.test(up.filePath));

  // --- THE important one: the raw path must not be public ---
  const raw = publicUrl(up.filePath);
  const rawRes = await fetch(raw!);
  check("raw path is NOT publicly fetchable", !rawRes.ok, `HTTP ${rawRes.status}`);

  // --- a signed URL does work ---
  const signed = signedDocumentUrl(up.filePath, 300);
  check("produces a signed url", Boolean(signed?.includes("ik-s")), signed?.slice(0, 60) ?? "null");

  const signedRes = await fetch(signed!);
  check("signed url fetches the file", signedRes.ok, `HTTP ${signedRes.status}`);
  check("signed url returns real bytes",
    Number(signedRes.headers.get("content-length") ?? 0) > 0);

  // --- an expired signature is refused ---
  const expired = signedDocumentUrl(up.filePath, -60);
  const expiredRes = await fetch(expired!);
  check("expired signature is refused", !expiredRes.ok, `HTTP ${expiredRes.status}`);

  // --- submit gating ---
  await db.insert(kycSubmissions).values({
    userId: user.id, fullName: "Test", panNumber: "ABCDE1234F",
    bankAccountName: "Test", accountNumberEncrypted: "x", accountNumberLast4: "1234",
    ifsc: "HDFC0001234", status: "pending", aadhaarFrontPath: up.filePath,
  });

  const [row] = await db.select().from(kycSubmissions).where(eq(kycSubmissions.userId, user.id));
  const missing = [
    row.aadhaarBackPath, row.panFrontPath, row.panBackPath, row.bankProofPath,
  ].filter((v) => !v).length;
  check("incomplete submission has 4 slots empty", missing === 4, String(missing));

  // --- cleanup ---
  await deleteObject(up.filePath);
  await db.delete(kycSubmissions).where(eq(kycSubmissions.userId, user.id));
  await db.delete(users).where(eq(users.id, user.id));

  console.log(failures === 0 ? "\nAll checks passed." : `\n${failures} check(s) FAILED.`);
  process.exit(failures === 0 ? 0 : 1);
}

main().catch((e) => { console.error(e); process.exit(1); });
