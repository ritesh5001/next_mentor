import { z } from "zod";

/**
 * Public environment variables — safe in both the browser and on the server.
 *
 * Lives in shared/ precisely because it holds nothing secret. Server secrets
 * are in backend/lib/env.ts, which frontend code is blocked from importing
 * (see eslint.config.mjs).
 */
const clientSchema = z.object({
  NEXT_PUBLIC_APP_URL: z.string().url(),
  NEXT_PUBLIC_RAZORPAY_KEY_ID: z.string().min(1),
});

// Next.js inlines NEXT_PUBLIC_* at build time, but only for literal property
// accesses — so these must be written out longhand rather than looped over.
const raw = {
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  NEXT_PUBLIC_RAZORPAY_KEY_ID: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
};

let cached: z.infer<typeof clientSchema> | null = null;

/**
 * Validated public env, parsed on first use rather than at module load.
 *
 * Parsing at module scope meant that importing *any* module that transitively
 * touched this file — the Razorpay webhook route, for instance — failed the
 * whole `next build` when a key was absent. That is the wrong blast radius: a
 * missing payment key should break checkout loudly, not stop the site being
 * built at all. Lazy parsing keeps the fail-fast error, scoped to the code
 * that actually needs the value.
 */
export function clientEnv() {
  if (cached) return cached;

  const parsed = clientSchema.safeParse(raw);
  if (!parsed.success) {
    const issues = parsed.error.issues
      .map((i) => `  - ${i.path.join(".")}: ${i.message}`)
      .join("\n");
    throw new Error(`Invalid public environment variables:\n${issues}`);
  }

  cached = parsed.data;
  return cached;
}

/**
 * The app's base URL, with a localhost fallback.
 *
 * Separate from clientEnv() because email templates and metadata need a URL
 * during builds where no other public key is configured, and localhost is a
 * safe default there.
 */
export function appUrl(): string {
  return process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
}
