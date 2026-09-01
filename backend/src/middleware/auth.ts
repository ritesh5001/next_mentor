import type { Context, MiddlewareHandler } from "hono";
import type { Role } from "@nextmentor/shared";

import { verifySessionToken } from "@/lib/auth";

/**
 * Authentication and authorisation for the API.
 *
 * Replaces `requireUser()` / `requireAdmin()` from the Next.js build, which
 * relied on `unauthorized()` and `forbidden()` interrupts that only exist
 * inside Next. The guarantee is the same: every route that touches user data
 * runs one of these first.
 */

export type AuthUser = {
  id: string;
  email: string;
  role: Role;
  referralCode: string;
};

declare module "hono" {
  interface ContextVariableMap {
    user: AuthUser | null;
  }
}

function bearer(c: Context): string | null {
  const header = c.req.header("authorization");
  if (!header?.startsWith("Bearer ")) return null;
  return header.slice(7).trim() || null;
}

/**
 * Attaches the caller if a valid token is present, but never rejects.
 *
 * Used on routes that render differently for a signed-in visitor — a course
 * page showing "Continue" instead of "Buy" — without requiring an account.
 */
export const optionalAuth: MiddlewareHandler = async (c, next) => {
  const token = bearer(c);
  const claims = token ? await verifySessionToken(token) : null;

  c.set(
    "user",
    claims
      ? { id: claims.sub, email: claims.email, role: claims.role, referralCode: claims.referralCode }
      : null,
  );

  await next();
};

/** 401 unless a valid token is present. */
export const requireUser: MiddlewareHandler = async (c, next) => {
  const token = bearer(c);
  const claims = token ? await verifySessionToken(token) : null;

  if (!claims) {
    return c.json({ ok: false, error: "Sign in to continue.", code: "unauthorized" }, 401);
  }

  c.set("user", {
    id: claims.sub,
    email: claims.email,
    role: claims.role,
    referralCode: claims.referralCode,
  });

  await next();
};

/**
 * 401 when nobody is signed in, 403 when they are but lack the role.
 *
 * The distinction matters to the client: 401 means "log in and retry", 403
 * means "logging in again will not help". Collapsing both to 403 sends a
 * signed-out visitor to a dead end instead of the login page.
 */
export function requireRole(...roles: Role[]): MiddlewareHandler {
  return async (c, next) => {
    // requireUser returns its 401 rather than throwing, so it must be captured
    // and propagated — discarding it turns every anonymous request into a 403.
    const denied = await requireUser(c, async () => {});
    if (denied) return denied;

    const user = c.get("user");
    if (!user || !roles.includes(user.role)) {
      return c.json(
        { ok: false, error: "You do not have access to this.", code: "forbidden" },
        403,
      );
    }

    await next();
  };
}

/**
 * Admin gate.
 *
 * There used to be a separate `requireInstructor` that also admitted an
 * "instructor" role. That role was never used — the platform has exactly two
 * kinds of account, admin and student — and a second permission tier with no
 * members is just a way for a gap to open up unnoticed.
 */
export const requireAdmin = requireRole("admin");

/** Reads the caller after a guard has run. Throws if used without one. */
export function currentUser(c: Context): AuthUser {
  const user = c.get("user");
  if (!user) throw new Error("currentUser() called on a route with no auth guard");
  return user;
}
