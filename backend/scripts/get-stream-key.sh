#!/usr/bin/env bash
# Creates a Cloudflare Stream signing key and prints the two env vars.
#
# There is no dashboard UI for this — signing keys exist only through the API.
# The `pem` Cloudflare returns is ALREADY base64-encoded, which is exactly what
# lib/cloudflare-stream.ts expects, so paste it verbatim. Do not re-encode it.
#
#   ACCOUNT_ID=xxx STREAM_TOKEN=yyy ./backend/scripts/get-stream-key.sh
set -euo pipefail

: "${ACCOUNT_ID:?set ACCOUNT_ID}"
: "${STREAM_TOKEN:?set STREAM_TOKEN}"

resp=$(curl -sS -X POST \
  "https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/stream/keys" \
  -H "Authorization: Bearer ${STREAM_TOKEN}" \
  -H "Content-Type: application/json")

if ! echo "$resp" | grep -q '"success":true'; then
  echo "Cloudflare rejected the request:" >&2
  echo "$resp" >&2
  exit 1
fi

python3 - "$resp" <<'PY'
import json, sys
r = json.loads(sys.argv[1])["result"]
print()
print("Add these to backend/.env — the key is shown once and cannot be re-read:")
print()
print(f'CLOUDFLARE_STREAM_SIGNING_KEY_ID="{r["id"]}"')
print(f'CLOUDFLARE_STREAM_SIGNING_KEY_PEM="{r["pem"]}"')
print()
PY
