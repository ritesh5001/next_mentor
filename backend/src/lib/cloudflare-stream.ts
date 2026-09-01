import nodeCrypto from "node:crypto";
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

  const signature = nodeCrypto
    .sign("RSA-SHA256", Buffer.from(`${header}.${payload}`), readSigningKey())
    .toString("base64url");

  return `${header}.${payload}.${signature}`;
}

/**
 * Loads the signing key, whatever shape it arrives in.
 *
 * Cloudflare's /stream/keys endpoint returns a **PKCS#1** key —
 * "-----BEGIN RSA PRIVATE KEY-----" — base64-encoded in the `pem` field.
 *
 * An earlier version of this decoded that and handed it to
 * `crypto.subtle.importKey("pkcs8", ...)`, which only accepts PKCS#8 and
 * failed with the famously unhelpful "Invalid keyData". WebCrypto has no
 * PKCS#1 import at all, so the fix is node:crypto's createPrivateKey, which
 * reads both formats. This is a plain Node service now, so there is no edge
 * runtime constraint pushing us toward WebCrypto.
 *
 * Also tolerates the env var holding a raw PEM rather than base64, since that
 * is the natural thing to paste if you copy it out of a terminal.
 */
function readSigningKey(): nodeCrypto.KeyObject {
  if (cachedKey) return cachedKey;

  const raw = env("cloudflare").CLOUDFLARE_STREAM_SIGNING_KEY_PEM.trim();

  const pem = raw.includes("-----BEGIN")
    ? raw
    : Buffer.from(raw, "base64").toString("utf8");

  if (!pem.includes("-----BEGIN")) {
    throw new Error(
      "CLOUDFLARE_STREAM_SIGNING_KEY_PEM is neither a PEM block nor base64 of one. " +
        "Re-create it with backend/scripts/get-stream-key.sh.",
    );
  }

  try {
    cachedKey = nodeCrypto.createPrivateKey(pem);
    return cachedKey;
  } catch (err) {
    // Keep the original as `cause`: node's message names the exact parse
    // failure, which is the only thing that distinguishes a truncated paste
    // from a wrong key format.
    throw new Error(
      "CLOUDFLARE_STREAM_SIGNING_KEY_PEM could not be parsed as a private key. " +
        "Re-create it with backend/scripts/get-stream-key.sh.",
      { cause: err },
    );
  }
}

let cachedKey: nodeCrypto.KeyObject | null = null;

export function hlsManifestUrl(token: string): string {
  return `https://videodelivery.net/${token}/manifest/video.m3u8`;
}

export function thumbnailUrl(token: string, timeSeconds = 1): string {
  return `https://videodelivery.net/${token}/thumbnails/thumbnail.jpg?time=${timeSeconds}s`;
}
