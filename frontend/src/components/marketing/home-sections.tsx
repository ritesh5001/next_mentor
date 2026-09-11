import Link from "next/link";
import Image from "next/image";
import {
  ArrowUpRight,
  BadgeCheck,
  FileCheck2,
  PlayCircle,
  Lightbulb,
  ShieldCheck,
  Target,
  Users,
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
      <h2 className="text-[26px] font-bold leading-[1.15] tracking-tight text-[var(--brand-ink)] sm:text-[36px]">
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

/**
 * Hero.
 *
 * One column, centred, nothing else. The blurred blob, the dash and dot-grid
 * marks, the two stock portraits and the "Hello" bubble were all decoration
 * that made the fold busier without making the offer clearer — and stock faces
 * of people unconnected to the business is the fastest way to look less
 * credible, not more.
 */
export function Hero({ courseCount }: { courseCount: number }) {
  return (
    <section style={{ background: "var(--brand-hero-wash)" }}>
      <div className="mx-auto max-w-6xl px-4 pb-12 pt-16 sm:px-6 sm:pb-16 sm:pt-24">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-6 text-center">
          <span className="pill inline-flex items-center gap-2 border border-[var(--color-border)] bg-[var(--color-card)] px-3.5 py-1.5 text-xs font-medium text-[var(--color-muted-foreground)]">
            <span className="size-1.5 rounded-full bg-[var(--brand-green-deep)]" aria-hidden="true" />
            {courseCount > 0
              ? `${courseCount} course${courseCount === 1 ? "" : "s"} open for enrolment`
              : "New courses opening soon"}
          </span>

          <h1 className="text-[32px] font-bold leading-[1.12] tracking-[-0.02em] text-[var(--brand-ink)] sm:text-[46px] lg:text-[54px]">
            Learn the skill.{" "}
            <span className="brand-accent-text">Freelance with confidence.</span>
          </h1>

          <p className="max-w-xl text-base leading-relaxed text-[var(--color-muted-foreground)] sm:text-[17px]">
            Practical, project-based courses that help you build in-demand
            skills, create real work, and start your freelancing journey.
          </p>

          <div className="flex w-full flex-col gap-3 pt-2 sm:w-auto sm:flex-row sm:items-center">
            <CtaButton href="/courses" size="lg" className="justify-center">
              Explore courses
            </CtaButton>
            <CtaButton
              href="/register"
              variant="outline"
              size="lg"
              className="justify-center"
            >
              Create an account
            </CtaButton>
          </div>
        </div>
      </div>

      {/* Four claims, each one we can actually stand behind. A plain bordered
          strip rather than a floating dark card: less weight, same content. */}
      <div className="mx-auto max-w-6xl px-4 pb-14 sm:px-6">
        <ul className="grid overflow-hidden rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-card)] sm:grid-cols-2 lg:grid-cols-4">
          {PROMISES.map(({ Icon, lines }) => (
            <li
              key={lines[0]}
              className="flex items-center gap-3 border-b border-[var(--color-border)] px-5 py-4 last:border-b-0 sm:border-r sm:[&:nth-child(2n)]:border-r-0 sm:[&:nth-last-child(-n+2)]:border-b-0 lg:border-b-0 lg:[&:nth-child(2n)]:border-r lg:last:border-r-0"
            >
              <Icon
                className="size-5 shrink-0 text-[var(--brand-blue)]"
                strokeWidth={1.5}
                aria-hidden="true"
              />
              <span className="text-[13px] font-medium leading-snug text-[var(--color-foreground)]">
                {lines[0]} {lines[1]}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

const PROMISES: Array<{ Icon: typeof ShieldCheck; lines: [string, string] }> = [
  { Icon: Users, lines: ["Taught by someone", "who does the work"] },
  { Icon: FileCheck2, lines: ["Certificates anyone", "can verify"] },
  { Icon: ShieldCheck, lines: ["One price,", "no second paywall"] },
  { Icon: Wallet, lines: ["Commission paid", "to your bank"] },
];

/* ------------------------------------------------------------------ about */

/**
 * The About band.
 *
 * Copy left, a photo collage right with two figures floating over it on
 * connector lines, following the reference's composition. The stacked-card
 * arrangement collapses to a simple two-up on small screens, where overlapping
 * images and absolutely positioned callouts stop being legible.
 */
export function About() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="flex flex-col gap-5">
          <SectionHead
            eyebrow="About us"
            title={
              <>
                Built by someone who <span className="brand-accent-text">does this work.</span>
              </>
            }
            lede="NextMentor exists because most online courses teach theory and leave you exactly where you started. Every track here ends in something you have built and can show someone."
          />

          <div className="mt-2 grid gap-6 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <h3 className="flex items-center gap-2 text-[15px] font-bold text-[var(--brand-ink)]">
                <Target className="size-4 text-[var(--brand-blue)]" strokeWidth={1.8} aria-hidden="true" />
                Our mission
              </h3>
              <p className="text-sm leading-relaxed text-[var(--color-muted-foreground)]">
                Teach a skill well enough that someone can charge for it, then
                give them a way to earn while they learn.
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <h3 className="flex items-center gap-2 text-[15px] font-bold text-[var(--brand-ink)]">
                <Lightbulb className="size-4 text-[var(--brand-green-deep)]" strokeWidth={1.8} aria-hidden="true" />
                Our vision
              </h3>
              <p className="text-sm leading-relaxed text-[var(--color-muted-foreground)]">
                A course you finish on a Sunday should still be worth something
                on Monday. We rebuild a module when its tools change.
              </p>
            </div>
          </div>

          <div className="pt-2">
            <CtaButton href="/about">Know more</CtaButton>
          </div>
        </div>

        {/* Two photographs, aligned. The staggered offset, the drop shadows
            and the stat cards floating over the images all went: overlap is
            the opposite of minimal, and the numbers read better in the flow. */}
        <div className="flex flex-col gap-5">
          <div className="grid grid-cols-2 gap-4 sm:gap-5">
            <div className="overflow-hidden rounded-[var(--radius-card)]">
              <Image
                src="/images/about-a.jpg"
                alt=""
                width={640}
                height={800}
                sizes="(max-width: 1024px) 45vw, 22vw"
                className="aspect-[4/5] w-full object-cover"
              />
            </div>

            <div className="overflow-hidden rounded-[var(--radius-card)]">
              <Image
                src="/images/about-b.jpg"
                alt=""
                width={640}
                height={800}
                sizes="(max-width: 1024px) 45vw, 22vw"
                className="aspect-[4/5] w-full object-cover"
              />
            </div>
          </div>

          <dl className="grid grid-cols-2 gap-4 border-t border-[var(--color-border)] pt-5">
            {[
              { value: "6", label: "tracks, each project-led" },
              { value: "7 days", label: "and commission clears" },
            ].map(({ value, label }) => (
              <div key={value} className="flex flex-col gap-1">
                <dt className="tabular text-2xl font-bold leading-none text-[var(--brand-ink)]">
                  {value}
                </dt>
                <dd className="text-xs leading-snug text-[var(--color-muted-foreground)]">
                  {label}
                </dd>
              </div>
            ))}
          </dl>
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
            <span className="tabular text-[44px] font-bold leading-none tracking-tight text-[var(--brand-ink)]/12">
              {step.n}
            </span>
            <span
              aria-hidden="true"
              className="h-px w-14 rounded-full"
              style={{ background: "var(--brand-fill)" }}
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
      <div className="relative mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-2 lg:items-center">
        <div className="flex flex-col gap-4">
          <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--brand-green)]">
            Partner program
          </span>
          <h2 className="text-[26px] font-bold leading-[1.15] tracking-tight text-white sm:text-[36px]">
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

/* ------------------------------------------------------------------ founder */

const FOUNDER_CREDENTIALS = [
  { value: "6+ years", label: "in entrepreneurship, sales and leadership" },
  { value: "14,000+", label: "people in the community he has led" },
];

/**
 * One person teaches here, so this is a profile rather than a roster. A grid
 * built for eight names reads as a gap when only one is filled; a single
 * portrait beside the copy reads as deliberate.
 */
export function Founder() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
      <div className="grid items-center gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div className="relative mx-auto w-full max-w-sm lg:mx-0">
          <div className="relative overflow-hidden rounded-3xl shadow-[var(--shadow-raised)]">
            <Image
              src="/images/founder-saurabh.jpg"
              alt="Saurabh Namdev, Founder and CEO of NextMentor"
              width={941}
              height={1672}
              sizes="(max-width: 1024px) 90vw, 30vw"
              className="aspect-[4/5] w-full object-cover object-top"
            />
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <SectionHead
            eyebrow="Who teaches"
            title={
              <>
                Taught by the person who{" "}
                <span className="brand-accent-text">built the business.</span>
              </>
            }
          />

          <div className="flex flex-col">
            <span className="text-[17px] font-bold text-[var(--brand-ink)]">
              Saurabh Namdev
            </span>
            <span className="text-xs font-semibold uppercase tracking-wide text-[var(--brand-blue)]">
              Founder &amp; CEO, NextMentor
            </span>
          </div>

          <div className="flex flex-col gap-4 text-[15px] leading-relaxed text-[var(--color-muted-foreground)]">
            <p>
              With 6+ years of experience in entrepreneurship, sales, leadership
              and team building, Saurabh has built and led a community of more
              than 14,000 people, gaining practical experience in communication,
              business development, digital marketing and leadership.
            </p>
            <p>
              His vision for NextMentor is to turn real-world experience into
              practical, career-focused learning that helps people develop
              valuable skills, build confidence, and explore opportunities
              through freelancing and digital entrepreneurship.
            </p>
            <p>
              The focus is on skills that go beyond theory — skills you can
              apply in the real world to create meaningful career and business
              opportunities.
            </p>
          </div>

          <dl className="mt-1 grid gap-3 sm:grid-cols-2">
            {FOUNDER_CREDENTIALS.map(({ value, label }) => (
              <div
                key={value}
                className="flex flex-col gap-0.5 rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] px-4 py-3"
              >
                <dt className="tabular text-xl font-bold leading-none text-[var(--brand-ink)]">
                  {value}
                </dt>
                <dd className="text-xs leading-snug text-[var(--color-muted-foreground)]">
                  {label}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
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
        <div className="relative flex flex-col items-center gap-5">
          <h2 className="max-w-xl text-[26px] font-bold leading-[1.15] tracking-tight text-[var(--brand-ink)] sm:text-[36px]">
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
