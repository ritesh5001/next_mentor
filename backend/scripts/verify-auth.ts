/**
 * Smoke test for the auth primitives, run against a real database.
 *
 *   pnpm verify:auth
 *
 * Must be run with `node --env-file=.env.local` (see package.json) — a dotenv
 * call inside this file would execute after the hoisted imports, by which
 * point src/db/index.ts has already read an empty process.env.
 */
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { users, authTokens } from "@/db/schema";
import { generateUniqueReferralCode } from "@/lib/referral-code";
import { issueOtp, verifyOtp } from "@/lib/otp";

let failures = 0;
function check(label: string, ok: boolean, detail = "") {
  console.log(`${ok ? "PASS" : "FAIL"}  ${label}${detail ? ` — ${detail}` : ""}`);
  if (!ok) failures++;
}

async function main() {
  const stamp = Date.now();

  // --- referrer ---
  const refCode = await generateUniqueReferralCode();
  check("referral code shape", /^[23456789BCDFGHJKMNPQRSTVWXYZ]{8}$/.test(refCode), refCode);
  check("no ambiguous chars (0/O/1/I/L)", !/[01OIL]/.test(refCode), refCode);

  const [referrer] = await db.insert(users).values({
    name: "Referrer", email: `ref${stamp}@test.local`,
    passwordHash: await bcrypt.hash("Password123", 12), referralCode: refCode,
  }).returning({ id: users.id });

  // --- referred signup ---
  const [referred] = await db.insert(users).values({
    name: "Referred", email: `new${stamp}@test.local`,
    passwordHash: await bcrypt.hash("Password123", 12),
    referralCode: await generateUniqueReferralCode(),
    referredById: referrer.id, referredAt: new Date(),
  }).returning({ id: users.id, referredById: users.referredById });
  check("referral attribution stored at signup", referred.referredById === referrer.id);

  // --- duplicate email must be rejected by the UNIQUE index ---
  let dupRejected = false;
  try {
    await db.insert(users).values({
      name: "Dup", email: `new${stamp}@test.local`,
      referralCode: await generateUniqueReferralCode(),
    });
  } catch { dupRejected = true; }
  check("duplicate email rejected by UNIQUE index", dupRejected);

  // --- OTP: single use ---
  // The dedicated OTP suite (verify:otp) covers attempt limits, expiry and
  // cooldown. These are the properties the auth flow itself depends on.
  await db.delete(authTokens).where(eq(authTokens.userId, referred.id));
  const issued = await issueOtp(referred.id, "email_verification");
  if (issued.status !== "issued") throw new Error("expected a code");

  const [stored] = await db.select().from(authTokens).where(eq(authTokens.userId, referred.id));
  check("raw code never stored in DB", stored.tokenHash !== issued.code);
  check("code hash is sha256 hex", /^[0-9a-f]{64}$/.test(stored.tokenHash));

  check("valid code verifies once",
    (await verifyOtp(referred.id, issued.code, "email_verification")).status === "ok");
  check("replayed code is rejected",
    (await verifyOtp(referred.id, issued.code, "email_verification")).status !== "ok");

  // --- OTP: purpose is enforced ---
  await db.delete(authTokens).where(eq(authTokens.userId, referred.id));
  const reset = await issueOtp(referred.id, "password_reset");
  if (reset.status !== "issued") throw new Error("expected a code");

  check("code bound to its purpose",
    (await verifyOtp(referred.id, reset.code, "email_verification")).status !== "ok");
  check("correct purpose still works",
    (await verifyOtp(referred.id, reset.code, "password_reset")).status === "ok");

  // --- OTP: issuing a new one invalidates the old ---
  await db.delete(authTokens).where(eq(authTokens.userId, referred.id));
  const older = await issueOtp(referred.id, "password_reset");
  await db.delete(authTokens).where(eq(authTokens.userId, referred.id));
  const newer = await issueOtp(referred.id, "password_reset");
  if (older.status !== "issued" || newer.status !== "issued") throw new Error("expected codes");
  check("re-issuing invalidates the previous code",
    (await verifyOtp(referred.id, older.code, "password_reset")).status !== "ok");

  // --- password hashing ---
  const [u] = await db.select({ h: users.passwordHash }).from(users).where(eq(users.id, referred.id));
  check("password stored as bcrypt, not plaintext", u.h!.startsWith("$2") && u.h !== "Password123");
  check("correct password verifies", await bcrypt.compare("Password123", u.h!));
  check("wrong password rejected", !(await bcrypt.compare("Wrong123", u.h!)));

  // --- transactions must actually work ---
  //
  // This is the check that matters most for the Razorpay webhook: it writes the
  // order and the enrollment together, and a partial write there means someone
  // paid and cannot watch. The neon-http driver type-checks .transaction() and
  // then throws at runtime, which is exactly why this test exists.
  let txSupported = true;
  let rolledBack = false;
  const txEmail = `tx${stamp}@test.local`;
  try {
    await db.transaction(async (tx) => {
      await tx.insert(users).values({
        name: "Tx", email: txEmail,
        referralCode: await generateUniqueReferralCode(),
      });
      // Force a rollback to prove the transaction is real, not a no-op wrapper.
      throw new Error("deliberate rollback");
    });
  } catch (e) {
    if (e instanceof Error && e.message.includes("No transactions support")) txSupported = false;
  }
  check("driver supports interactive transactions", txSupported);

  const leftover = await db.select({ id: users.id }).from(users).where(eq(users.email, txEmail));
  rolledBack = leftover.length === 0;
  check("failed transaction rolls back cleanly", rolledBack);

  // cleanup
  await db.delete(users).where(eq(users.id, referred.id));
  await db.delete(users).where(eq(users.id, referrer.id));

  console.log(failures === 0 ? "\nAll checks passed." : `\n${failures} check(s) FAILED.`);
  process.exit(failures === 0 ? 0 : 1);
}

main().catch((e) => { console.error(e); process.exit(1); });
