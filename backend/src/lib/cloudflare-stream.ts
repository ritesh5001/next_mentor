import "server-only";

import { env } from "./env";

const API_BASE = "https://api.cloudflare.com/client/v4";

type CfResponse<T> = {
  success: boolean;
  errors: Array<{ code: number; message: string }>;
  result: T;
};

async function cf<T>(path: string, init?: RequestInit): Promise<T> {
  const cfg = env("cloudflare");
  const res = await fetch(`${API_BASE}/accounts/${cfg.CLOUDFLARE_ACCOUNT_ID}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${cfg.CLOUDFLARE_STREAM_TOKEN}`,
      "Content-Type": "application/json",
      ...init?.headers,
    },
    // Never cache an authenticated Cloudflare API call.
    cache: "no-store",
  });

  const body = (await res.json()) as CfResponse<T>;
  if (!res.ok || !body.success) {
    const detail = body.errors?.map((e) => `${e.code}: ${e.message}`).join(", ") ?? res.statusText;
    throw new Error(`Cloudflare Stream ${path} failed — ${detail}`);
  }
  return body.result;
}

/**
 * Issues a one-time upload URL that the browser PUTs the video to directly.
 *
 * The file never passes through Vercel, which sidesteps the serverless request
 * body limit entirely — a 2GB course video would be impossible to proxy.
 *
 * `requireSignedURLs: true` is the whole security model for paid video: without
 * it, anyone who learns a video UID can stream it forever, from anywhere.
 */
export async function createDirectUpload(params: {
  lessonId: string;
  courseId: string;
  maxDurationSeconds?: number;
}): Promise<{ uploadUrl: string; videoId: string }> {
  const result = await cf<{ uploadURL: string; uid: string }>("/stream/direct_upload", {
    method: "POST",
    body: JSON.stringify({
      maxDurationSeconds: params.maxDurationSeconds ?? 7200,
      requireSignedURLs: true,
      // Upload link is single-use and short-lived.
      expiry: new Date(Date.now() + 30 * 60 * 1000).toISOString(),
      meta: {
        lessonId: params.lessonId,
        courseId: params.courseId,
      },
    }),
  });

  return { uploadUrl: result.uploadURL, videoId: result.uid };
}

export type StreamVideoDetails = {
  uid: string;
  readyToStream: boolean;
  status: { state: string; errorReasonText?: string };
  duration: number;
  thumbnail: string;
};

export async function getVideoDetails(videoId: string): Promise<StreamVideoDetails> {
  return cf<StreamVideoDetails>(`/stream/${videoId}`);
}

export async function deleteVideo(videoId: string): Promise<void> {
  const cfg = env("cloudflare");
  const res = await fetch(`${API_BASE}/accounts/${cfg.CLOUDFLARE_ACCOUNT_ID}/stream/${videoId}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${cfg.CLOUDFLARE_STREAM_TOKEN}` },
    cache: "no-store",
  });
  // A 404 means it is already gone, which is the state we wanted.
  if (!res.ok && res.status !== 404) {
    throw new Error(`Failed to delete Stream video ${videoId}: ${res.statusText}`);
  }
}

function base64url(input: ArrayBuffer | string): string {
  const bytes =
    typeof input === "string" ? new TextEncoder().encode(input) : new Uint8Array(input);
  let binary = "";
  for (const b of bytes) binary += String.fromCharCode(b);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

/**
 * Mints a short-lived signed playback token for one video.
 *
 * CALLER CONTRACT: enrollment must already have been verified on the server —
 * see `authorizeLessonPlayback` in lib/permissions.ts. This function does no
 * authorization of its own; it will happily sign a token for anyone.
 *
 * Two hours is a deliberate trade-off: long enough that a token does not expire
 * mid-lesson, short enough that a leaked URL stops working the same afternoon.
 */
export async function signPlaybackToken(
  videoId: string,
  options: { expiresInSeconds?: number; downloadable?: boolean } = {},
): Promise<string> {
  const cfg = env("cloudflare");
  const expiresIn = options.expiresInSeconds ?? 2 * 60 * 60;

  const pem = Buffer.from(cfg.CLOUDFLARE_STREAM_SIGNING_KEY_PEM, "base64").toString("utf8");
  const der = pemToArrayBuffer(pem);

  const key = await crypto.subtle.importKey(
    "pkcs8",
    der,
    { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
    false,
    ["sign"],
  );

  const header = base64url(
    JSON.stringify({ alg: "RS256", kid: cfg.CLOUDFLARE_STREAM_SIGNING_KEY_ID }),
  );
  const payload = base64url(
    JSON.stringify({
      sub: videoId,
      kid: cfg.CLOUDFLARE_STREAM_SIGNING_KEY_ID,
      exp: Math.floor(Date.now() / 1000) + expiresIn,
      nbf: Math.floor(Date.now() / 1000) - 30, // tolerate minor clock skew
      downloadable: options.downloadable ?? false,
    }),
  );

  const signature = await crypto.subtle.sign(
    "RSASSA-PKCS1-v1_5",
    key,
    new TextEncoder().encode(`${header}.${payload}`),
  );

  return `${header}.${payload}.${base64url(signature)}`;
}

function pemToArrayBuffer(pem: string): ArrayBuffer {
  const body = pem
    .replace(/-----BEGIN [^-]+-----/, "")
    .replace(/-----END [^-]+-----/, "")
    .replace(/\s+/g, "");
  const binary = atob(body);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes.buffer;
}

export function hlsManifestUrl(token: string): string {
  return `https://videodelivery.net/${token}/manifest/video.m3u8`;
}

export function thumbnailUrl(token: string, timeSeconds = 1): string {
  return `https://videodelivery.net/${token}/thumbnails/thumbnail.jpg?time=${timeSeconds}s`;
}
