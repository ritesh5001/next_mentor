import {
  DeleteObjectCommand,
  GetObjectCommand,
  HeadObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

import { env } from "./env";

/**
 * Course video on Cloudflare R2.
 *
 * This replaced Cloudflare Stream. Stream bills per minute stored and per
 * minute delivered; R2 bills for bytes at rest and nothing for egress. The
 * saving is real, and so is the cost: R2 is object storage, so it stores
 * exactly the file that was uploaded. There is no transcode step, which means
 *
 *   - one rendition per lesson, so no adaptive bitrate. A viewer on a weak
 *     connection buffers instead of dropping to a lower quality.
 *   - duration comes from the browser at upload time, not from a probe.
 *   - the file must be a format browsers play natively. H.264 in MP4 is the
 *     only safe answer; the upload path rejects the rest.
 *
 * The security model survives the move. Playback is a presigned GET minted
 * only after the enrollment check, valid for a couple of hours, exactly as the
 * signed Stream token was.
 */

let client: S3Client | null = null;

function s3(): S3Client {
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

/**
 * What a browser can play without a transcode step.
 *
 * Deliberately narrow. R2 hands back whatever bytes it was given, so an
 * uploaded .mkv or .avi would store and bill happily and then fail silently in
 * every player. Better to refuse it at the door.
 */
export const ALLOWED_VIDEO_TYPES = new Set([
  "video/mp4",
  "video/webm",
  // Safari reports .mov this way and plays it when the codec is H.264.
  "video/quicktime",
]);

/** 5GB, which is also the ceiling for a single-part S3 PUT. */
export const MAX_VIDEO_BYTES = 5 * 1024 * 1024 * 1024;

export function videoKey(courseId: string, lessonId: string, ext: string): string {
  // Foldered per course so a course's objects can be listed and removed
  // together, and suffixed with a random id so re-uploading a lesson never
  // collides with a URL someone still has open.
  return `videos/${courseId}/${lessonId}/${crypto.randomUUID()}.${ext}`;
}

function extensionFor(contentType: string): string {
  if (contentType === "video/webm") return "webm";
  if (contentType === "video/quicktime") return "mov";
  return "mp4";
}

/**
 * A one-time URL the browser PUTs the video straight to.
 *
 * The bytes never touch our server, which is the same reason Stream's direct
 * creator upload existed: a 2GB lesson cannot be proxied through a serverless
 * request body.
 *
 * The signature covers the content type, so a client cannot claim `video/mp4`
 * here and then upload something else.
 */
export async function createVideoUpload(params: {
  courseId: string;
  lessonId: string;
  contentType: string;
}): Promise<{ uploadUrl: string; key: string; expiresInSeconds: number }> {
  if (!ALLOWED_VIDEO_TYPES.has(params.contentType)) {
    throw new Error(`Unsupported video type: ${params.contentType}`);
  }

  const cfg = env("r2");
  const key = videoKey(params.courseId, params.lessonId, extensionFor(params.contentType));
  const expiresInSeconds = 30 * 60;

  const uploadUrl = await getSignedUrl(
    s3(),
    new PutObjectCommand({
      Bucket: cfg.R2_BUCKET,
      Key: key,
      ContentType: params.contentType,
    }),
    { expiresIn: expiresInSeconds },
  );

  return { uploadUrl, key, expiresInSeconds };
}

/**
 * A short-lived playback URL.
 *
 * Minted only after entitlement has been checked. Two hours is long enough for
 * the longest lesson plus a pause, and short enough that a URL pasted into a
 * chat stops working the same afternoon.
 *
 * R2 honours HTTP range requests, so the browser's native player can seek
 * without downloading the whole file first.
 */
export async function signVideoUrl(key: string, expiresInSeconds = 2 * 60 * 60): Promise<string> {
  const cfg = env("r2");
  return getSignedUrl(
    s3(),
    new GetObjectCommand({ Bucket: cfg.R2_BUCKET, Key: key }),
    { expiresIn: expiresInSeconds },
  );
}

/** Confirms the browser's PUT actually landed, and how big it was. */
export async function headVideo(key: string): Promise<{ bytes: number } | null> {
  try {
    const cfg = env("r2");
    const res = await s3().send(
      new HeadObjectCommand({ Bucket: cfg.R2_BUCKET, Key: key }),
    );
    return { bytes: res.ContentLength ?? 0 };
  } catch {
    return null;
  }
}

/**
 * Removes a stored video.
 *
 * Never throws: a failed cleanup must not fail the request that triggered it.
 * An orphaned object costs a fraction of a cent a month; a 500 on a lesson
 * edit costs the admin their work.
 */
export async function deleteVideo(key: string | null | undefined): Promise<void> {
  if (!key) return;
  try {
    const cfg = env("r2");
    await s3().send(new DeleteObjectCommand({ Bucket: cfg.R2_BUCKET, Key: key }));
  } catch (err) {
    console.error("[r2] Delete failed — object may be orphaned", key, err);
  }
}

/* -------------------------------------------------------- lesson resources */

/** Worksheets and slide decks attached to a lesson. */
export const ALLOWED_RESOURCE_TYPES = new Set([
  "application/pdf",
  "image/jpeg",
  "image/png",
  "image/webp",
]);

export const MAX_RESOURCE_BYTES = 50 * 1024 * 1024;

/**
 * A presigned PUT for a lesson attachment.
 *
 * These used to be posted to a Server Action, which forwarded the bytes to
 * ImageKit. Two limits made that fail silently: a Next.js Server Action caps
 * its request body at 1MB, and Vercel caps a serverless request at 4.5MB. A
 * course workbook is routinely larger than both, and the rejection surfaced as
 * a spinner that never stopped.
 *
 * Going straight to R2 removes the middleman entirely: the bytes never touch
 * Vercel, so the only ceiling is the one below. Privacy is unchanged — the
 * bucket is private, and a download is a presigned GET minted only after the
 * enrollment check.
 */
export async function createResourceUpload(params: {
  courseId: string;
  lessonId: string;
  contentType: string;
  fileName: string;
}): Promise<{ uploadUrl: string; key: string }> {
  if (!ALLOWED_RESOURCE_TYPES.has(params.contentType)) {
    throw new Error(`Unsupported attachment type: ${params.contentType}`);
  }

  const cfg = env("r2");
  const ext = params.fileName.split(".").pop()?.toLowerCase().replace(/[^a-z0-9]/g, "") || "pdf";
  const key = `resources/${params.courseId}/${params.lessonId}/${crypto.randomUUID()}.${ext}`;

  const uploadUrl = await getSignedUrl(
    s3(),
    new PutObjectCommand({
      Bucket: cfg.R2_BUCKET,
      Key: key,
      ContentType: params.contentType,
    }),
    { expiresIn: 30 * 60 },
  );

  return { uploadUrl, key };
}

/**
 * A download link for an attachment.
 *
 * An hour rather than the five minutes a KYC document gets: a student may open
 * a lesson, read for a while, and download the worksheet at the end, and an
 * expired link there is just an annoying bug report.
 */
export async function signedResourceUrl(key: string, expiresInSeconds = 60 * 60): Promise<string> {
  return signVideoUrl(key, expiresInSeconds);
}
