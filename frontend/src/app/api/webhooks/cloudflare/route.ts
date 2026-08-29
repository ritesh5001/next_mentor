import { NextResponse } from "next/server";
import crypto from "node:crypto";
import { eq } from "drizzle-orm";

import { db } from "@/backend/db";
import { lessons } from "@/backend/db/schema";
import { revalidateTag } from "next/cache";
import { CATALOG_TAG } from "@/backend/services/courses";

/**
 * Cloudflare Stream notifies us here when transcoding finishes.
 *
 * Until this lands the lesson has a video ID but nothing playable, so
 * `videoStatus` stays out of "ready" and the course cannot be published.
 */
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Cloudflare signs with `Webhook-Signature: time=<ts>,sig1=<hmac>` where the
 * HMAC is over `<ts>.<body>`. Verified with timingSafeEqual, and the timestamp
 * is range-checked so a captured payload cannot be replayed later.
 */
function verifySignature(rawBody: string, header: string | null, secret: string): boolean {
  if (!header) return false;

  const parts = Object.fromEntries(
    header.split(",").map((kv) => {
      const [k, ...rest] = kv.split("=");
      return [k.trim(), rest.join("=")];
    }),
  );

  const time = parts.time;
  const sig = parts.sig1;
  if (!time || !sig) return false;

  const ageSeconds = Math.abs(Date.now() / 1000 - Number(time));
  if (!Number.isFinite(ageSeconds) || ageSeconds > 300) return false;

  const expected = crypto
    .createHmac("sha256", secret)
    .update(`${time}.${rawBody}`)
    .digest("hex");

  const a = Buffer.from(expected, "utf8");
  const b = Buffer.from(sig, "utf8");
  if (a.length !== b.length) return false;

  return crypto.timingSafeEqual(a, b);
}

export async function POST(request: Request) {
  const rawBody = await request.text();
  const secret = process.env.CLOUDFLARE_STREAM_WEBHOOK_SECRET;

  // Fail closed. An unsigned endpoint that flips lessons to "ready" would let
  // anyone mark a lesson playable.
  if (!secret) {
    console.error("[cf-webhook] CLOUDFLARE_STREAM_WEBHOOK_SECRET is not set — rejecting");
    return NextResponse.json({ error: "Not configured" }, { status: 503 });
  }

  if (!verifySignature(rawBody, request.headers.get("webhook-signature"), secret)) {
    console.warn("[cf-webhook] Rejected: bad signature");
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  let body: {
    uid?: string;
    readyToStream?: boolean;
    status?: { state?: string; errorReasonText?: string };
    duration?: number;
  };
  try {
    body = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: "Malformed JSON" }, { status: 400 });
  }

  if (!body.uid) return NextResponse.json({ received: true });

  const state = body.status?.state;
  const videoStatus =
    body.readyToStream && state === "ready"
      ? "ready"
      : state === "error"
        ? "errored"
        : "processing";

  // Cloudflare reports duration as a float; the column is an integer of seconds.
  const durationSeconds = Math.round(body.duration ?? 0);

  const updated = await db
    .update(lessons)
    .set({
      videoStatus,
      durationSeconds: durationSeconds > 0 ? durationSeconds : undefined,
      updatedAt: new Date(),
    })
    .where(eq(lessons.streamVideoId, body.uid))
    .returning({ id: lessons.id });

  if (updated.length > 0) {
    // Duration feeds the catalog card, so the cached copy is now stale.
    // Not a Server Action, so updateTag() is unavailable here; expire:0
    // drops the cached catalog entry immediately instead.
    revalidateTag(CATALOG_TAG, { expire: 0 });
    console.info("[cf-webhook] Lesson video", videoStatus, updated[0].id);
  }

  return NextResponse.json({ received: true });
}
