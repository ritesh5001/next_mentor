/**
 * Applies the CORS policy the browser upload needs.
 *
 *   pnpm r2:cors                      # apply, then read it back
 *   pnpm r2:cors -- --show            # just show what is set now
 *
 * Why this exists: a presigned PUT is issued by the API but performed by the
 * admin's browser, which makes it a cross-origin request. R2 buckets reject
 * those by default, and the browser reports the rejection to XHR as a bare
 * network error with no status. On screen that looked like "Upload failed.
 * Check your connection", which sends people to test their wifi when the
 * bucket simply has not been told who is allowed to talk to it.
 *
 * Origins are read from CORS_ORIGINS so this cannot drift from what the API
 * already allows.
 */
import {
  GetBucketCorsCommand,
  PutBucketCorsCommand,
  S3Client,
} from "@aws-sdk/client-s3";

import { env } from "@/lib/env";

function origins(): string[] {
  const raw = process.env.CORS_ORIGINS ?? "";
  const list = raw
    .split(",")
    .map((o) => o.trim().replace(/\/+$/, "")) // a trailing slash never matches
    .filter(Boolean);

  // Local development is always allowed: without it nobody can test an upload
  // before deploying.
  for (const dev of ["http://localhost:3000", "http://127.0.0.1:3000"]) {
    if (!list.includes(dev)) list.push(dev);
  }
  return list;
}

async function main() {
  const cfg = env("r2");
  const s3 = new S3Client({
    region: "auto",
    endpoint: `https://${cfg.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: cfg.R2_ACCESS_KEY_ID,
      secretAccessKey: cfg.R2_SECRET_ACCESS_KEY,
    },
  });

  const show = process.argv.includes("--show");

  if (!show) {
    const allowed = origins();
    console.log(`  bucket:  ${cfg.R2_BUCKET}`);
    console.log(`  origins: ${allowed.join(", ")}`);

    await s3.send(
      new PutBucketCorsCommand({
        Bucket: cfg.R2_BUCKET,
        CORSConfiguration: {
          CORSRules: [
            {
              AllowedOrigins: allowed,
              // PUT for the upload. GET and HEAD so the player can fetch and
              // range-request playback through a presigned URL.
              AllowedMethods: ["PUT", "GET", "HEAD"],
              // The presigned PUT signs Content-Type, so the browser must be
              // allowed to send it. Range is what makes seeking work.
              AllowedHeaders: ["Content-Type", "Range"],
              ExposeHeaders: ["ETag", "Content-Length", "Content-Range"],
              MaxAgeSeconds: 3600,
            },
          ],
        },
      }),
    );
    console.log("  applied.");
  }

  const current = await s3.send(new GetBucketCorsCommand({ Bucket: cfg.R2_BUCKET }));
  console.log("\n  current policy:");
  for (const rule of current.CORSRules ?? []) {
    console.log(`    origins: ${rule.AllowedOrigins?.join(", ")}`);
    console.log(`    methods: ${rule.AllowedMethods?.join(", ")}`);
    console.log(`    headers: ${rule.AllowedHeaders?.join(", ")}`);
  }
}

main().catch((e) => {
  console.error("\n  Failed:", e instanceof Error ? e.message : e);
  console.error("  Check R2_* in .env, and that the token has Object Read & Write on this bucket.");
  process.exit(1);
});
