/**
 * Environment variable fallbacks that survive an empty string.
 *
 * `process.env.X ?? "default"` looks right and is wrong in production. `??`
 * only falls back on null/undefined — a variable that exists but is blank
 * passes straight through. Hosting dashboards create exactly that: adding a key
 * and leaving the value box empty sets it to "".
 *
 * That produced two failures here:
 *   - `new URL("")` threw and broke the Vercel build
 *   - `API_URL ?? NEXT_PUBLIC_API_URL ?? "http://localhost:4000"` silently
 *     resolved to localhost in production, so every API call failed with no
 *     obvious cause
 *
 * The second is worse than the first. A build that fails is visible; a
 * production app quietly calling localhost is not.
 */

/** First non-blank value, else the fallback. Whitespace counts as blank. */
export function envOr(...values: Array<string | undefined | null>): string {
  for (const v of values) {
    const trimmed = v?.trim();
    if (trimmed) return trimmed;
  }
  return "";
}

/**
 * A URL from the environment, guaranteed parseable.
 *
 * Falls back when the value is blank OR malformed. A misconfigured variable
 * ("yourdomain.com" with no scheme, a stray quote) should degrade to the
 * default rather than crash the build — the log line says what happened.
 *
 * Returns a string with no trailing slash so callers can join paths safely.
 */
export function envUrl(value: string | undefined | null, fallback: string): string {
  const raw = envOr(value);

  if (raw) {
    try {
      return new URL(raw).toString().replace(/\/+$/, "");
    } catch {
      console.warn(
        `[env] "${raw}" is not a valid URL — falling back to ${fallback}. ` +
          `Check the value in your hosting dashboard.`,
      );
    }
  }

  try {
    return new URL(fallback).toString().replace(/\/+$/, "");
  } catch {
    // The fallback is a hard-coded literal, so reaching here means a typo in
    // source rather than bad configuration.
    return fallback.replace(/\/+$/, "");
  }
}
