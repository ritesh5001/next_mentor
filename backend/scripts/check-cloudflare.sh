#!/usr/bin/env bash
# Diagnoses Cloudflare credentials in backend/.env without printing secrets.
#
#   ./backend/scripts/check-cloudflare.sh
#
# Tells you which specific permission is missing, rather than the generic
# "Authorization Failure" Cloudflare returns for every kind of scope problem.
set -uo pipefail
cd "$(dirname "$0")/.."

get() { grep "^$1=" .env 2>/dev/null | cut -d'=' -f2- | tr -d '"'"'"; }

ACCOUNT_ID=$(get CLOUDFLARE_ACCOUNT_ID)
TOKEN=$(get CLOUDFLARE_STREAM_TOKEN)

if [ -z "$TOKEN" ]; then
  echo "CLOUDFLARE_STREAM_TOKEN is empty in backend/.env"; exit 1
fi

report() {
  python3 -c '
import json, sys
label = sys.argv[1]
try:
    r = json.loads(sys.argv[2])
except Exception:
    print(f"  {label}: non-JSON response"); sys.exit()
if r.get("success"):
    print(f"  {label}: OK")
else:
    for e in r.get("errors", []):
        print(f"  {label}: FAIL [{e.get(\"code\")}] {e.get(\"message\")}")
' "$1" "$2"
}

echo "Account: ${ACCOUNT_ID:0:8}…"
report "token is valid " "$(curl -sS https://api.cloudflare.com/client/v4/user/tokens/verify -H "Authorization: Bearer $TOKEN")"
report "stream:read    " "$(curl -sS "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/stream?per_page=1" -H "Authorization: Bearer $TOKEN")"
report "stream:keys    " "$(curl -sS "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/stream/keys" -H "Authorization: Bearer $TOKEN")"

echo
echo "If the token is valid but stream calls fail, the token is missing"
echo "Account -> Stream -> Edit, or Account Resources does not include this account."
