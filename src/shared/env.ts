import { z } from "zod";

/**
 * Public environment variables — safe in both the browser and on the server.
 *
 * Lives in shared/ rather than backend/ precisely because it holds nothing
 * secret. Server secrets are in backend/lib/env.ts, which frontend code is
 * blocked from importing (see eslint.config.mjs).
 */
const clientSchema = z.object({
  NEXT_PUBLIC_APP_URL: z.string().url(),
  NEXT_PUBLIC_RAZORPAY_KEY_ID: z.string().min(1),
});

// Next.js inlines NEXT_PUBLIC_* at build time only for literal property
// accesses, so these must be written out longhand rather than looped over.
export const clientEnv = clientSchema.parse({
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  NEXT_PUBLIC_RAZORPAY_KEY_ID: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
});
