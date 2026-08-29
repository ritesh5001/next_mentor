import { Hono } from "hono";
import { and, eq, isNull } from "drizzle-orm";
import bcrypt from "bcryptjs";
import {
  loginSchema,
  registerSchema,
  requestResetSchema,
  resetPasswordSchema,
  confirmEmailSchema,
} from "@nextmentor/shared";

import { db } from "@/db";
import { users } from "@/db/schema";
import { login, register, refreshSession, BCRYPT_ROUNDS } from "@/lib/auth";
import { consumeToken, issueToken } from "@/lib/tokens";
import { sendPasswordResetEmail } from "@/lib/email";
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
 * Confirms an email address. POST only, never GET.
 *
 * Mail scanners and link unfurlers fetch every URL in an outgoing email, so a
 * single-use token consumed on GET is burned before the recipient clicks.
 */
authRoutes.post("/confirm-email", async (c) => {
  const body = await parseBody(c, confirmEmailSchema);
  if (!body.ok) return body.response;

  const consumed = await consumeToken(body.data.token, "email_verification");
  if (!consumed) {
    return fail(c, "That link is invalid or has expired. Sign in to request a new one.", "not_found");
  }

  await db
    .update(users)
    .set({ emailVerified: new Date(), updatedAt: new Date() })
    .where(and(eq(users.id, consumed.userId), isNull(users.emailVerified)));

  return ok(c, { verified: true });
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
    const token = await issueToken(user.id, "password_reset");
    await sendPasswordResetEmail(body.data.email, token);
  }

  // Identical response either way — otherwise this enumerates registered users.
  return ok(c, { sent: true });
});

authRoutes.post("/reset-password", async (c) => {
  const body = await parseBody(c, resetPasswordSchema);
  if (!body.ok) return body.response;

  const consumed = await consumeToken(body.data.token, "password_reset");
  if (!consumed) {
    return fail(c, "That reset link is invalid or has expired. Request a new one.", "not_found");
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
    .where(eq(users.id, consumed.userId));

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
