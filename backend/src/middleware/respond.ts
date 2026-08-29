import type { Context } from "hono";
import { ZodError, type ZodType } from "zod";
import type { ApiErrorCode } from "@nextmentor/shared";

/**
 * One response envelope for the whole API.
 *
 * Every route returns { ok: true, data } or { ok: false, error, code } so the
 * frontend client has exactly one shape to unwrap, and a thrown error can never
 * leak a stack trace to a browser.
 */

const STATUS: Record<ApiErrorCode, 400 | 401 | 403 | 404 | 409 | 429 | 500> = {
  validation: 400,
  unauthorized: 401,
  forbidden: 403,
  not_found: 404,
  conflict: 409,
  rate_limited: 429,
  server_error: 500,
};

export function ok<T>(c: Context, data: T, status: 200 | 201 = 200) {
  return c.json({ ok: true as const, data }, status);
}

export function fail(
  c: Context,
  error: string,
  code: ApiErrorCode = "validation",
  fields?: Record<string, string>,
) {
  return c.json({ ok: false as const, error, code, fields }, STATUS[code]);
}

/**
 * Parses and validates a JSON body.
 *
 * Returns a discriminated result rather than throwing, so route handlers stay
 * linear and every validation failure produces the same shaped response.
 */
export async function parseBody<T>(
  c: Context,
  schema: ZodType<T>,
): Promise<{ ok: true; data: T } | { ok: false; response: Response }> {
  let raw: unknown;
  try {
    raw = await c.req.json();
  } catch {
    return { ok: false, response: fail(c, "Expected a JSON body.", "validation") };
  }

  try {
    return { ok: true, data: schema.parse(raw) };
  } catch (err) {
    if (err instanceof ZodError) {
      const fields: Record<string, string> = {};
      for (const issue of err.issues) {
        const key = issue.path.join(".") || "_";
        fields[key] ??= issue.message;
      }
      return {
        ok: false,
        response: fail(c, err.issues[0]?.message ?? "Check the form and try again", "validation", fields),
      };
    }
    return { ok: false, response: fail(c, "Could not read that request.", "validation") };
  }
}
