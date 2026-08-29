# Deploying NextMentor

## Read this first: there is no separate backend to deploy

`src/frontend/` and `src/backend/` are **folders inside one Next.js app**, not two
services. You chose that split deliberately during planning (one app, clear
internal boundary) over a standalone API server.

`src/backend/` contains 9 Server Action files and the code behind 5 route
handlers. There is no `listen()`, no Express, no Hono — nothing that starts a
server. It runs *inside* Next.js, in the same process that renders the pages.

```
Browser → Next.js (one deploy)
            ├── src/app/**        routes
            ├── src/frontend/**   UI, runs in the browser + on the server
            └── src/backend/**    Server Actions, DB, Razorpay, Cloudflare
                                     ↓
                              Postgres (the only separate service)
```

So "frontend on Vercel, backend on Render" cannot be done as stated. Splitting
it would mean rewriting all 9 Server Action files as REST endpoints, moving auth
to bearer tokens, and adding a network hop to every page render — undoing the
architecture decision and making the site slower.

**What you can do instead** is put the app on one host and the database on the
other. That is the closest real version of what you asked for, and option B
below is exactly it.

---

## Pick one

| | App | Database | Cron | Verdict |
| --- | --- | --- | --- | --- |
| **A** | Vercel | Neon | Vercel Cron (already configured) | **Recommended.** Fastest, zero cron setup, pooling built in. |
| **B** | Vercel | Render Postgres | Vercel Cron | Works. This is "Vercel + Render". Watch the connection cap. |
| **C** | Render | Render Postgres | Render Cron Job | Fine. One vendor, one bill, no cold starts. Slower globally. |

The code supports all three with no changes: `src/backend/db/index.ts` picks the
Neon driver for a `*.neon.tech` URL and node-postgres for anything else, and
sizes the connection pool based on whether it detects a serverless host.

---

## Before any deploy

You need real credentials. The app builds and runs without them, but checkout,
video, email and uploads will fail with clear errors until they are set.

- **Razorpay** — live or test `KEY_ID`, `KEY_SECRET`, and a `WEBHOOK_SECRET` you choose
- **Cloudflare** — account ID, a Stream API token, a Stream signing key, an R2 bucket + keys
- **Resend** — API key, and a **verified sending domain** (unverified = silent failure)
- **`AUTH_SECRET`** — `openssl rand -base64 32`
- **`CRON_SECRET`** — `openssl rand -base64 32`
- **`KYC_ENCRYPTION_KEY`** — `openssl rand -base64 32`

> **`KYC_ENCRYPTION_KEY` in an env var is not production-grade.** It decrypts
> bank account numbers. Before you collect real bank details, move it to a
> managed KMS — `getKey()` in `src/backend/lib/crypto.ts` is the only place to
> change. An env var is only as protected as your deploy dashboard and every log
> line that might print `process.env`.

---

## Option A — Vercel + Neon (recommended)

**1. Database**

Create a project at neon.tech. Copy the **pooled** connection string (it contains
`-pooler`). That becomes `DATABASE_URL`.

**2. Push the schema**

From your machine, pointing at the production database:

```bash
DATABASE_URL="postgresql://…neon.tech/neondb?sslmode=require" pnpm db:push
```

**3. Deploy**

```bash
npm i -g vercel
vercel            # first run links the project
vercel --prod
```

Or connect the GitHub repo in the Vercel dashboard — it detects Next.js and needs
no build configuration.

**4. Environment variables**

Add every key from `.env.example` under Settings → Environment Variables, for
the **Production** environment. Two must be your real domain:

```
AUTH_URL=https://yourdomain.com
NEXT_PUBLIC_APP_URL=https://yourdomain.com
```

Redeploy after adding them — `NEXT_PUBLIC_*` values are baked in at build time,
so they do not pick up until the next build.

**5. Cron**

Already configured in `vercel.json` (`/api/cron/daily` at 02:00). Vercel sends
`Authorization: Bearer $CRON_SECRET` automatically once `CRON_SECRET` is set.
The endpoint fails closed without it.

---

## Option B — Vercel (app) + Render (Postgres)

This is the closest real version of "Vercel + Render".

**1. Database on Render**

New → PostgreSQL. Once it is up, copy the **External Database URL** and append
`?sslmode=require`:

```
postgresql://user:pass@dpg-xxxx.oregon-postgres.render.com/dbname?sslmode=require
```

**2. Push the schema**, then deploy to Vercel exactly as in Option A.

**3. The connection cap — the one thing that will bite you**

Render Postgres allows roughly 97 connections. Each concurrent Vercel function
instance opens its own pool. `src/backend/db/index.ts` already detects Vercel and
drops the pool to **1 connection per instance** with a 10s idle timeout, which is
what makes this combination viable at all.

Do not raise that number. If you outgrow ~90 concurrent instances you need a
pooler (PgBouncer) in front, or Neon, which pools for you.

**4. Latency**

Put the Render database in the region closest to your Vercel functions
(Vercel default is `iad1` → use Render's Ohio/Virginia). A database on the far
side of the planet from your functions adds a round-trip to every query.

---

## Option C — everything on Render

**1.** New → PostgreSQL. Copy the **Internal Database URL** — internal traffic
does not leave Render's network and does not count against external limits.

**2.** New → Web Service, pointed at your repo:

- **Build command:** `pnpm install && pnpm build`
- **Start command:** `pnpm start`
- **Health check path:** `/`

**3.** Add all environment variables. `AUTH_URL` and `NEXT_PUBLIC_APP_URL` must be
your Render URL (or custom domain).

**4. Cron.** `vercel.json` does nothing here. Create a **Cron Job** service:

- **Schedule:** `0 2 * * *`
- **Command:**
  ```bash
  curl -fsS -H "Authorization: Bearer $CRON_SECRET" https://yourdomain.com/api/cron/daily
  ```

Without this, commissions never mature out of `pending`, subscriptions never
expire, and badges are never awarded.

---

## After deploying, on every option

**1. Point the webhooks at the live domain.** Nothing works end to end until you do.

- **Razorpay** → Settings → Webhooks → `https://yourdomain.com/api/webhooks/razorpay`
  - Secret: your `RAZORPAY_WEBHOOK_SECRET`
  - Events: `payment.captured`, `payment.failed`, `refund.created`, `refund.processed`
  - **This webhook is what grants course access.** Until it points at production,
    people can pay and get nothing.
- **Cloudflare Stream** → Settings → Webhook → `https://yourdomain.com/api/webhooks/cloudflare`
  - Set `CLOUDFLARE_STREAM_WEBHOOK_SECRET` to the signing secret it gives you.
  - Until this is set the endpoint returns 503 by design, and uploaded videos
    never flip to `ready`.

**2. Google OAuth** (if used) → add `https://yourdomain.com/api/auth/callback/google`
to the authorised redirect URIs.

**3. R2 public access.** Point a custom domain at the bucket, set `R2_PUBLIC_URL`
and `NEXT_PUBLIC_R2_PUBLIC_URL` to it, and add that hostname to `remotePatterns`
in `next.config.ts` — `next/image` refuses to optimise an unlisted host.

**4. Create your admin.** `pnpm seed:demo` also creates demo accounts, so for
production promote your own account instead:

```sql
UPDATE users SET role = 'admin' WHERE email = 'you@yourdomain.com';
```

---

## Smoke test the live site

```bash
curl -o /dev/null -w "%{http_code}\n" https://yourdomain.com/            # 200
curl -o /dev/null -w "%{http_code}\n" https://yourdomain.com/dashboard   # 307 → /login
curl -o /dev/null -w "%{http_code}\n" \
  -X POST https://yourdomain.com/api/webhooks/razorpay                   # 400 (bad signature)
curl -o /dev/null -w "%{http_code}\n" https://yourdomain.com/api/cron/daily  # 401
```

A `200` on the webhook or cron endpoint means the secret is missing and the
endpoint is open. Fix that before taking payments.

Then, in a browser: register → verify the email → buy with a Razorpay test card →
confirm the course appears in the dashboard. That exercises the whole chain
including the webhook.

---

## Not done yet

- **LCP / CLS have never been measured.** The plan set LCP < 2.0s and CLS < 0.1 on
  4G. Run Lighthouse against the deployed URL — local numbers (174 KB gzipped,
  ~4ms TTFB) are payload and server timing, not the same thing.
- **`KYC_ENCRYPTION_KEY` still needs a KMS** before real bank details are collected.
- **Affiliate T&Cs need a professional review** before you take real money.
