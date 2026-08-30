import { z } from "zod";
import { envOr, envUrl } from "@nextmentor/shared";


/**
 * Server secrets, validated per service rather than all at once.
 *
 * Grouping keeps the blast radius small: verifying a Razorpay signature must
 * not throw because an unrelated Cloudflare key is unset.
 */

const groups = {
  database: z.object({ DATABASE_URL: z.string().url() }),

  auth: z.object({
    AUTH_SECRET: z.string().min(32, "Generate one with: openssl rand -base64 32"),
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

/** Reads and validates one group, memoised after the first call. */
export function env<K extends GroupName>(group: K): z.infer<Groups[K]> {
  const hit = cache.get(group);
  if (hit) return hit as z.infer<Groups[K]>;

  const parsed = groups[group].safeParse(process.env);
  if (!parsed.success) {
    const issues = parsed.error.issues.map((i) => `  - ${i.path.join(".")}: ${i.message}`).join("\n");
    throw new Error(`Missing or invalid ${group} environment variables:\n${issues}`);
  }

  cache.set(group, parsed.data);
  return parsed.data as z.infer<Groups[K]>;
}

/**
 * The public site's base URL.
 *
 * The API lives on a different origin now, so links in emails must point at the
 * frontend, never at this service. WEB_ORIGIN is that address.
 */
export function appUrl(): string {
  // envUrl, not ??: a WEB_ORIGIN set to "" would put localhost links in every
  // outgoing email in production.
  return envUrl(process.env.WEB_ORIGIN, "http://localhost:3000");
}

/** Origins allowed to call this API. Comma-separated in one env var. */
export function allowedOrigins(): string[] {
  // An empty CORS_ORIGINS would fall through to localhost and reject every
  // request from the real frontend — with a CORS error in the browser and
  // nothing useful in the server log.
  const raw = envOr(
    process.env.CORS_ORIGINS,
    process.env.WEB_ORIGIN,
    "http://localhost:3000",
  );
  return raw.split(",").map((o) => o.trim()).filter(Boolean);
}
