import { NextResponse, type NextRequest } from "next/server";

import { REFERRAL_COOKIE, REFERRAL_TTL_DAYS } from "@nextmentor/shared";
import { SESSION_COOKIE } from "@/lib/session";

/**
 * Two jobs, both cheap enough to run at the edge on every request:
 *
 *  1. Capture `?ref=CODE` into a cookie so attribution survives the visitor
 *     browsing around before they sign up.
 *  2. Redirect unauthenticated page navigations away from gated routes.
 *
 * Point 2 is a redirect for UX, NOT an authorization boundary. It only sees the
 * session cookie's presence, never its validity, and it does not run for Server
 * Actions. Real enforcement lives in src/lib/permissions.ts.
 */
export function proxy(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  const isGated =
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/admin") ||
    pathname.startsWith("/learn");
  const hasSessionCookie =
    // The session cookie is set by /api/session after the API returns a JWT.
    // Auth.js and its "authjs.session-token" cookie were removed when the
    // backend took ownership of authentication — checking for the old name
    // here silently redirected every signed-in user back to /login.
    request.cookies.has(SESSION_COOKIE) ||
    request.cookies.has(`__Secure-${SESSION_COOKIE}`);

  let response: NextResponse;

  if (isGated && !hasSessionCookie) {
    const login = new URL("/login", request.url);
    // Preserve where they were headed so sign-in can return them there.
    login.searchParams.set("callbackUrl", pathname);
    response = NextResponse.redirect(login);
  } else {
    response = NextResponse.next();
  }

  const ref = searchParams.get("ref");
  if (ref) {
    const normalized = ref.trim().toUpperCase().replace(/[^0-9A-Z]/g, "").slice(0, 16);
    if (normalized.length >= 4) {
      // First-touch attribution: an existing cookie is never overwritten, so
      // the affiliate who actually introduced the visitor keeps the credit even
      // if a later link is clicked before signup.
      const existing = request.cookies.get(REFERRAL_COOKIE)?.value;
      if (!existing) {
        // Signal to the landing page that this is a fresh click worth logging.
        // The write itself happens in a Server Component, not here — the proxy
        // runs on every request and must not touch the database.
        response.headers.set("x-nm-new-referral", normalized);
        response.cookies.set(REFERRAL_COOKIE, normalized, {
          maxAge: REFERRAL_TTL_DAYS * 24 * 60 * 60,
          httpOnly: true,
          sameSite: "lax",
          secure: process.env.NODE_ENV === "production",
          path: "/",
        });
      }
    }
  }

  return response;
}

export const config = {
  matcher: [
    // Everything except static assets and image optimization output.
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|avif|ico|woff2?)$).*)",
  ],
};
