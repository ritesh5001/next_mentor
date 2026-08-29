import { z } from "zod";

/**
 * Server-only secrets, validated per service rather than all at once.
 *
 * The earlier version parsed every variable in one schema. That coupled
 * unrelated services together: verifying a Razorpay webhook signature would
 * throw because a Cloudflare key was unset, even though that code path never
 * touches Cloudflare. Grouping keeps the fail-fast error — it just scopes the
 * blast radius to the service that actually needs the value.
 *
 * Public NEXT_PUBLIC_* variables live in src/shared/env.ts.
 */

const groups = {
  database: z.object({
    DATABASE_URL: z.string().url(),
  }),

  auth: z.object({
    AUTH_SECRET: z.string().min(32, "Generate one with: openssl rand -base64 32"),
    AUTH_GOOGLE_ID: z.string().optional(),
    AUTH_GOOGLE_SECRET: z.string().optional(),
  }),

  razorpay: z.object({
    RAZORPAY_KEY_ID: z.string().min(1),
    RAZORPAY_KEY_SECRET: z.string().min(1),
    RAZORPAY_WEBHOOK_SECRET: z.string().min(1),
  }),

  cloudflare: z.object({
    CLOUDFLARE_ACCOUNT_ID: z.string().min(1),
    CLOUDFLARE_STREAM_TOKEN: z.string().min(1),
    CLOUDFLARE_STREAM_SIGNING_KEY_ID: z.string().min(1),
    // Base64-encoded PEM, so it survives being a single env var line.
    CLOUDFLARE_STREAM_SIGNING_KEY_PEM: z.string().min(1),
  }),

  r2: z.object({
    R2_ACCOUNT_ID: z.string().min(1),
    R2_ACCESS_KEY_ID: z.string().min(1),
    R2_SECRET_ACCESS_KEY: z.string().min(1),
    R2_BUCKET: z.string().min(1),
    R2_PUBLIC_URL: z.string().url(),
  }),

  email: z.object({
    RESEND_API_KEY: z.string().min(1),
    EMAIL_FROM: z.string().min(1),
  }),
} as const;

type Groups = typeof groups;
type GroupName = keyof Groups;

const cache = new Map<GroupName, unknown>();

/**
 * Reads and validates one group of secrets, memoised after the first call.
 *
 * Lazy rather than module-scope so `next build` does not require every
 * credential to be present just to compile a route that mentions one.
 */
export function env<K extends GroupName>(group: K): z.infer<Groups[K]> {
  if (typeof window !== "undefined") {
    throw new Error(
      `env("${group}") was called in the browser. This is a bug — check for a missing 'server-only' import.`,
    );
  }

  const hit = cache.get(group);
  if (hit) return hit as z.infer<Groups[K]>;

  const parsed = groups[group].safeParse(process.env);
  if (!parsed.success) {
    const issues = parsed.error.issues
      .map((i) => `  - ${i.path.join(".")}: ${i.message}`)
      .join("\n");
    throw new Error(`Missing or invalid ${group} environment variables:\n${issues}`);
  }

  cache.set(group, parsed.data);
  return parsed.data as z.infer<Groups[K]>;
}
