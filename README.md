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
| `pnpm seed:demo` | Create a demo admin, student and published course |

## Status

**Phase 1 is complete.** The full loop works: an admin creates a course and uploads video, a student finds it in the catalog, pays through Razorpay, and watches it behind a signed playback token.

Built: design tokens, schema + indexes, Auth.js v5 (credentials + Google), email verification, password reset, first-touch referral capture, the `permissions.ts` authorization layer, admin course/module/lesson CRUD, Cloudflare Stream direct-creator-upload, catalog and course detail pages, Razorpay checkout, the fulfilment webhook, the HLS player with progress tracking, and the student dashboard.

Verified against a real database: 16 auth checks (`pnpm verify:auth`) and 17 commerce checks (`pnpm verify:commerce`), including webhook idempotency, underpayment refusal and refund reversal.

**Not yet wired:** R2 thumbnail upload (courses render a placeholder), and the 16 sidebar items marked "Soon".

Phases 2–4 (plans and coupons, the affiliate system, engagement features) are specified in the plan file.

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

- **Amber (`--color-accent`) is reserved for money** — earnings, commission, wallet, payouts. Using it as a generic CTA colour destroys the one signal that makes money scannable on a teal page.
