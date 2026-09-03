/**
 * R2 video storage checks.
 *
 *   pnpm verify:r2
 *
 * Replaces verify-stream. Video moved off Cloudflare Stream to R2, and the
 * property that matters is unchanged: a paid lesson must be unreachable
 * without a signature this server minted. A green typecheck says nothing about
 * whether the bucket exists, the token can write to it, or whether the object
 * is quietly world-readable.
 *
 * Everything it creates, it deletes.
 */
import {
  createVideoUpload,
  signVideoUrl,
  headVideo,
  deleteVideo,
  ALLOWED_VIDEO_TYPES,
  MAX_VIDEO_BYTES,
} from "@/lib/r2-video";
import { env } from "@/lib/env";

let failures = 0;
function check(label: string, ok: boolean, detail = "") {
  console.log(`${ok ? "PASS" : "FAIL"}  ${label}${detail ? ` — ${detail}` : ""}`);
  if (!ok) failures++;
}

async function main() {
  const cfg = env("r2");
  check("R2 is configured", Boolean(cfg.R2_BUCKET && cfg.R2_ACCOUNT_ID));

  const courseId = "verify-course";
  const lessonId = `verify-${Date.now()}`;

  // ------------------------------------------------------------- upload url
  const { uploadUrl, key } = await createVideoUpload({
    courseId,
    lessonId,
    contentType: "video/mp4",
  });

  check("presigned PUT is issued", uploadUrl.startsWith("https://"));
  check("the url is signed", uploadUrl.includes("X-Amz-Signature"));
  check("the url expires", uploadUrl.includes("X-Amz-Expires"));
  check("the key is scoped to the course and lesson",
    key.startsWith(`videos/${courseId}/${lessonId}/`), key);

  let rejected = false;
  try {
    await createVideoUpload({ courseId, lessonId, contentType: "video/x-matroska" });
  } catch {
    rejected = true;
  }
  check("a format browsers cannot play is refused", rejected);
  check("mp4 and webm are allowed",
    ALLOWED_VIDEO_TYPES.has("video/mp4") && ALLOWED_VIDEO_TYPES.has("video/webm"));
  check("the size ceiling is a single-part PUT limit", MAX_VIDEO_BYTES === 5 * 1024 * 1024 * 1024);

  // ------------------------------------------------------------ round trip
  // A tiny payload, not real video: this proves the credentials can write and
  // read, which is the part that silently breaks.
  const payload = Buffer.from("nextmentor-r2-verify");
  const put = await fetch(uploadUrl, {
    method: "PUT",
    headers: { "Content-Type": "video/mp4" },
    body: new Uint8Array(payload),
  });
  check("the browser's PUT is accepted", put.ok, `HTTP ${put.status}`);

  const head = await headVideo(key);
  check("the object is in the bucket afterwards", head !== null && head.bytes === payload.length,
    head ? `${head.bytes} bytes` : "missing");

  // --------------------------------------------------------- access control
  // The whole security model in one assertion: the object must be useless
  // without a signature, or paid video is free to anyone who learns the key.
  const publicUrl = `https://${cfg.R2_ACCOUNT_ID}.r2.cloudflarestorage.com/${cfg.R2_BUCKET}/${key}`;
  const unsigned = await fetch(publicUrl);
  check("an unsigned request is refused", unsigned.status === 401 || unsigned.status === 403,
    `HTTP ${unsigned.status}`);

  const signed = await fetch(await signVideoUrl(key, 120));
  check("a signed request is served", signed.ok, `HTTP ${signed.status}`);
  check("the bytes come back intact", (await signed.text()) === payload.toString());

  const expired = await signVideoUrl(key, 1);
  await new Promise((r) => setTimeout(r, 2000));
  const afterExpiry = await fetch(expired);
  check("an expired signature stops working",
    afterExpiry.status === 401 || afterExpiry.status === 403, `HTTP ${afterExpiry.status}`);

  // Range requests are what let the player seek without pulling the whole file.
  const ranged = await fetch(await signVideoUrl(key, 120), { headers: { Range: "bytes=0-4" } });
  check("R2 honours range requests", ranged.status === 206, `HTTP ${ranged.status}`);

  // ---------------------------------------------------------------- cleanup
  await deleteVideo(key);
  check("the object is removed afterwards", (await headVideo(key)) === null);

  console.log(failures === 0 ? "\nAll checks passed." : `\n${failures} check(s) FAILED.`);
  process.exit(failures === 0 ? 0 : 1);
}

main().catch((e) => { console.error(e); process.exit(1); });
