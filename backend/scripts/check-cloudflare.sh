#!/usr/bin/env bash
# Diagnoses Cloudflare credentials in backend/.env without printing secrets.
#
#   ./backend/scripts/check-cloudflare.sh              # tests what is in .env
#   ./backend/scripts/check-cloudflare.sh <new-token>  # tests a token first
#
# Cloudflare returns the same generic "Authorization Failure" for every kind of
# scope problem, so this separates "token is fake" from "token is real but has
# no Stream permission" — which need completely different fixes.
set -uo pipefail
cd "$(dirname "$0")/.."

get() { grep "^$1=" .env 2>/dev/null | cut -d'=' -f2- | tr -d '"' | tr -d "'"; }

ACCOUNT_ID=$(get CLOUDFLARE_ACCOUNT_ID)
# Accept a candidate token as $1 so a new one can be tested BEFORE it is saved
# into .env — no point committing a token that turns out to lack permissions.
TOKEN="${1:-$(get CLOUDFLARE_STREAM_TOKEN)}"

if [ -z "$TOKEN" ]; then echo "CLOUDFLARE_STREAM_TOKEN is empty in backend/.env"; exit 1; fi
if [ -z "$ACCOUNT_ID" ]; then echo "CLOUDFLARE_ACCOUNT_ID is empty in backend/.env"; exit 1; fi

R="scripts/cf-report.py"
API=https://api.cloudflare.com/client/v4

echo "Account: ${ACCOUNT_ID:0:8}…  Token: ${TOKEN:0:5}…(${#TOKEN} chars)"
python3 "$R" "token valid" "$(curl -sS $API/user/tokens/verify -H "Authorization: Bearer $TOKEN")"
python3 "$R" "stream read" "$(curl -sS "$API/accounts/$ACCOUNT_ID/stream?per_page=1" -H "Authorization: Bearer $TOKEN")"
python3 "$R" "stream keys" "$(curl -sS "$API/accounts/$ACCOUNT_ID/stream/keys" -H "Authorization: Bearer $TOKEN")"

echo
echo "token valid OK + stream FAIL  -> token lacks Account > Stream > Edit,"
echo "                                 or Account Resources excludes this account."
echo "token valid FAIL              -> wrong/expired token string."
