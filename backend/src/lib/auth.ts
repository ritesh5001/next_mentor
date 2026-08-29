import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { SignJWT, jwtVerify } from "jose";
import type { AuthSession, JwtClaims, LoginResult, Role } from "@nextmentor/shared";

import { db } from "@/db";
import { users } from "@/db/schema";
import { env } from "./env";
import { generateUniqueReferralCode, normalizeReferralCode } from "./referral-code";
import { issueToken } from "./tokens";
import { sendVerificationEmail } from "./email";

/**
 * Authentication, owned entirely by this service.
 *
 * Auth.js was bound to the Drizzle adapter, so when the database moved here it
 * came with it. The frontend now holds no database credentials at all: it posts
 * credentials to /auth/login, receives a signed JWT, and forwards that token as
 * a Bearer on every later request.
 *
 * The JWT is short-lived and stateless — there is no session table to look up,
 * which is what keeps the frontend from ever needing the database.
 */

const BCRYPT_ROUNDS = 12;

/** 7 days. Long enough not to nag, short enough that a leaked token expires. */
export const TOKEN_TTL_SECONDS = 7 * 24 * 60 * 60;

function secret(): Uint8Array {
  return new TextEncoder().encode(env("auth").AUTH_SECRET);
}

export async function signSessionToken(claims: {
  sub: string;
  email: string;
  role: Role;
  referralCode: string;
}): Promise<string> {
  return new SignJWT({
    email: claims.email,
    role: claims.role,
    referralCode: claims.referralCode,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(claims.sub)
    .setIssuedAt()
    .setIssuer("nextmentor-api")
    .setAudience("nextmentor-web")
    .setExpirationTime(`${TOKEN_TTL_SECONDS}s`)
    .sign(secret());
}

/**
 * Verifies a Bearer token. Returns null rather than throwing so callers can
 * treat "no token", "bad token" and "expired token" identically — the client
 * should not learn which of the three it hit.
 */
export async function verifySessionToken(token: string): Promise<JwtClaims | null> {
  try {
    const { payload } = await jwtVerify(token, secret(), {
      issuer: "nextmentor-api",
      audience: "nextmentor-web",
    });

    if (!payload.sub || typeof payload.role !== "string") return null;

    return {
      sub: payload.sub,
      email: String(payload.email ?? ""),
      role: payload.role as Role,
      referralCode: String(payload.referralCode ?? ""),
      iat: Number(payload.iat ?? 0),
      exp: Number(payload.exp ?? 0),
    };
  } catch {
    return null;
  }
}

async function toSession(user: {
  id: string;
  email: string;
  name: string | null;
  role: Role;
  referralCode: string;
  image: string | null;
}): Promise<AuthSession> {
  return {
    token: await signSessionToken({
      sub: user.id,
      email: user.email,
      role: user.role,
      referralCode: user.referralCode,
    }),
    expiresIn: TOKEN_TTL_SECONDS,
    user,
  };
}

export async function login(input: {
  email: string;
  password: string;
}): Promise<LoginResult> {
  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.email, input.email.toLowerCase()))
    .limit(1);

  // Compare against a dummy hash when the account is absent so a missing user
  // and a wrong password take the same time. Skipping this leaks which emails
  // are registered through response timing.
  if (!user?.passwordHash) {
    await bcrypt.compare(
      input.password,
      "$2b$12$invalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinv",
    );
    return { status: "invalid_credentials" };
  }

  if (!(await bcrypt.compare(input.password, user.passwordHash))) {
    return { status: "invalid_credentials" };
  }

  if (user.isBlocked) return { status: "blocked" };
  if (!user.emailVerified) return { status: "email_not_verified" };

  return {
    status: "ok",
    session: await toSession({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      referralCode: user.referralCode,
      image: user.image,
    }),
  };
}

export type RegisterResult =
  | { status: "created" }
  | { status: "email_taken" };

export async function register(input: {
  name: string;
  email: string;
  password: string;
  referralCode?: string;
}): Promise<RegisterResult> {
  const email = input.email.toLowerCase();

  const [existing] = await db
    .select({ id: users.id })
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  // Deliberately the same message the route turns into a vague error: telling
  // callers an address is registered turns this into an enumeration oracle.
  if (existing) return { status: "email_taken" };

  let referredById: string | null = null;
  if (input.referralCode) {
    const [referrer] = await db
      .select({ id: users.id, isBlocked: users.isBlocked })
      .from(users)
      .where(eq(users.referralCode, normalizeReferralCode(input.referralCode)))
      .limit(1);

    if (referrer && !referrer.isBlocked) referredById = referrer.id;
  }

  let userId: string;
  try {
    const [created] = await db
      .insert(users)
      .values({
        name: input.name,
        email,
        passwordHash: await bcrypt.hash(input.password, BCRYPT_ROUNDS),
        referralCode: await generateUniqueReferralCode(),
        referredById,
        referredAt: referredById ? new Date() : null,
      })
      .returning({ id: users.id });
    userId = created.id;
  } catch {
    // The UNIQUE index on email is the real guard against the race between the
    // check above and this insert.
    return { status: "email_taken" };
  }

  const token = await issueToken(userId, "email_verification");
  await sendVerificationEmail(email, token, input.name);

  return { status: "created" };
}

/** Re-reads the user so a role change takes effect on the next token refresh. */
export async function getSessionUser(userId: string) {
  const [user] = await db
    .select({
      id: users.id,
      email: users.email,
      name: users.name,
      role: users.role,
      referralCode: users.referralCode,
      image: users.image,
      isBlocked: users.isBlocked,
    })
    .from(users)
    .where(eq(users.id, userId))
    .limit(1);

  if (!user || user.isBlocked) return null;
  return user;
}

/**
 * Issues a fresh token for an already-authenticated user.
 *
 * The claims in a JWT are frozen at signing time, so a promotion to admin only
 * lands when the token is reissued. The frontend calls this on session refresh.
 */
export async function refreshSession(userId: string): Promise<AuthSession | null> {
  const user = await getSessionUser(userId);
  if (!user) return null;

  return toSession({
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    referralCode: user.referralCode,
    image: user.image,
  });
}

export { BCRYPT_ROUNDS };
