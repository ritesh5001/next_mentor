import Link from "next/link";
import {
  ArrowUpRight,
  BadgeCheck,
  FileCheck2,
  PlayCircle,
  ShieldCheck,
  Wallet,
} from "lucide-react";

import { CtaButton } from "./cta-button";
import { formatPrice } from "@/lib/format";
import { cn } from "@/lib/cn";

/**
 * Homepage sections.
 *
 * Rebuilt around one problem: every section used to be the same shape, a
 * centred heading with a gradient last word over a grid of equal cards. Eight
 * repetitions of one device stops reading as a brand and starts reading as a
 * template. The rhythm now alternates deliberately: left-aligned editorial
 * headers, one full-bleed dark band, one asymmetric split, and cards only
 * where a set of peers genuinely needs comparing.
 *
 * Colours are unchanged. Amber still means money and nothing else.
 */

/* ------------------------------------------------------------ section head */

/**
 * Left-aligned by default, which is the change. A centred header pulls the eye
 * to the middle of an empty line and makes every section feel like the last
 * one; ranging left gives the page a spine to read down.
 */
export function SectionHead({
  eyebrow,
  title,
  lede,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  lede?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <header
      className={cn(
        "flex max-w-2xl flex-col gap-3",
        align === "center" && "mx-auto items-center text-center",
        className,
      )}
    >
      {eyebrow && (
        <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--brand-blue)]">
          {eyebrow}
        </span>
      )}
      <h2 className="text-[26px] font-extrabold leading-[1.15] tracking-tight text-[var(--brand-ink)] sm:text-[36px]">
        {title}
      </h2>
      {lede && (
        <p className="text-[15px] leading-relaxed text-[var(--color-muted-foreground)] sm:text-base">
          {lede}
        </p>
      )}
    </header>
  );
}

/* -------------------------------------------------------------------- hero */

export function Hero({ courseCount }: { courseCount: number }) {
  return (
    <section className="relative overflow-hidden" style={{ background: "var(--brand-hero-wash)" }}>
      {/* One soft light source, off-canvas. Replaces the ring of floating
          icons that used to sit here: four generic glyphs orbiting a fifth is
          the stock illustration every AI-built landing page ships with. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 -top-32 size-[34rem] rounded-full opacity-[0.13] blur-3xl"
        style={{ background: "var(--brand-gradient)" }}
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="flex flex-col items-start gap-6">
          <span className="pill inline-flex items-center gap-2 border border-[var(--color-border)] bg-[var(--color-card)] px-3.5 py-1.5 text-xs font-semibold text-[var(--color-muted-foreground)]">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full rounded-full bg-[var(--brand-green)] opacity-70" />
              <span className="relative inline-flex size-2 rounded-full bg-[var(--brand-green-deep)]" />
            </span>
            {courseCount > 0
              ? `${courseCount} course${courseCount === 1 ? "" : "s"} open for enrolment`
              : "New courses opening soon"}
          </span>

          <h1 className="text-[38px] font-extrabold leading-[1.08] tracking-[-0.02em] text-[var(--brand-ink)] sm:text-[54px] lg:text-[60px]">
            Learn the skill.
            <br />
            Then <span className="brand-gradient-text">get paid for it.</span>
          </h1>

          <p className="max-w-lg text-base leading-relaxed text-[var(--color-muted-foreground)] sm:text-[17px]">
            Short, project-led courses in marketing, AI and design. You finish
            with something you built, a certificate anyone can check, and a
            referral link that pays you for everyone you bring in.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-1">
            <CtaButton href="/register" size="lg">
              Start learning
            </CtaButton>
            <CtaButton href="/courses" variant="outline" size="lg">
              See the courses
            </CtaButton>
          </div>

          <p className="flex items-center gap-2 pt-1 text-[13px] text-[var(--color-muted-foreground)]">
            <ShieldCheck className="size-4 text-[var(--brand-green-deep)]" strokeWidth={1.5} aria-hidden="true" />
            Buy once, keep access. No subscription.
          </p>
        </div>

        {/* The product's actual promise, drawn instead of described: you
            finish a course, and money arrives. Real UI beats an icon cloud. */}
        <div aria-hidden="true" className="relative hidden lg:block">
          <div className="relative ml-auto w-full max-w-sm">
            <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-5 shadow-[var(--shadow-raised)]">
              <div className="flex items-center gap-3">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[var(--color-primary-subtle)]">
                  <PlayCircle className="size-5 text-[var(--brand-blue)]" strokeWidth={1.6} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-bold text-[var(--brand-ink)]">
                    Meta Ads, start to finish
                  </p>
                  <p className="text-xs text-[var(--color-muted-foreground)]">Module 4 of 6</p>
                </div>
              </div>
              <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-[var(--color-muted)]">
                <div className="h-full w-[68%] rounded-full" style={{ background: "var(--brand-gradient)" }} />
              </div>
              <p className="mt-2 text-xs font-medium text-[var(--color-muted-foreground)]">68% complete</p>
            </div>

            <div className="mt-3 flex items-center gap-3 rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-4 shadow-[var(--shadow-card)]">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[var(--color-accent-subtle)]">
                <Wallet className="size-5 text-[var(--color-accent)]" strokeWidth={1.6} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs text-[var(--color-muted-foreground)]">Referral payout cleared</p>
                <p className="tabular text-lg font-extrabold text-[var(--color-accent)]">
                  {formatPrice(240000)}
                </p>
              </div>
              <BadgeCheck className="size-5 shrink-0 text-[var(--brand-green-deep)]" strokeWidth={1.6} />
            </div>

            <div className="mt-3 ml-8 flex items-center gap-3 rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-4 shadow-[var(--shadow-card)]">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[var(--color-primary-subtle)]">
                <FileCheck2 className="size-5 text-[var(--brand-blue)]" strokeWidth={1.6} />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-bold text-[var(--brand-ink)]">Certificate issued</p>
                <p className="text-xs text-[var(--color-muted-foreground)]">Verifiable by anyone</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------- how it works */

const STEPS = [
  {
    n: "01",
    title: "Pick a course and finish it",
    body: "Six or so modules, each ending in something you have actually built. Watch on any device, at whatever pace fits around your job.",
  },
  {
    n: "02",
    title: "Get the certificate",
    body: "Finish every lesson and the certificate issues itself. It carries a serial number, and anyone can check it on our site without asking you for proof.",
  },
  {
    n: "03",
    title: "Share your link and earn",
    body: "Every account gets a referral link. When someone buys through it you earn commission on what they actually paid. It clears after a week and goes to your bank.",
  },
];

/**
 * The signature element of the page: oversized tabular numerals with a
 * gradient hairline running under them. Used here and nowhere else, so it
 * reads as a mark rather than as a pattern applied everywhere.
 */
export function HowItWorks() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
      <SectionHead
        eyebrow="How it works"
        title="Three steps, and the third one pays."
        lede="Most course platforms stop at the certificate. The referral program is the part that keeps going after you have finished studying."
      />

      <ol className="mt-12 grid gap-10 sm:mt-14 lg:grid-cols-3 lg:gap-8">
        {STEPS.map((step) => (
          <li key={step.n} className="flex flex-col gap-3">
            <span className="tabular text-[44px] font-extrabold leading-none tracking-tight text-[var(--brand-ink)]/12">
              {step.n}
            </span>
            <span
              aria-hidden="true"
              className="h-px w-14 rounded-full"
              style={{ background: "var(--brand-gradient)" }}
            />
            <h3 className="pt-1 text-lg font-bold text-[var(--brand-ink)]">{step.title}</h3>
            <p className="text-[15px] leading-relaxed text-[var(--color-muted-foreground)]">
              {step.body}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}

/* ------------------------------------------------------------- what you get */

const INCLUDED = [
  {
    Icon: PlayCircle,
    title: "Project-led lessons",
    body: "Every module ends in something you have made, not something you have only watched.",
  },
  {
    Icon: FileCheck2,
    title: "A certificate that checks out",
    body: "Serial-numbered and verifiable on a public page. No PDF anyone could have edited.",
  },
  {
    Icon: BadgeCheck,
    title: "Lifetime access",
    body: "Buy the course once. It stays in your account, including anything added to it later.",
  },
  {
    Icon: Wallet,
    title: "A referral link that pays",
    body: "Commission on everyone who buys through you, tracked openly and paid to your bank.",
  },
];

export function WhatYouGet() {
  return (
    <section className="border-y border-[var(--color-border)] bg-[var(--color-muted)]/40">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <SectionHead
          eyebrow="What is included"
          title="Everything comes with the course."
          lede="One price. Nothing behind a second paywall once you have bought."
          className="lg:sticky lg:top-24 lg:self-start"
        />

        <ul className="grid gap-x-8 gap-y-8 sm:grid-cols-2">
          {INCLUDED.map(({ Icon, title, body }) => (
            <li key={title} className="flex flex-col gap-2.5">
              <Icon className="size-6 text-[var(--brand-blue)]" strokeWidth={1.5} aria-hidden="true" />
              <h3 className="text-[15px] font-bold text-[var(--brand-ink)]">{title}</h3>
              <p className="text-sm leading-relaxed text-[var(--color-muted-foreground)]">{body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------- earn band */

/**
 * The one dark band on the page. It exists to break the rhythm: nine light
 * sections in a row read as one long scroll, and the referral program is the
 * thing worth stopping on.
 */
export function EarnBand() {
  return (
    <section className="relative overflow-hidden bg-[var(--brand-surface-dark)]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 -bottom-24 size-96 rounded-full opacity-25 blur-3xl"
        style={{ background: "var(--brand-gradient)" }}
      />

      <div className="relative mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-2 lg:items-center">
        <div className="flex flex-col gap-4">
          <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--brand-green)]">
            Partner program
          </span>
          <h2 className="text-[26px] font-extrabold leading-[1.15] tracking-tight text-white sm:text-[36px]">
            Study once. Keep earning after.
          </h2>
          <p className="max-w-md text-[15px] leading-relaxed text-white/70">
            Share your link, and you earn a share of what your referrals pay.
            Commission is calculated on the amount actually charged, not the
            list price, so a discount never quietly comes out of your cut.
          </p>
          <div className="pt-2">
            <CtaButton href="/register">Get your referral link</CtaButton>
          </div>
        </div>

        <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10">
          {[
            { k: "Paid on", v: "What they paid" },
            { k: "Clears in", v: "7 days" },
            { k: "Paid to", v: "Your bank" },
            { k: "Tracking", v: "Open ledger" },
          ].map(({ k, v }) => (
            <div key={k} className="flex flex-col gap-1 bg-[var(--brand-surface-dark)] p-5">
              <dt className="text-xs text-white/50">{k}</dt>
              <dd className="text-base font-bold text-white">{v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------- people */

const INSTRUCTORS = [
  { name: "Aishwarya Sharma", role: "Meta Ads" },
  { name: "Ayush Sharma", role: "Video Editing" },
  { name: "Sahil Verma", role: "SEO & Google Ads" },
  { name: "Kishan Chaudhari", role: "Funnel Building" },
  { name: "Deepak Dubey", role: "Landing Pages" },
  { name: "Neha Kamble", role: "UI/UX Design" },
  { name: "Mohd Shahid", role: "AI & Automation" },
  { name: "Luv Dixit", role: "Web Development" },
];

function initials(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("");
}

export function People() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
      <SectionHead
        eyebrow="Who teaches"
        title="People who do this work for a living."
        lede="Each track is taught by someone running it professionally, not by a generalist reading from a script."
      />

      <ul className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {INSTRUCTORS.map(({ name, role }) => (
          <li
            key={name}
            className="flex items-center gap-3 rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-3.5 transition-transform duration-200 ease-out hover:-translate-y-0.5 hover:shadow-[var(--shadow-card)]"
          >
            <span
              aria-hidden="true"
              className="flex size-10 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
              style={{ background: "var(--brand-gradient)" }}
            >
              {initials(name)}
            </span>
            <span className="flex min-w-0 flex-col">
              <span className="truncate text-[13px] font-bold text-[var(--brand-ink)]">{name}</span>
              <span className="truncate text-xs text-[var(--color-muted-foreground)]">{role}</span>
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}

/* ------------------------------------------------------------- closing cta */

export function ClosingCta() {
  return (
    <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6 sm:pb-28">
      <div
        className="relative overflow-hidden rounded-3xl px-6 py-14 text-center sm:px-12 sm:py-20"
        style={{ background: "var(--brand-hero-wash)" }}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-0 size-80 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20 blur-3xl"
          style={{ background: "var(--brand-gradient)" }}
        />
        <div className="relative flex flex-col items-center gap-5">
          <h2 className="max-w-xl text-[26px] font-extrabold leading-[1.15] tracking-tight text-[var(--brand-ink)] sm:text-[36px]">
            Pick one course and start this week.
          </h2>
          <p className="max-w-md text-[15px] leading-relaxed text-[var(--color-muted-foreground)]">
            Creating an account is free. You only pay when you decide which
            course you want.
          </p>
          <div className="flex flex-wrap justify-center gap-3 pt-1">
            <CtaButton href="/register" size="lg">
              Create your account
            </CtaButton>
            <Link
              href="/pricing"
              className="pill inline-flex min-h-14 items-center gap-1.5 px-6 text-base font-medium text-[var(--color-muted-foreground)] transition-colors hover:text-[var(--brand-blue)]"
            >
              Compare plans
              <ArrowUpRight className="size-4" strokeWidth={2} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
