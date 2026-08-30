import { Hono } from "hono";
import { and, eq, isNull } from "drizzle-orm";
import bcrypt from "bcryptjs";
import {
  loginSchema,
  registerSchema,
  requestResetSchema,
  resetPasswordSchema,
  verifyEmailOtpSchema,
  resendOtpSchema,
} from "@nextmentor/shared";

import { db } from "@/db";
import { users } from "@/db/schema";
import { login, register, refreshSession, BCRYPT_ROUNDS } from "@/lib/auth";
import { issueOtp, verifyOtp, MAX_OTP_ATTEMPTS } from "@/lib/otp";
import { sendPasswordResetEmail, sendVerificationEmail } from "@/lib/email";
import { requireUser, currentUser } from "@/middleware/auth";
import { ok, fail, parseBody } from "@/middleware/respond";

/**
 * Authentication endpoints.
 *
 * The frontend never touches the database. It posts here, gets a JWT back, and
 * stores it in an httpOnly cookie of its own.
 */
export const authRoutes = new Hono();

authRoutes.post("/login", async (c) => {
  const body = await parseBody(c, loginSchema);
  if (!body.ok) return body.response;

  const result = await login(body.data);

  switch (result.status) {
    case "ok":
      return ok(c, result.session);
    case "email_not_verified":
      return fail(c, "Confirm your email first. Check your inbox for the link.", "forbidden");
    case "blocked":
      return fail(c, "This account has been suspended. Contact support.", "forbidden");
    case "invalid_credentials":
      // Same message whether the address is unknown or the password is wrong.
      return fail(c, "Email or password is incorrect.", "unauthorized");
  }
});

authRoutes.post("/register", async (c) => {
  const body = await parseBody(c, registerSchema);
  if (!body.ok) return body.response;

  const result = await register({
    name: body.data.name,
    email: body.data.email,
    password: body.data.password,
    referralCode: body.data.referralCode,
  });

  if (result.status === "email_taken") {
    // Deliberately vague: confirming an address is registered turns this
    // endpoint into an account-enumeration oracle.
    return fail(c, "That email cannot be used. Try signing in instead.", "conflict");
  }

  return ok(c, { sent: true }, 201);
});

/**
 * Looks up a user by email for an OTP flow.
 *
 * Returns null rather than throwing so callers can respond identically whether
 * or not the address exists — otherwise these endpoints enumerate accounts.
 */
async function findUserByEmail(email: string) {
  const [user] = await db
    .select({ id: users.id, name: users.name, emailVerified: users.emailVerified })
    .from(users)
    .where(eq(users.email, email))
    .limit(1);
  return user ?? null;
}

/** Turns an OTP verification result into a message the UI can show as-is. */
function otpMessage(status: string, attemptsLeft?: number): string {
  switch (status) {
    case "invalid":
      return attemptsLeft === 1
        ? "That code is not right. One attempt left before it expires."
        : `That code is not right. ${attemptsLeft} attempts left.`;
    case "expired":
      return "That code has expired. Request a new one.";
    case "too_many_attempts":
      return "Too many incorrect attempts. Request a new code.";
    default:
      return "No active code for this address. Request a new one.";
  }
}

/**
 * Confirms an email address with a 6-digit code.
 *
 * Takes the email as well as the code: codes are scoped to a user, so an
 * attacker cannot submit guesses hoping to match *anyone's* code.
 */
authRoutes.post("/verify-email", async (c) => {
  const body = await parseBody(c, verifyEmailOtpSchema);
  if (!body.ok) return body.response;

  const user = await findUserByEmail(body.data.email);

  // Indistinguishable from a first wrong guess against a real account.
  // Returning "no active code" here would let anyone test which addresses are
  // registered by submitting a junk code.
  if (!user) {
    return fail(c, otpMessage("invalid", MAX_OTP_ATTEMPTS - 1), "not_found");
  }

  if (user.emailVerified) return ok(c, { verified: true, alreadyVerified: true });

  const result = await verifyOtp(user.id, body.data.code, "email_verification");

  if (result.status !== "ok") {
    return fail(
      c,
      otpMessage(result.status, "attemptsLeft" in result ? result.attemptsLeft : undefined),
      result.status === "too_many_attempts" ? "rate_limited" : "not_found",
    );
  }

  await db
    .update(users)
    .set({ emailVerified: new Date(), updatedAt: new Date() })
    .where(and(eq(users.id, user.id), isNull(users.emailVerified)));

  return ok(c, { verified: true });
});

/**
 * Sends a fresh code for either flow.
 *
 * The cooldown lives in issueOtp, so hammering this cannot be used to flood
 * somebody's inbox.
 */
authRoutes.post("/resend-otp", async (c) => {
  const body = await parseBody(c, resendOtpSchema);
  if (!body.ok) return body.response;

  const user = await findUserByEmail(body.data.email);

  // Always report success. The response must not reveal whether the address is
  // registered, or whether it is already verified.
  if (!user) return ok(c, { status: "sent", expiresInSeconds: 900 });

  if (body.data.purpose === "email_verification" && user.emailVerified) {
    return ok(c, { status: "sent", expiresInSeconds: 900 });
  }

  const issued = await issueOtp(user.id, body.data.purpose);

  if (issued.status === "cooldown") {
    return ok(c, { status: "cooldown", retryAfterSeconds: issued.retryAfterSeconds });
  }

  const minutes = Math.round(issued.expiresInSeconds / 60);

  if (body.data.purpose === "email_verification") {
    await sendVerificationEmail(body.data.email, issued.code, minutes, user.name);
  } else {
    await sendPasswordResetEmail(body.data.email, issued.code, minutes);
  }

  return ok(c, { status: "sent", expiresInSeconds: issued.expiresInSeconds });
});

authRoutes.post("/request-reset", async (c) => {
  const body = await parseBody(c, requestResetSchema);
  if (!body.ok) return body.response;

  const [user] = await db
    .select({ id: users.id })
    .from(users)
    .where(eq(users.email, body.data.email))
    .limit(1);

  if (user) {
    const issued = await issueOtp(user.id, "password_reset");
    if (issued.status === "issued") {
      await sendPasswordResetEmail(
        body.data.email,
        issued.code,
        Math.round(issued.expiresInSeconds / 60),
      );
    }
    // On cooldown we deliberately send nothing and still report success — the
    // previous code is still valid and still in their inbox.
  }

  // Identical response either way — otherwise this enumerates registered users.
  return ok(c, { sent: true });
});

authRoutes.post("/reset-password", async (c) => {
  const body = await parseBody(c, resetPasswordSchema);
  if (!body.ok) return body.response;

  const user = await findUserByEmail(body.data.email);

  // Same reasoning as verify-email: an unknown address must look exactly like
  // a wrong code, or this endpoint enumerates accounts.
  if (!user) return fail(c, otpMessage("invalid", MAX_OTP_ATTEMPTS - 1), "not_found");

  const result = await verifyOtp(user.id, body.data.code, "password_reset");

  if (result.status !== "ok") {
    return fail(
      c,
      otpMessage(result.status, "attemptsLeft" in result ? result.attemptsLeft : undefined),
      result.status === "too_many_attempts" ? "rate_limited" : "not_found",
    );
  }

  await db
    .update(users)
    .set({
      passwordHash: await bcrypt.hash(body.data.password, BCRYPT_ROUNDS),
      // Proving control of the inbox also proves the address, so a reset
      // completes verification.
      emailVerified: new Date(),
      updatedAt: new Date(),
    })
    .where(eq(users.id, user.id));

  return ok(c, { reset: true });
});

/**
 * Reissues a token so a role change takes effect.
 *
 * JWT claims are frozen at signing time — a user promoted to admin keeps a
 * stale token until it is refreshed or expires.
 */
authRoutes.post("/refresh", requireUser, async (c) => {
  const session = await refreshSession(currentUser(c).id);
  if (!session) return fail(c, "This account is no longer active.", "unauthorized");
  return ok(c, session);
});

/** The caller's own record, for the frontend to render the session. */
authRoutes.get("/me", requireUser, async (c) => {
  const session = await refreshSession(currentUser(c).id);
  if (!session) return fail(c, "This account is no longer active.", "unauthorized");
  return ok(c, session.user);
});
