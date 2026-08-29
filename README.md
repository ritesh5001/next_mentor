# NextMentor

E-learning platform with a single-level affiliate program. Admins publish video courses, students pay to unlock them, referrers earn commission on the sales they bring in.

Full build plan: `~/.claude/plans/in-this-i-want-clever-dongarra.md`
Design system: `design-system/OVERRIDES.md` (read this first — it supersedes `MASTER.md`)

## Stack

Next.js 16 App Router · TypeScript · Tailwind v4 · Drizzle + Postgres (Neon) · Auth.js v5 · Razorpay · Cloudflare Stream + R2 · Resend

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

## Status

**Phase 1 — foundation: done.** Design tokens, schema + indexes, Auth.js v5 (credentials + Google), email verification, password reset, first-touch referral capture, `permissions.ts` authorization layer, Cloudflare Stream / Razorpay / Resend clients.

**Phase 1 — remaining:** course catalog + detail pages, Razorpay checkout and webhook, video player, student dashboard, admin course CRUD and upload flow, marketing landing page.

Phases 2–4 (plans and coupons, the affiliate system, engagement features) are specified in the plan file.

## Things that will bite you if you change them

- **`src/db/index.ts` must not use `drizzle-orm/neon-http`.** Its `.transaction()` type-checks and then throws `"No transactions support in neon-http driver"` at runtime. The Razorpay webhook writes the order and the enrollment atomically; a partial write there means a customer paid and cannot watch. Use `neon-serverless`. `pnpm verify:auth` asserts this.

- **Authorization lives in `src/lib/permissions.ts`, not `src/proxy.ts`.** The proxy only redirects unauthenticated *page* navigations and never runs for Server Actions. Every Server Action and route handler must open with `requireUser()` / `requireAdmin()` / `requireEnrollment()`. Server Actions are public HTTP endpoints — an unguarded one is a data breach.

- **Enrollment is granted by the Razorpay webhook, never by the browser callback.** The checkout signature that Checkout.js hands back is a UX signal only; it arrives via the user's own browser and can be replayed.

- **All money is integer paise.** Never a float, anywhere.

- **Email verification is a POST, not a GET.** Corporate mail scanners fetch every link in an outgoing email; consuming a single-use token on GET burns it before the recipient clicks.

- **Amber (`--color-accent`) is reserved for money** — earnings, commission, wallet, payouts. Using it as a generic CTA colour destroys the one signal that makes money scannable on a teal page.
