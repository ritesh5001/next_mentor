import { cookies } from "next/headers";
import type { AuthSession, Role } from "@nextmentor/shared";

/**
 * Session handling on the frontend.
 *
 * The JWT lives in an httpOnly cookie, so browser JavaScript can never read it
 * — an XSS bug cannot exfiltrate a token it has no access to. Server Components
 * read it via cookies() and forward it to the API.
 */

export const SESSION_COOKIE = "nm_session";

export type SessionUser = {
  id: string;
  email: string;
  name: string | null;
  role: Role;
  referralCode: string;
  image: string | null;
};

/**
 * Decodes the JWT payload WITHOUT verifying it.
 *
 * That is safe only because it is never trusted for authorisation: the API
 * verifies the signature on every request, and this is used purely to render
 * the right nav without a network round-trip on every page. Any real decision
 * — can this person see this? — happens on the backend.
 */
function decodeUnverified(token: string): SessionUser | null {
  try {
    const [, payload] = token.split(".");
    if (!payload) return null;

    const json = JSON.parse(
      Buffer.from(payload.replace(/-/g, "+").replace(/_/g, "/"), "base64").toString("utf8"),
    ) as Record<string, unknown>;

    // An expired token is treated as no session so the UI does not render a
    // logged-in shell the API will then reject.
    if (typeof json.exp === "number" && json.exp * 1000 < Date.now()) return null;
    if (typeof json.sub !== "string") return null;

    return {
      id: json.sub,
      email: String(json.email ?? ""),
      name: null,
      role: (json.role as Role) ?? "student",
      referralCode: String(json.referralCode ?? ""),
      image: null,
    };
  } catch {
    return null;
  }
}

/** The caller, for rendering. Never for authorisation. */
export async function getSession(): Promise<SessionUser | null> {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  return token ? decodeUnverified(token) : null;
}

export async function getSessionToken(): Promise<string | null> {
  return (await cookies()).get(SESSION_COOKIE)?.value ?? null;
}

/** Cookie options shared by the login and logout route handlers. */
export function sessionCookieOptions(maxAgeSeconds: number) {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: maxAgeSeconds,
  };
}

export type { AuthSession };
