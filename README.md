# NextMentor

E-learning platform with a single-level affiliate program. Admins publish video courses, students pay to unlock them, referrers earn commission on the sales they bring in.

Full build plan: `~/.claude/plans/in-this-i-want-clever-dongarra.md`
Design system: `design-system/OVERRIDES.md` (read this first — it supersedes `MASTER.md`)

## Stack

Next.js 16 App Router · TypeScript · Tailwind v4 · Drizzle + Postgres (Neon) · Auth.js v5 · Razorpay · Cloudflare Stream + R2 · Resend

## Structure

One Next.js app, with the source split by responsibility. `src/app/` stays thin — it wires routes to the two sides.

```
src/
├── app/                    # routes only: page.tsx, layout.tsx, route.ts
│   ├── (auth)/             #   login, register, verify, reset
│   └── api/
├── frontend/               # UI. No database, no secrets.
│   ├── components/{ui,marketing,dashboard,admin,player}/
│   ├── lib/                #   cn()
│   └── styles/globals.css  #   design tokens
├── backend/                # data, secrets, business logic
│   ├── db/schema/          #   drizzle tables
│   ├── actions/            #   server actions
│   ├── lib/                #   auth, permissions, razorpay, cloudflare, email, env
│   └── emails/
├── shared/                 # safe on both sides: constants, public env
└── proxy.ts                # edge: referral capture + gated-route redirects
```

**The boundary is enforced by ESLint, not convention.** `src/frontend/**` cannot import `@/backend/*` — that would pull the database client and server secrets into the browser bundle. `src/backend/**` cannot import `@/frontend/*`. `src/shared/**` can import neither. Run `pnpm lint` to check.

Files under `src/app/` are deliberately exempt: a Server Component querying Postgres directly is the entire reason this is one app instead of two servers. Data flows `backend → Server Component → props → frontend component`.

## Getting started

```bash
pnpm install
cp .env.example .env.local     # then fill it in — every key is documented inline
pnpm db:push                   # create the schema
pnpm dev
```

A local Postgres works for development; the database client picks its driver from the connection string, so you do not need a Neon account to run `pnpm dev`.

```bash
createdb nextmentor_dev
# DATABASE_URL="postgresql://$USER@localhost:5432/nextmentor_dev"
```

## Scripts

| Command | What it does |
| --- | --- |
| `pnpm dev` | Dev server on :3000 |
| `pnpm build` | Production build (type errors fail the build) |
| `pnpm typecheck` | `tsc --noEmit` |
| `pnpm lint` | ESLint |
| `pnpm db:push` | Sync schema to the database |
| `pnpm db:studio` | Drizzle Studio |
| `pnpm verify:auth` | Smoke-test auth primitives against the real database |
| `pnpm verify:commerce` | Smoke-test orders, webhook idempotency, refunds |
| `pnpm verify:phase2` | Smoke-test coupon arithmetic, plan grants, renewals |
| `pnpm verify:referral` | Smoke-test commission engine, wallet ledger, payouts |
| `pnpm verify:engagement` | Smoke-test certificates, badges, community, mentorship |
| `pnpm seed:demo` | Create a demo admin, student and published course |

## Status

**All four phases are complete.** The full loop works: an admin creates a course and uploads video, a student finds it in the catalog, pays through Razorpay, and watches it behind a signed playback token.

Built: design tokens, schema + indexes, Auth.js v5 (credentials + Google), email verification, password reset, first-touch referral capture, the `permissions.ts` authorization layer, admin course/module/lesson CRUD, Cloudflare Stream direct-creator-upload, catalog and course detail pages, Razorpay checkout, the fulfilment webhook, the HLS player with progress tracking, and the student dashboard.

Verified against a real database: 16 auth checks (`pnpm verify:auth`) and 17 commerce checks (`pnpm verify:commerce`), including webhook idempotency, underpayment refusal and refund reversal.

**Phase 2** added membership plans with per-tier commission rates, coupon codes with server-side validation, the profile page (avatar upload to R2, password change), and admin depth: plans, coupons, user management, an order ledger and a revenue overview. 24 more checks in `pnpm verify:phase2`.

**Phase 3** added the affiliate system: the commission engine (single-level, rate from the earner's plan), an append-only wallet ledger, KYC with encrypted bank details, manual payouts with a full request → approve → paid lifecycle, a Top Performers board, and a daily cron that matures commissions. 42 checks in `pnpm verify:referral`.

**Phase 4** added engagement: verifiable certificates (PDF rendered with pdf-lib, public `/verify/<serial>` page), achievement badges evaluated nightly, an affiliate lead pipeline, the community hub with moderation, plan-gated mentorship booking, and the promotional-material and training libraries. 37 checks in `pnpm verify:engagement`.

**One sidebar item is still unbuilt: Industrial Earn.** It needs a spec — nothing in the reference dashboard says what it does, and guessing at a feature that sounds like it pays people would be a mistake. Everything else on the sidebar is live.

### Local demo

```bash
pnpm seed:demo   # admin@nextmentor.local / Admin123!
                 # student@nextmentor.local / Student123!
```

Seeded lessons have no video — a real Cloudflare Stream upload is needed before they play.

## Things that will bite you if you change them

- **`src/backend/db/index.ts` must not use `drizzle-orm/neon-http`.** Its `.transaction()` type-checks and then throws `"No transactions support in neon-http driver"` at runtime. The Razorpay webhook writes the order and the enrollment atomically; a partial write there means a customer paid and cannot watch. Use `neon-serverless`. `pnpm verify:auth` asserts this.

- **Authorization lives in `src/backend/lib/permissions.ts`, not `src/proxy.ts`.** The proxy only redirects unauthenticated *page* navigations and never runs for Server Actions. Every Server Action and route handler must open with `requireUser()` / `requireAdmin()` / `requireEnrollment()`. Server Actions are public HTTP endpoints — an unguarded one is a data breach.

- **Enrollment is granted by the Razorpay webhook, never by the browser callback.** The checkout signature that Checkout.js hands back is a UX signal only; it arrives via the user's own browser and can be replayed.

- **All money is integer paise.** Never a float, anywhere.

- **Email verification is a POST, not a GET.** Corporate mail scanners fetch every link in an outgoing email; consuming a single-use token on GET burns it before the recipient clicks.

- **`src/frontend/` must never import `src/backend/`.** ESLint blocks it. If a component needs server data, a Server Component in `src/app/` should fetch it and pass it down as props. If a value is genuinely needed on both sides, it belongs in `src/shared/`.

- **`env("razorpay")` is grouped on purpose.** Secrets are validated per service, not in one schema. A single combined parse meant verifying a Razorpay signature threw because an unrelated Cloudflare key was unset. Add new secrets to the right group in `src/backend/lib/env.ts`.

- **A course with orders cannot be deleted.** `orders.courseId` is `RESTRICT` because a paid order is a financial record. `deleteCourseAction` checks for orders and tells the admin to archive instead — do not "fix" this by relaxing the constraint.

- **`orders` is polymorphic and the database enforces it.** An order buys a course *or* a plan; `orders_item_target_check` rejects any row that sets both or neither. Do not drop that constraint to make an insert pass — fix the insert.

- **Coupons are counted at payment, not at checkout.** `usedCount` and the redemption row are written inside the webhook transaction. Incrementing at order-creation would let anyone burn a limited code by opening the modal and walking away.

- **Discounts are computed only in `validateCoupon`.** Percentages are basis points and all arithmetic stays in integer paise. A discount calculated anywhere else — especially in the browser — is a free-money bug.

- **Early renewal extends from the current expiry, not from today.** Paying before a plan lapses must never cost the member days they already own.

- **`KYC_ENCRYPTION_KEY` in an env var is a development shortcut, not production-ready.** Bank account numbers are AES-256-GCM encrypted, but a key in `process.env` is only as safe as the deploy dashboard and every log line that might print it. Move it to a managed KMS before collecting real bank details — `getKey()` in `src/backend/lib/crypto.ts` is the single place to change.

- **Commission is computed on the amount charged, never on list price.** Paying a percentage of a price nobody paid comes straight out of your margin. `awardCommission` takes `netAmountInPaise` for exactly this reason.

- **`awardCommission` takes a transaction, not the db handle.** That is deliberate: it cannot be called from anywhere that would leave a commission committed while the order rolled back.

- **A `transfer` ledger row is not a credit.** Maturity moves money from pending to available without changing the wallet total. Recording it as a credit double-counts every commission — `reconcileWallet` is the assertion that catches this.

- **A refunded sale can push a wallet negative, on purpose.** If a matured commission was already withdrawn, the clawback is a real debt. Clamping it to zero would silently gift the money away.

- **Payout accounting lives in `services/payouts.ts`, not in the actions.** Logic that only runs behind `requireUser()` is logic that never gets tested, and this is the path that sends money to bank accounts.

- **Certificate serials are random, not sequential.** A sequential serial reveals how many certificates exist and lets anyone enumerate real ones — which is exactly what is needed to forge a credential by screenshotting somebody else's verify page.

- **Only `videoStatus = 'ready'` lessons count toward completion.** Otherwise a course with a processing video could never reach 100%, or an empty draft course would instantly award a certificate to everyone enrolled.

- **A mentorship meeting URL is stripped server-side unless the viewer holds a booking.** Hiding it in the UI would leave it in the page payload.

- **Amber (`--color-accent`) is reserved for money** — earnings, commission, wallet, payouts. Using it as a generic CTA colour destroys the one signal that makes money scannable on a teal page.
