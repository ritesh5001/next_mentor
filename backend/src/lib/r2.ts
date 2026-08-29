import { S3Client, DeleteObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

import { env } from "./env";

/**
 * Cloudflare R2 for images and documents — thumbnails, avatars, and later
 * certificates and promotional material.
 *
 * R2 speaks the S3 API, so the AWS SDK works unchanged. Uploads use a presigned
 * PUT so the file goes from the browser straight to R2 and never passes through
 * a serverless function, the same reasoning as Cloudflare Stream for video.
 */

let client: S3Client | null = null;

function r2(): S3Client {
  const cfg = env("r2");
  client ??= new S3Client({
    region: "auto",
    endpoint: `https://${cfg.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: cfg.R2_ACCESS_KEY_ID,
      secretAccessKey: cfg.R2_SECRET_ACCESS_KEY,
    },
  });
  return client;
}

/** Only formats we can safely serve inline and that next/image can optimise. */
const ALLOWED_IMAGE_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif",
]);

export const MAX_IMAGE_BYTES = 5 * 1024 * 1024;

export type UploadTarget = { uploadUrl: string; key: string; publicUrl: string };

/**
 * Issues a short-lived presigned PUT for one image.
 *
 * The content type and size cap are baked into the signature, so a client that
 * asks for a JPEG cannot then upload an HTML file — the signature simply will
 * not match. Validating only on our side would be advisory; this is enforced
 * by R2 at the point of upload.
 */
export async function createImageUpload(params: {
  prefix: "thumbnails" | "avatars" | "promo";
  contentType: string;
  contentLength: number;
}): Promise<UploadTarget | { error: string }> {
  if (!ALLOWED_IMAGE_TYPES.has(params.contentType)) {
    return { error: "Use a JPEG, PNG, WebP or AVIF image." };
  }
  if (params.contentLength > MAX_IMAGE_BYTES) {
    return { error: `Images must be under ${MAX_IMAGE_BYTES / 1024 / 1024}MB.` };
  }
  if (params.contentLength <= 0) {
    return { error: "That file appears to be empty." };
  }

  const cfg = env("r2");
  const ext = params.contentType.split("/")[1].replace("jpeg", "jpg");
  // Random key rather than the original filename: filenames collide, leak
  // information, and can carry path traversal.
  const key = `${params.prefix}/${crypto.randomUUID()}.${ext}`;

  const uploadUrl = await getSignedUrl(
    r2(),
    new PutObjectCommand({
      Bucket: cfg.R2_BUCKET,
      Key: key,
      ContentType: params.contentType,
      ContentLength: params.contentLength,
    }),
    { expiresIn: 600 },
  );

  return {
    uploadUrl,
    key,
    publicUrl: `${cfg.R2_PUBLIC_URL.replace(/\/$/, "")}/${key}`,
  };
}

/**
 * Removes an object. Never throws — a failed cleanup must not fail the request
 * that triggered it, since the database row is the thing that matters.
 */
export async function deleteObject(key: string): Promise<void> {
  if (!key) return;
  try {
    const cfg = env("r2");
    await r2().send(new DeleteObjectCommand({ Bucket: cfg.R2_BUCKET, Key: key }));
  } catch (err) {
    console.error("[r2] Delete failed — object may be orphaned", key, err);
  }
}

/** Builds the public URL for a stored key. */
export function publicUrl(key: string | null | undefined): string | null {
  if (!key) return null;
  try {
    return `${env("r2").R2_PUBLIC_URL.replace(/\/$/, "")}/${key.replace(/^\//, "")}`;
  } catch {
    // R2 not configured — callers render a placeholder.
    return null;
  }
}
