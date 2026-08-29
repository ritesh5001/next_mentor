# LOCKED OVERRIDES — read this before MASTER.md

`MASTER.md` is regenerated output from `/ui-ux-pro-max`. Where the two disagree, **this file wins**.
These decisions were made deliberately during planning and must not be "corrected" back toward the generator's defaults.

## Typeface — Plus Jakarta Sans (single family)

MASTER.md may name a different pairing (its font pick varies per run, and it has suggested Fira Code/Fira Sans and Comic Neue on different runs). Ignore that. We use **one** family:

- Loaded via `next/font/google` in `src/app/layout.tsx` — self-hosted, `display: 'swap'`, no render-blocking network request.
- Weights **400, 500, 600, 700, 800** only. Do not add more; each one costs bytes.
- No `@import url(...)` of Google Fonts in CSS, ever. That is render-blocking and defeats `next/font`.
- Every currency, earnings, commission, and countdown figure gets `font-variant-numeric: tabular-nums` so digits do not jitter as values update.

## Palette — teal brand, amber reserved for money

MASTER.md's background (`#F0FDFA`) and foreground (`#134E4A`) are too green-cast for a data-dense dashboard read all day. We use slate neutrals with the teal as the accent-bearing brand colour.

**Amber (`--color-accent`) is reserved exclusively for money** — earnings, commission, wallet balance, payout state. It never appears as a generic CTA colour. This is what makes money instantly scannable on a page full of teal.

| Token | Light | Dark |
| --- | --- | --- |
| `--color-primary` | `#0D9488` | `#2DD4BF` |
| `--color-on-primary` | `#FFFFFF` | `#042F2E` |
| `--color-accent` (money only) | `#D97706` | `#F59E0B` |
| `--color-background` | `#F8FAFC` | `#0F172A` |
| `--color-card` | `#FFFFFF` | `#1E293B` |
| `--color-foreground` | `#0F172A` | `#F8FAFC` |
| `--color-muted` | `#F1F5F9` | `#334155` |
| `--color-muted-foreground` | `#64748B` | `#94A3B8` |
| `--color-border` | `#E2E8F0` | `#334155` |
| `--color-success` | `#059669` | `#34D399` |
| `--color-destructive` | `#DC2626` | `#F87171` |
| `--color-ring` | `#0D9488` | `#2DD4BF` |

Light and dark are **both defined explicitly**. Never infer one by inverting the other, and check contrast in each mode independently.

## Style — restrained depth, not full glassmorphism

MASTER.md recommends Glassmorphism. **Partially rejected.** Large `backdrop-filter: blur()` surfaces force expensive repaints on every scroll frame and conflict directly with the project's speed budget. The generator's own `blur-purpose` rule says blur should signal background dismissal, not decorate.

- `backdrop-blur` is permitted **only** on: modals, sheets/drawers, and the sticky top nav.
- Everything else — cards, panels, tables, list rows — is a flat surface: `--color-card`, `1px solid --color-border`, one single-layer shadow. No stacked shadows.

MASTER.md's "AVOID: flat design without depth" does not apply here; depth comes from the border + single shadow, not from blur.

## Spacing

MASTER.md's density-8 scale (2/4/8/12/16/24/32px) applies to **dashboard and admin** surfaces. **Marketing pages override it** to 24/48/96px vertical rhythm — a landing page at dashboard density looks cramped.

## Motion — 4/10

- 150–300ms. `transform` and `opacity` only — never `width`, `height`, `top`, or `left`.
- Card grids stagger in at 40ms per item.
- MASTER.md suggests GSAP `back.out(1.4)`. Use it on marketing card grids only. **Never on dashboard tables or earnings figures** — overshoot on informational UI reads as sloppy, per the generator's own note.
- Everything sits behind `@media (prefers-reduced-motion: reduce)`.

## Non-negotiables (apply to every component, no exceptions)

- Contrast ≥4.5:1 for body text, verified in **both** themes independently.
- Visible focus rings on every interactive element. Never `outline: none` without a replacement.
- Touch targets ≥44px.
- Lucide SVG icons only. **Never emoji as an icon.** Consistent 1.5px stroke.
- Labels always visible. Never placeholder-only.
- Form errors and toasts announced via `aria-live`; errors sit below their field, not in a summary at the top.
- Every image declares `width`/`height` (or `aspect-ratio`) so CLS stays near zero.
