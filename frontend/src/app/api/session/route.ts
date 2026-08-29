import { NextResponse } from "next/server";
import type { ApiResponse, AuthSession } from "@nextmentor/shared";

import { SESSION_COOKIE, sessionCookieOptions } from "@/lib/session";
import { API_BASE } from "@/lib/api";

/**
 * Exchanges credentials for a session cookie.
 *
 * The browser posts here rather than to the API directly, so the JWT is set as
 * an httpOnly cookie by the server and never touches client JavaScript. The
 * token itself is not returned in the response body.
 */
export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ ok: false, error: "Bad request" }, { status: 400 });
  }

  const upstream = await fetch(`${API_BASE}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    cache: "no-store",
  });

  const payload = (await upstream.json()) as ApiResponse<AuthSession>;

  if (!payload.ok) {
    return NextResponse.json(
      { ok: false, error: payload.error, code: payload.code },
      { status: upstream.status },
    );
  }

  const response = NextResponse.json({
    ok: true,
    user: payload.data.user,
  });

  response.cookies.set(
    SESSION_COOKIE,
    payload.data.token,
    sessionCookieOptions(payload.data.expiresIn),
  );

  return response;
}

/** Sign out — clears the cookie. There is no server session to invalidate. */
export async function DELETE() {
  const response = NextResponse.json({ ok: true });
  response.cookies.set(SESSION_COOKIE, "", sessionCookieOptions(0));
  return response;
}
