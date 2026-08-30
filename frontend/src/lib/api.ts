import { cookies } from "next/headers";
import type { ApiResponse } from "@nextmentor/shared";
import { envOr, envUrl } from "@nextmentor/shared";

import { SESSION_COOKIE } from "./session";

/**
 * The only way this app reaches its data.
 *
 * The frontend holds no database credentials. Everything goes through the
 * Render API over HTTP, with the caller's JWT forwarded as a Bearer token.
 *
 * Two variants exist because they read the token from different places:
 *   - `api()`       — Server Components and route handlers, reads the cookie
 *   - `clientApi()` — browser code, goes through /api/proxy so the httpOnly
 *                     cookie is attached by the server rather than by JS
 */

// envOr, not ??: an empty API_URL on Vercel would silently resolve to
// localhost:4000 in production and every call would fail with no clue why.
const BASE = envUrl(
  envOr(process.env.API_URL, process.env.NEXT_PUBLIC_API_URL),
  "http://localhost:4000",
);

export class ApiError extends Error {
  constructor(
    message: string,
    readonly status: number,
    readonly code?: string,
    readonly fields?: Record<string, string>,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

type Options = {
  method?: "GET" | "POST" | "PATCH" | "DELETE";
  body?: unknown;
  /** Next fetch caching. Defaults to no-store — most calls are per-user. */
  cache?: RequestCache;
  revalidate?: number;
  tags?: string[];
  /** Skip the auth header for genuinely public reads. */
  anonymous?: boolean;
};

/**
 * Server-side call. Reads the session cookie itself, so callers never handle
 * the token.
 */
export async function api<T>(path: string, options: Options = {}): Promise<T> {
  const headers: Record<string, string> = { "Content-Type": "application/json" };

  if (!options.anonymous) {
    const token = (await cookies()).get(SESSION_COOKIE)?.value;
    if (token) headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(`${BASE}${path}`, {
    method: options.method ?? "GET",
    headers,
    body: options.body === undefined ? undefined : JSON.stringify(options.body),
    // Next 15+ does not cache by default, so every call states its intent.
    cache: options.cache ?? (options.revalidate ? undefined : "no-store"),
    next: options.revalidate ? { revalidate: options.revalidate, tags: options.tags } : undefined,
  });

  let payload: ApiResponse<T>;
  try {
    payload = (await res.json()) as ApiResponse<T>;
  } catch {
    throw new ApiError(
      // A non-JSON body here almost always means the API is down or a proxy
      // returned an HTML error page — say that rather than "unexpected token".
      `The API returned an unreadable response (${res.status}). Is it running at ${BASE}?`,
      res.status,
      "server_error",
    );
  }

  if (!payload.ok) {
    throw new ApiError(payload.error, res.status, payload.code, payload.fields);
  }

  return payload.data;
}

/**
 * Same call, but returns null instead of throwing on 401/403/404.
 *
 * Used where "not signed in" or "no access" is an expected page state rather
 * than an error — a course page that renders Buy instead of Continue.
 */
export async function apiOrNull<T>(path: string, options: Options = {}): Promise<T | null> {
  try {
    return await api<T>(path, options);
  } catch (err) {
    if (err instanceof ApiError && [401, 403, 404].includes(err.status)) return null;
    throw err;
  }
}

export { BASE as API_BASE };
