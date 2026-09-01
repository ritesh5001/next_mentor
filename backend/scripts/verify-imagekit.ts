/**
 * ImageKit credential + signing checks.
 *
 *   pnpm verify:imagekit
 *
 * Written after the Cloudflare signing key silently failed with a valid-looking
 * config: a green typecheck says nothing about whether a credential works.
 * These call the real API.
 */
import crypto from "node:crypto";

import { createUploadAuth, publicUrl, imageUrl, IMAGEKIT_UPLOAD_URL } from "@/lib/imagekit";
import { env } from "@/lib/env";

let failures = 0;
function check(label: string, ok: boolean, detail = "") {
  console.log(`${ok ? "PASS" : "FAIL"}  ${label}${detail ? ` — ${detail}` : ""}`);
  if (!ok) failures++;
}

async function main() {
  const cfg = env("imagekit");

  check("public key looks right", cfg.IMAGEKIT_PUBLIC_KEY.startsWith("public_"),
    cfg.IMAGEKIT_PUBLIC_KEY.slice(0, 8) + "…");
  check("private key looks right", cfg.IMAGEKIT_PRIVATE_KEY.startsWith("private_"));
  check("endpoint is a URL", /^https:\/\//.test(cfg.IMAGEKIT_URL_ENDPOINT));

  // --- auth params ---
  const auth = createUploadAuth({
    folder: "thumbnails",
    contentType: "image/jpeg",
    contentLength: 200_000,
  });

  if ("error" in auth) {
    check("generates upload auth", false, auth.error);
  } else {
    check("generates upload auth", true);
    check("posts to the ImageKit endpoint", auth.uploadUrl === IMAGEKIT_UPLOAD_URL);
    check("signature present", auth.signature.length === 40, `${auth.signature.length} chars`);
    check("expire is in the future", auth.expire > Math.floor(Date.now() / 1000));
    check("expire within ImageKit's 1h limit",
      auth.expire - Math.floor(Date.now() / 1000) <= 3600);
    check("random filename, not the user's",
      /^[0-9a-f-]{36}\.jpg$/.test(auth.fileName), auth.fileName);
    check("folder is scoped", auth.folder === "/thumbnails", auth.folder);

    // The signature must be HMAC-SHA1(privateKey, token + expire) or ImageKit
    // rejects the upload with a generic error.
    const expected = crypto
      .createHmac("sha1", cfg.IMAGEKIT_PRIVATE_KEY)
      .update(auth.token + auth.expire)
      .digest("hex");
    check("signature matches HMAC-SHA1(token+expire)", auth.signature === expected);
  }

  // --- file type gating ---
  const exe = createUploadAuth({
    folder: "thumbnails", contentType: "application/x-msdownload", contentLength: 1000,
  });
  check("rejects an executable", "error" in exe);

  const pdfThumb = createUploadAuth({
    folder: "thumbnails", contentType: "application/pdf", contentLength: 1000,
  });
  check("rejects a PDF as a thumbnail", "error" in pdfThumb);

  const pdfKyc = createUploadAuth({
    folder: "kyc", contentType: "application/pdf", contentLength: 1000,
  });
  check("allows a PDF for KYC", !("error" in pdfKyc));

  const huge = createUploadAuth({
    folder: "avatars", contentType: "image/png", contentLength: 50 * 1024 * 1024,
  });
  check("rejects an oversized file", "error" in huge);

  const empty = createUploadAuth({
    folder: "avatars", contentType: "image/png", contentLength: 0,
  });
  check("rejects an empty file", "error" in empty);

  // --- url building ---
  const url = publicUrl("/thumbnails/abc.jpg");
  check("builds a public url", Boolean(url?.startsWith(cfg.IMAGEKIT_URL_ENDPOINT)), url ?? "null");
  check("absolute urls pass through",
    publicUrl("https://lh3.googleusercontent.com/x") === "https://lh3.googleusercontent.com/x");
  check("null in, null out", publicUrl(null) === null);

  const t = imageUrl("/thumbnails/abc.jpg", { width: 400 });
  check("applies transforms", Boolean(t?.includes("tr=w-400")), t ?? "null");
  check("uses auto format", Boolean(t?.includes("f-auto")));

  // --- the credentials actually work against the live API ---
  const res = await fetch("https://api.imagekit.io/v1/files?limit=1", {
    headers: {
      Authorization: `Basic ${Buffer.from(`${cfg.IMAGEKIT_PRIVATE_KEY}:`).toString("base64")}`,
    },
  });
  check("private key authenticates against the API", res.ok, `HTTP ${res.status}`);

  console.log(failures === 0 ? "\nAll checks passed." : `\n${failures} check(s) FAILED.`);
  process.exit(failures === 0 ? 0 : 1);
}

main().catch((e) => { console.error(e); process.exit(1); });
