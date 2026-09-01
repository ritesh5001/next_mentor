/**
 * Cloudflare Stream credential + signing checks.
 *
 *   pnpm verify:stream
 *
 * Exists because the signing key failed silently for a whole setup session:
 * Cloudflare issues a PKCS#1 key, the code imported it as PKCS#8, and the only
 * symptom was "Invalid keyData" at playback time. A green typecheck says
 * nothing about whether this key can actually sign.
 */
import nodeCrypto from "node:crypto";

import { signPlaybackToken, hlsManifestUrl } from "@/lib/cloudflare-stream";
import { env } from "@/lib/env";

let failures = 0;
function check(label: string, ok: boolean, detail = "") {
  console.log(`${ok ? "PASS" : "FAIL"}  ${label}${detail ? ` — ${detail}` : ""}`);
  if (!ok) failures++;
}

async function main() {
  const cfg = env("cloudflare");

  check("account id present", cfg.CLOUDFLARE_ACCOUNT_ID.length === 32);
  check("signing key id present", cfg.CLOUDFLARE_STREAM_SIGNING_KEY_ID.length > 0);

  // --- the key parses at all ---
  const raw = cfg.CLOUDFLARE_STREAM_SIGNING_KEY_PEM.trim();
  const pem = raw.includes("-----BEGIN") ? raw : Buffer.from(raw, "base64").toString("utf8");
  check("pem decodes to a PEM block", pem.includes("-----BEGIN"));

  let keyType = "";
  try {
    const k = nodeCrypto.createPrivateKey(pem);
    keyType = k.asymmetricKeyType ?? "";
    check("key parses as a private key", true, keyType);
  } catch (e) {
    check("key parses as a private key", false, (e as Error).message);
  }
  check("key is RSA", keyType === "rsa", keyType);

  // --- it can actually sign ---
  const token = await signPlaybackToken("testvideouid00000000000000000000", {
    expiresInSeconds: 300,
  });
  const parts = token.split(".");
  check("token has three parts", parts.length === 3, String(parts.length));

  const header = JSON.parse(Buffer.from(parts[0], "base64url").toString());
  const payload = JSON.parse(Buffer.from(parts[1], "base64url").toString());

  check("alg is RS256", header.alg === "RS256", header.alg);
  check("kid matches the signing key", header.kid === cfg.CLOUDFLARE_STREAM_SIGNING_KEY_ID);
  check("sub is the video id", payload.sub === "testvideouid00000000000000000000");
  check("exp is in the future", payload.exp > Date.now() / 1000);
  check("nbf tolerates clock skew", payload.nbf <= Date.now() / 1000);

  // --- the signature actually verifies against the key ---
  const verified = nodeCrypto.verify(
    "RSA-SHA256",
    Buffer.from(`${parts[0]}.${parts[1]}`),
    nodeCrypto.createPrivateKey(pem),
    Buffer.from(parts[2], "base64url"),
  );
  check("signature verifies against the key", verified);

  check("manifest url is well formed",
    hlsManifestUrl(token).startsWith("https://videodelivery.net/"));

  // --- the token is live against Cloudflare's API ---
  const res = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${cfg.CLOUDFLARE_ACCOUNT_ID}/stream/keys`,
    { headers: { Authorization: `Bearer ${cfg.CLOUDFLARE_STREAM_TOKEN}` } },
  );
  const body = (await res.json()) as { success?: boolean; errors?: Array<{ message: string }> };
  check("stream token can reach the API", Boolean(body.success),
    body.success ? "" : (body.errors?.[0]?.message ?? "unknown"));

  console.log(failures === 0 ? "\nAll checks passed." : `\n${failures} check(s) FAILED.`);
  process.exit(failures === 0 ? 0 : 1);
}

main().catch((e) => { console.error(e); process.exit(1); });
