# Deploying NextMentor

Two deployables plus a database:

```
Browser ──▶ Vercel (frontend)  ──HTTPS──▶  Render (backend)  ──▶  Postgres
              Next.js                        Hono API
              no DB access                   owns the data
              holds the session cookie       verifies every JWT
```

`frontend/` never touches Postgres. It calls the API over HTTP and forwards the
user's JWT as a Bearer token. `backend/` owns the schema, the business logic,
Razorpay, Cloudflare, Resend and the cron job.

`shared/` holds the zod schemas and types both sides compile against, so the two
services cannot drift apart silently.

## Deploy order

Backend first — the frontend build needs `API_URL` to point at something real.

---

## 1. Database (Render)

New → PostgreSQL. Copy the **Internal Database URL** for the API (internal
traffic never leaves Render's network) and the **External** one for running
migrations from your machine.

```bash
cd backend
DATABASE_URL="postgresql://…?sslmode=require" pnpm db:push
```

---

## 2. Backend (Render Web Service)

Point it at the repo. Because this is a pnpm workspace, the build must run from
the repo root:

- **Root directory:** *(leave blank — the repo root)*
- **Build command:** `corepack enable && pnpm install --frozen-lockfile`
- **Start command:** `pnpm --filter @nextmentor/backend start`
- **Health check path:** `/health`

The `start` script deliberately does **not** pass `--env-file`. There is no
`.env` file on Render — variables are injected into the process — and Node
exits with status 9 if `--env-file` names a file that does not exist. Only the
local `dev` script reads `.env`.

Environment variables:

```
DATABASE_URL              internal Render Postgres URL
AUTH_SECRET               openssl rand -base64 32
CRON_SECRET               openssl rand -base64 32
KYC_ENCRYPTION_KEY        openssl rand -base64 32
CORS_ORIGINS              https://yourdomain.com
WEB_ORIGIN                https://yourdomain.com
RAZORPAY_KEY_ID / _SECRET / _WEBHOOK_SECRET
CLOUDFLARE_ACCOUNT_ID / _STREAM_TOKEN / _STREAM_SIGNING_KEY_ID / _STREAM_SIGNING_KEY_PEM
CLOUDFLARE_STREAM_WEBHOOK_SECRET
R2_ACCOUNT_ID / R2_ACCESS_KEY_ID / R2_SECRET_ACCESS_KEY / R2_BUCKET / R2_PUBLIC_URL
RESEND_API_KEY / EMAIL_FROM
APP_URL                   https://yourdomain.com   (for links inside emails)
```

**`CORS_ORIGINS` is the allowlist** (the variable is `CORS_ORIGINS`, not
`ALLOWED_ORIGINS`). It must be the frontend's exact origin, scheme included.
Trailing slashes are stripped automatically — a browser sends
`Origin: https://site.com` with no path, so `https://site.com/` would otherwise
match nothing and every call would fail CORS with nothing in the server log.

---

## 3. Frontend (Vercel)

- **Root directory:** `frontend`
- **Build command:** `cd .. && pnpm --filter frontend build`
- **Install command:** `cd .. && pnpm install --frozen-lockfile`

Environment variables:

```
API_URL                   https://your-api.onrender.com   (server-side calls)
NEXT_PUBLIC_API_URL       https://your-api.onrender.com   (browser calls)
NEXT_PUBLIC_APP_URL       https://yourdomain.com
NEXT_PUBLIC_RAZORPAY_KEY_ID
NEXT_PUBLIC_R2_PUBLIC_URL
```

**Set both API URLs to the same address.** They are read in different places —
`API_URL` server-side, `NEXT_PUBLIC_API_URL` in the browser. Setting only the
first is the classic failure: pages render correctly on the server while every
client-side call 404s.

**The frontend does NOT need `AUTH_SECRET`.** It decodes the JWT without
verifying it, purely to decide which nav to render; the API verifies the
signature on every request. Putting the signing secret on Vercel would spread
it for no benefit.

`NEXT_PUBLIC_*` values are baked in at build time — redeploy after changing them.
An empty or malformed URL no longer crashes the build, but it does fall back to
localhost with a warning in the log, so the site will look deployed and fail at
runtime.

---

## 4. Cron (Render Cron Job)

The job lives with the backend now. `frontend/vercel.json` was deleted — it
still pointed a Vercel Cron at `/api/cron/daily` on the FRONTEND, a route that
no longer exists there, so it would have 404'd nightly in silence.

- **Schedule:** `0 2 * * *`
- **Command:**
  ```bash
  curl -fsS -H "Authorization: Bearer $CRON_SECRET" https://your-api.onrender.com/cron/daily
  ```

Without it, commissions never mature out of `pending`, subscriptions never
expire, and badges are never awarded.

---

## 5. Webhooks → the BACKEND, not the frontend

This is the change most likely to be missed after the split.

- **Razorpay** → `https://your-api.onrender.com/webhooks/razorpay`
  Events: `payment.captured`, `payment.failed`, `refund.created`, `refund.processed`
  **This is what grants course access.** Pointed at the old URL, people pay and get nothing.
- **Cloudflare Stream** → `https://your-api.onrender.com/webhooks/cloudflare`

---

## Smoke test

```bash
API=https://your-api.onrender.com
WEB=https://yourdomain.com

curl -s $API/health                                        # {"ok":true,...}
curl -s -o /dev/null -w '%{http_code}\n' $API/api/my/courses            # 401
curl -s -o /dev/null -w '%{http_code}\n' -X POST $API/webhooks/razorpay  # 400
curl -s -o /dev/null -w '%{http_code}\n' $API/cron/daily            # 401

curl -s -o /dev/null -w '%{http_code}\n' $WEB/                          # 200
curl -s -o /dev/null -w '%{http_code}\n' $WEB/dashboard                 # 307
```

A `200` on the webhook or cron endpoint means the secret is missing and the
endpoint is open. Fix that before taking payments.

Then in a browser: register → verify → buy with a Razorpay test card → confirm
the course appears. That exercises both services and the webhook.

---

## Render free tier: cold starts

A free Render web service sleeps after ~15 minutes idle and takes 30–60s to wake.
Every page on the frontend waits on that first API call. Use a paid instance, or
expect the first visit after a quiet spell to hang.

---

## Where each credential comes from

All Cloudflare values live at **dash.cloudflare.com**. Your account ID is in the
dashboard URL: `dash.cloudflare.com/<account-id>/...`

| Variable | Where |
| --- | --- |
| `CLOUDFLARE_ACCOUNT_ID` / `R2_ACCOUNT_ID` | The dashboard URL. Both are the same value. |
| `CLOUDFLARE_STREAM_TOKEN` | Manage account → **Account API tokens** → Create → **Start from scratch** → Account / Stream / **Edit** |
| `CLOUDFLARE_STREAM_SIGNING_KEY_ID` + `_PEM` | **API only, no dashboard page.** Run `backend/scripts/get-stream-key.sh` |
| `CLOUDFLARE_STREAM_WEBHOOK_SECRET` | **Stream** → Settings → Webhooks → add the URL, copy the secret it returns |
| `R2_ACCESS_KEY_ID` + `R2_SECRET_ACCESS_KEY` | **R2** → API → **Manage API Tokens** → Object Read & Write |
| `R2_BUCKET` | The bucket name you created |
| `R2_PUBLIC_URL` | R2 → your bucket → Settings → **Custom Domains** (or the r2.dev subdomain for testing) |
| `RESEND_API_KEY` | resend.com → API Keys. The sending domain must be **verified** or mail silently fails. |
| `DATABASE_URL` | Render → your Postgres → Internal URL for the API, External for migrations |

### Traps

- **Do not use the "Write all resources" template** for the Stream token. It is
  166 permissions including DNS — a leak hands over the whole account. Stream /
  Edit is everything the app uses.
- **R2 tokens are not made on the Account API tokens page.** R2 has its own
  token UI, and it issues S3-style credentials (access key + secret). An
  Account API token will not authenticate against R2.
- **The Stream signing key exists only through the API.** There is no UI for it.
  Cloudflare returns base64 of a **PKCS#1** key (`BEGIN RSA PRIVATE KEY`), not
  PKCS#8 — WebCrypto cannot import PKCS#1 at all, which is why the signer uses
  `node:crypto.createPrivateKey`. Paste the `pem` field verbatim; a raw PEM
  block also works. Run `pnpm verify:stream` to confirm it can actually sign.
- **OAuth clients is unrelated.** That page is for letting people sign in to
  Cloudflare itself. It has nothing to do with this app.
- Every one of these secrets is shown **once**. Store them before closing the tab.

---

## Not done yet

- **LCP / CLS have never been measured.** The plan set LCP < 2.0s and CLS < 0.1 on
  4G. Run Lighthouse against the deployed URL — local numbers (174 KB gzipped,
  ~4ms TTFB) are payload and server timing, not the same thing.
- **`KYC_ENCRYPTION_KEY` still needs a KMS** before real bank details are collected.
- **Affiliate T&Cs need a professional review** before you take real money.
