import ImageKit from "imagekit";

import { env } from "./env";

/**
 * ImageKit for every non-video asset: course thumbnails, avatars, promotional
 * material, certificates, KYC documents.
 *
 * Video stays on Cloudflare Stream — see lib/cloudflare-stream.ts. Stream does
 * adaptive HLS transcoding and signed per-viewer playback tokens, which is the
 * whole security model for paid course video. ImageKit does not replace that.
 *
 * UPLOAD SHAPE — different from the S3/R2 presigned-PUT this replaced.
 *
 * R2 handed the browser a signed URL to PUT the raw bytes at. ImageKit instead
 * has the browser POST multipart form-data to ITS endpoint, carrying a
 * short-lived signature this server generates. The private key never reaches
 * the client either way; the mechanics just differ, so the contract returned to
 * the frontend is a set of auth params rather than a single URL.
 */

let client: ImageKit | null = null;

function ik(): ImageKit {
  const cfg = env("imagekit");
  client ??= new ImageKit({
    publicKey: cfg.IMAGEKIT_PUBLIC_KEY,
    privateKey: cfg.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: cfg.IMAGEKIT_URL_ENDPOINT,
  });
  return client;
}

export const IMAGEKIT_UPLOAD_URL = "https://upload.imagekit.io/api/v1/files/upload";

/** Formats we are willing to serve inline and that next/image can optimise. */
const ALLOWED_IMAGE_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif",
]);

/** KYC documents and promo material may also be PDFs. */
const ALLOWED_DOC_TYPES = new Set(["application/pdf"]);

export const MAX_IMAGE_BYTES = 5 * 1024 * 1024;
export const MAX_DOC_BYTES = 10 * 1024 * 1024;

export type UploadFolder = "thumbnails" | "avatars" | "promo" | "certificates" | "kyc";

/**
 * What the browser needs to upload directly to ImageKit.
 *
 * `expire` is a unix timestamp; ImageKit rejects anything more than an hour
 * out, and a short window limits how long a leaked signature is useful.
 */
export type UploadAuth = {
  uploadUrl: string;
  publicKey: string;
  signature: string;
  expire: number;
  token: string;
  folder: string;
  fileName: string;
  /** Echoed back so the client can set the right Content-Type expectations. */
  maxBytes: number;
};

export function createUploadAuth(params: {
  folder: UploadFolder;
  contentType: string;
  contentLength: number;
}): UploadAuth | { error: string } {
  const isDoc = ALLOWED_DOC_TYPES.has(params.contentType);
  const isImage = ALLOWED_IMAGE_TYPES.has(params.contentType);

  // KYC and promo accept PDFs; a thumbnail or avatar must be an image.
  const docAllowed = params.folder === "kyc" || params.folder === "promo";

  if (!isImage && !(isDoc && docAllowed)) {
    return {
      error: docAllowed
        ? "Use a JPEG, PNG, WebP, AVIF or PDF file."
        : "Use a JPEG, PNG, WebP or AVIF image.",
    };
  }

  const maxBytes = isDoc ? MAX_DOC_BYTES : MAX_IMAGE_BYTES;

  if (params.contentLength <= 0) return { error: "That file appears to be empty." };
  if (params.contentLength > maxBytes) {
    return { error: `Files must be under ${Math.round(maxBytes / 1024 / 1024)}MB.` };
  }

  const cfg = env("imagekit");
  const auth = ik().getAuthenticationParameters();

  const ext = params.contentType.split("/")[1].replace("jpeg", "jpg");
  // Random name, never the user's filename: filenames collide, leak
  // information about the uploader, and can carry path traversal.
  const fileName = `${crypto.randomUUID()}.${ext}`;

  return {
    uploadUrl: IMAGEKIT_UPLOAD_URL,
    publicKey: cfg.IMAGEKIT_PUBLIC_KEY,
    signature: auth.signature,
    expire: auth.expire,
    token: auth.token,
    folder: `/${params.folder}`,
    fileName,
    maxBytes,
  };
}

/**
 * Removes a stored file.
 *
 * ImageKit deletes by fileId, but we store the filePath (so that existing
 * columns keep working and no migration was needed). One lookup converts.
 * Never throws — a failed cleanup must not fail the request that triggered it,
 * since the database row is the thing that matters.
 */
export async function deleteObject(filePath: string | null | undefined): Promise<void> {
  if (!filePath) return;

  try {
    const name = filePath.split("/").pop();
    if (!name) return;

    const matches = await ik().listFiles({ name, limit: 1 });
    const file = matches[0];
    if (!file || !("fileId" in file)) return;

    await ik().deleteFile(file.fileId);
  } catch (err) {
    console.error("[imagekit] Delete failed — file may be orphaned", filePath, err);
  }
}

/**
 * Public URL for a stored path.
 *
 * Paths are stored rather than absolute URLs so the delivery endpoint can
 * change without a data migration — the same reasoning that applied to R2 keys.
 */
export function publicUrl(filePath: string | null | undefined): string | null {
  if (!filePath) return null;

  // Already absolute (an OAuth avatar, or a legacy R2 URL).
  if (filePath.startsWith("http://") || filePath.startsWith("https://")) return filePath;

  try {
    const endpoint = env("imagekit").IMAGEKIT_URL_ENDPOINT.replace(/\/+$/, "");
    return `${endpoint}/${filePath.replace(/^\/+/, "")}`;
  } catch {
    // ImageKit not configured — callers render a placeholder.
    return null;
  }
}

/**
 * A resized, format-optimised URL.
 *
 * ImageKit transforms on the fly, so a 4000px thumbnail upload still gets
 * served as a right-sized WebP/AVIF. `f-auto` picks the format from the
 * browser's Accept header; `q-auto` picks quality from the content.
 */
export function imageUrl(
  filePath: string | null | undefined,
  opts: { width?: number; height?: number; quality?: number } = {},
): string | null {
  const base = publicUrl(filePath);
  if (!base || base.startsWith("http") === false) return base;

  const tr = [
    opts.width ? `w-${opts.width}` : null,
    opts.height ? `h-${opts.height}` : null,
    opts.quality ? `q-${opts.quality}` : "q-auto",
    "f-auto",
  ]
    .filter(Boolean)
    .join(",");

  const sep = base.includes("?") ? "&" : "?";
  return `${base}${sep}tr=${tr}`;
}

/* ------------------------------------------------------ private documents */

/** Identity documents accepted for KYC. */
export const KYC_DOC_SLOTS = [
  "aadhaarFront",
  "aadhaarBack",
  "panFront",
  "panBack",
  "bankProof",
] as const;

export type KycDocSlot = (typeof KYC_DOC_SLOTS)[number];

export const KYC_DOC_LABELS: Record<KycDocSlot, string> = {
  aadhaarFront: "Aadhaar — front",
  aadhaarBack: "Aadhaar — back",
  panFront: "PAN — front",
  panBack: "PAN — back",
  bankProof: "Bank passbook or cancelled cheque",
};

/**
 * Uploads an identity document from the server.
 *
 * Deliberately NOT the browser-direct path used for thumbnails and avatars.
 * ImageKit's upload signature covers only `token + expire`, so every other form
 * field — including `isPrivateFile` — is client-controlled. For a course
 * thumbnail that does not matter. For a government ID it means a modified
 * client could publish somebody's Aadhaar card to a public URL.
 *
 * Routing these few megabytes through the API is the cost of making the
 * privacy flag non-negotiable. The backend is a long-lived Node service, so
 * there is no serverless body limit to fight.
 */
export async function uploadPrivateDocument(params: {
  file: Buffer;
  contentType: string;
  slot: KycDocSlot;
  userId: string;
}): Promise<{ filePath: string } | { error: string }> {
  const isImage = ALLOWED_IMAGE_TYPES.has(params.contentType);
  const isPdf = ALLOWED_DOC_TYPES.has(params.contentType);

  if (!isImage && !isPdf) {
    return { error: "Upload a JPEG, PNG, WebP, AVIF or PDF." };
  }
  if (params.file.length === 0) return { error: "That file appears to be empty." };
  if (params.file.length > MAX_DOC_BYTES) {
    return { error: `Documents must be under ${Math.round(MAX_DOC_BYTES / 1024 / 1024)}MB.` };
  }

  const ext = params.contentType.split("/")[1].replace("jpeg", "jpg");

  try {
    const res = await ik().upload({
      file: params.file,
      // Foldered per user so one person's documents are never adjacent to
      // another's, and a random name so paths cannot be guessed.
      fileName: `${params.slot}-${crypto.randomUUID()}.${ext}`,
      folder: `/kyc/${params.userId}`,
      useUniqueFileName: false,
      // The whole point: without this the original URL is publicly fetchable.
      isPrivateFile: true,
    });

    return { filePath: res.filePath };
  } catch (err) {
    console.error("[imagekit] KYC document upload failed", params.slot, err);
    return { error: "Could not store that document. Please try again." };
  }
}

/**
 * A short-lived signed URL for a private file.
 *
 * Staff need to actually look at these during review. Five minutes is long
 * enough to open the image and short enough that a URL pasted into a chat or
 * left in browser history stops working quickly.
 */
export function signedDocumentUrl(
  filePath: string | null | undefined,
  expireSeconds = 300,
): string | null {
  if (!filePath) return null;

  try {
    return ik().url({
      path: filePath,
      signed: true,
      expireSeconds,
    });
  } catch (err) {
    console.error("[imagekit] Could not sign document url", filePath, err);
    return null;
  }
}
