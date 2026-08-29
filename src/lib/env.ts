import { z } from "zod";

/**
 * Fail fast at boot rather than at 2am inside a webhook handler.
 *
 * Split into two schemas because Cloudflare/Razorpay/Resend credentials are
 * only needed by server code — validating them in a client bundle would both
 * fail and leak their names.
 */

const serverSchema = z.object({
  DATABASE_URL: z.string().url(),

  AUTH_SECRET: z.string().min(32, "Generate one with: openssl rand -base64 32"),
  AUTH_GOOGLE_ID: z.string().optional(),
  AUTH_GOOGLE_SECRET: z.string().optional(),

  RAZORPAY_KEY_ID: z.string().min(1),
  RAZORPAY_KEY_SECRET: z.string().min(1),
  RAZORPAY_WEBHOOK_SECRET: z.string().min(1),

  CLOUDFLARE_ACCOUNT_ID: z.string().min(1),
  CLOUDFLARE_STREAM_TOKEN: z.string().min(1),
  CLOUDFLARE_STREAM_SIGNING_KEY_ID: z.string().min(1),
  // Base64-encoded PEM, so it survives being pasted into a single env var line.
  CLOUDFLARE_STREAM_SIGNING_KEY_PEM: z.string().min(1),
  CLOUDFLARE_STREAM_WEBHOOK_SECRET: z.string().optional(),

  R2_ACCOUNT_ID: z.string().min(1),
  R2_ACCESS_KEY_ID: z.string().min(1),
  R2_SECRET_ACCESS_KEY: z.string().min(1),
  R2_BUCKET: z.string().min(1),
  R2_PUBLIC_URL: z.string().url(),

  RESEND_API_KEY: z.string().min(1),
  EMAIL_FROM: z.string().min(1),

  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
});

const clientSchema = z.object({
  NEXT_PUBLIC_APP_URL: z.string().url(),
  NEXT_PUBLIC_RAZORPAY_KEY_ID: z.string().min(1),
});

function parseServerEnv() {
  const parsed = serverSchema.safeParse(process.env);
  if (!parsed.success) {
    const issues = parsed.error.issues
      .map((i) => `  - ${i.path.join(".")}: ${i.message}`)
      .join("\n");
    throw new Error(`Invalid server environment variables:\n${issues}`);
  }
  return parsed.data;
}

/**
 * Lazily parsed so that importing a module which merely *mentions* env does not
 * blow up during `next build`, when most secrets are legitimately absent.
 */
let cachedServerEnv: z.infer<typeof serverSchema> | null = null;

export function serverEnv() {
  if (typeof window !== "undefined") {
    throw new Error("serverEnv() was called in the browser. This is a bug — check for a missing 'server-only' import.");
  }
  cachedServerEnv ??= parseServerEnv();
  return cachedServerEnv;
}

// Next.js inlines NEXT_PUBLIC_* at build time only for literal property
// accesses, so these must be written out longhand rather than looped over.
export const clientEnv = clientSchema.parse({
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  NEXT_PUBLIC_RAZORPAY_KEY_ID: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
});
