/**
 * Security properties of the OTP flow.
 *
 *   pnpm verify:otp
 *
 * A 6-digit code is only a million possibilities, so nearly all the security
 * here comes from the limits around it. Each of these is a way an attacker
 * gets in if it regresses.
 */
import { eq, and } from "drizzle-orm";

import { db } from "@/db";
import { users, authTokens } from "@/db/schema";
import { issueOtp, verifyOtp, MAX_OTP_ATTEMPTS, OTP_LENGTH } from "@/lib/otp";
import { generateUniqueReferralCode } from "@/lib/referral-code";

let failures = 0;
function check(label: string, ok: boolean, detail = "") {
  console.log(`${ok ? "PASS" : "FAIL"}  ${label}${detail ? ` — ${detail}` : ""}`);
  if (!ok) failures++;
}

/** Reads the code back out of the DB is impossible (hashed), so issue returns it. */
async function freshCode(userId: string, purpose: "email_verification" | "password_reset") {
  // Clear the cooldown from any previous issue in this run.
  await db.delete(authTokens).where(eq(authTokens.userId, userId));
  const r = await issueOtp(userId, purpose);
  if (r.status !== "issued") throw new Error("expected a code");
  return r.code;
}

async function main() {
  const stamp = Date.now();

  const [user] = await db.insert(users).values({
    name: "OTP Test", email: `otp${stamp}@test.local`,
    referralCode: await generateUniqueReferralCode(),
  }).returning({ id: users.id });

  const [other] = await db.insert(users).values({
    name: "Other", email: `otp2${stamp}@test.local`,
    referralCode: await generateUniqueReferralCode(),
  }).returning({ id: users.id });

  // ------------------------------------------------------------- format
  const code = await freshCode(user.id, "email_verification");
  check("code is 6 digits", /^\d{6}$/.test(code), code);
  check("OTP_LENGTH matches", code.length === OTP_LENGTH);

  // ----------------------------------------------------- never stored raw
  const [row] = await db.select().from(authTokens).where(eq(authTokens.userId, user.id));
  check("code is not stored in plaintext", row.tokenHash !== code);
  check("stored as a sha256 hash", /^[0-9a-f]{64}$/.test(row.tokenHash));

  // ------------------------------------------------------- happy path
  check("correct code verifies", (await verifyOtp(user.id, code, "email_verification")).status === "ok");

  // ------------------------------------------------------- single use
  const reuse = await verifyOtp(user.id, code, "email_verification");
  check("a consumed code cannot be reused", reuse.status === "no_code", reuse.status);

  // --------------------------------------------------- attempt limiting
  const c2 = await freshCode(user.id, "email_verification");
  const wrong = c2 === "000000" ? "111111" : "000000";

  let lastStatus = "";
  for (let i = 1; i <= MAX_OTP_ATTEMPTS; i++) {
    const r = await verifyOtp(user.id, wrong, "email_verification");
    lastStatus = r.status;
    if (i < MAX_OTP_ATTEMPTS) {
      const left = r.status === "invalid" ? r.attemptsLeft : -1;
      check(`attempt ${i} reports ${MAX_OTP_ATTEMPTS - i} left`, left === MAX_OTP_ATTEMPTS - i, String(left));
    }
  }
  check("code dies after max attempts", lastStatus === "too_many_attempts", lastStatus);

  // The RIGHT code must not work once the budget is spent.
  const afterBurn = await verifyOtp(user.id, c2, "email_verification");
  check("correct code rejected after the budget is spent", afterBurn.status !== "ok", afterBurn.status);

  // ------------------------------------------------ cross-account isolation
  const mine = await freshCode(user.id, "email_verification");
  await freshCode(other.id, "email_verification");
  const crossed = await verifyOtp(other.id, mine, "email_verification");
  check("my code does not verify another account", crossed.status !== "ok", crossed.status);

  // ------------------------------------------------------ purpose scoping
  const verifyCode = await freshCode(user.id, "email_verification");
  const wrongPurpose = await verifyOtp(user.id, verifyCode, "password_reset");
  check("a verification code cannot reset a password", wrongPurpose.status !== "ok", wrongPurpose.status);

  // ------------------------------------------------------------ expiry
  const expiring = await freshCode(user.id, "email_verification");
  await db.update(authTokens)
    .set({ expiresAt: new Date(Date.now() - 1000) })
    .where(and(eq(authTokens.userId, user.id), eq(authTokens.purpose, "email_verification")));
  const expired = await verifyOtp(user.id, expiring, "email_verification");
  check("expired code is rejected", expired.status === "expired", expired.status);

  // ------------------------------------------------------ resend cooldown
  await db.delete(authTokens).where(eq(authTokens.userId, user.id));
  const first = await issueOtp(user.id, "email_verification");
  const second = await issueOtp(user.id, "email_verification");
  check("first issue succeeds", first.status === "issued");
  check("immediate resend is throttled", second.status === "cooldown", second.status);

  // --------------------------------------------- reissue kills the old code
  await db.delete(authTokens).where(eq(authTokens.userId, user.id));
  const oldCode = await freshCode(user.id, "email_verification");
  const newCode = await freshCode(user.id, "email_verification");
  check("reissue produces a different code", oldCode !== newCode);
  check("the superseded code no longer works",
    (await verifyOtp(user.id, oldCode, "email_verification")).status !== "ok");
  check("the newest code works", (await verifyOtp(user.id, newCode, "email_verification")).status === "ok");

  // ------------------------------------------------- malformed input
  await freshCode(user.id, "email_verification");
  for (const bad of ["", "12345", "1234567", "abcdef", "12 34 5"]) {
    const r = await verifyOtp(user.id, bad, "email_verification");
    check(`malformed input "${bad}" rejected`, r.status !== "ok", r.status);
  }

  // ---------------------------------------- distribution sanity (no bias)
  await db.delete(authTokens).where(eq(authTokens.userId, user.id));
  const seen = new Set<string>();
  for (let i = 0; i < 200; i++) {
    await db.delete(authTokens).where(eq(authTokens.userId, user.id));
    const r = await issueOtp(user.id, "email_verification");
    if (r.status === "issued") seen.add(r.code);
  }
  check("codes are not repeating", seen.size > 190, `${seen.size}/200 unique`);

  // ------------------------------------------------------------ cleanup
  await db.delete(authTokens).where(eq(authTokens.userId, user.id));
  await db.delete(authTokens).where(eq(authTokens.userId, other.id));
  await db.delete(users).where(eq(users.id, user.id));
  await db.delete(users).where(eq(users.id, other.id));

  console.log(failures === 0 ? "\nAll checks passed." : `\n${failures} check(s) FAILED.`);
  process.exit(failures === 0 ? 0 : 1);
}

main().catch((e) => { console.error(e); process.exit(1); });
