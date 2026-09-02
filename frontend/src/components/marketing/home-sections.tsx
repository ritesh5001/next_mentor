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
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 -top-32 size-[34rem] rounded-full opacity-[0.13] blur-3xl"
        style={{ background: "var(--brand-gradient)" }}
      />

      {/* Two decorative marks, one per side, echoing the reference's dashes
          and dot grid. Hidden below xl, where the portraits also disappear
          and the composition becomes a plain centred column. */}
      <Dashes className="absolute left-6 top-[62%] hidden xl:block" />
      <DotGrid className="absolute right-10 top-[58%] hidden xl:block" />

      <div className="relative mx-auto max-w-6xl px-4 pb-10 pt-14 sm:px-6 sm:pt-20">
        <div className="flex items-center justify-center gap-8">
          {/* The portraits flank the copy on wide screens only. They are
              decorative, so they carry empty alt text and never become the
              LCP element on a phone. */}
          <Portrait
            src="/images/hero-learner-a.jpg"
            className="hidden shrink-0 xl:block"
            size={220}
          />

          <div className="flex max-w-2xl flex-col items-center gap-6 text-center">
            <span className="pill inline-flex items-center gap-2 border border-[var(--color-border)] bg-[var(--color-card)] px-3.5 py-1.5 text-xs font-semibold text-[var(--color-muted-foreground)]">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full rounded-full bg-[var(--brand-green)] opacity-70" />
                <span className="relative inline-flex size-2 rounded-full bg-[var(--brand-green-deep)]" />
              </span>
              {courseCount > 0
                ? `${courseCount} course${courseCount === 1 ? "" : "s"} open for enrolment`
                : "New courses opening soon"}
            </span>

            <h1 className="text-[34px] font-extrabold leading-[1.1] tracking-[-0.02em] text-[var(--brand-ink)] sm:text-[50px] lg:text-[56px]">
              Learn the skill.{" "}
              <span className="brand-gradient-text">Then get paid for it.</span>
            </h1>

            <p className="max-w-xl text-base leading-relaxed text-[var(--color-muted-foreground)] sm:text-[17px]">
              Short, project-led courses in marketing, AI and design. You finish
              with something you built, a certificate anyone can check, and a
              referral link that pays you for everyone you bring in.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
              <CtaButton href="/courses" size="lg">
                Explore courses
              </CtaButton>
              <CtaButton href="/register" variant="outline" size="lg">
                Create an account
              </CtaButton>
            </div>
          </div>

          <div className="relative hidden shrink-0 xl:block">
            <Portrait src="/images/hero-learner-b.jpg" size={220} />
            {/* The greeting bubble from the reference, tail and all. */}
            <span
              aria-hidden="true"
              className="absolute -left-2 -top-3 rounded-full px-4 py-2 text-sm font-extrabold text-white shadow-[var(--shadow-card)]"
              style={{ background: "var(--brand-green-deep)" }}
            >
              Hello
              <span
                className="absolute -bottom-1 left-6 size-3 rotate-45"
                style={{ background: "var(--brand-green-deep)" }}
              />
            </span>
          </div>
        </div>
      </div>

      {/* The dark promise bar the reference floats over the fold. Four claims,
          each one we can actually stand behind. */}
      <div className="relative mx-auto max-w-6xl px-4 pb-14 sm:px-6">
        <ul
          className="grid gap-px overflow-hidden rounded-2xl sm:grid-cols-2 lg:grid-cols-4"
          style={{ background: "rgb(255 255 255 / 0.12)" }}
        >
          {PROMISES.map(({ Icon, lines }) => (
            <li
              key={lines[0]}
              className="flex items-center gap-3 px-5 py-5"
              style={{ background: "var(--brand-surface-dark)" }}
            >
              <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-white/12">
                <Icon className="size-5 text-white" strokeWidth={1.6} aria-hidden="true" />
              </span>
              <span className="text-sm font-bold leading-snug text-white">
                {lines[0]}
                <br />
                {lines[1]}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

const PROMISES: Array<{ Icon: typeof ShieldCheck; lines: [string, string] }> = [
  { Icon: Users, lines: ["Taught by people", "who do the work"] },
  { Icon: FileCheck2, lines: ["Certificates anyone", "can verify"] },
  { Icon: ShieldCheck, lines: ["One price,", "no second paywall"] },
  { Icon: Wallet, lines: ["Commission paid", "to your bank"] },
];

/** A circular portrait with a soft ring, as on the reference. */
function Portrait({
  src,
  size,
  className,
}: {
  src: string;
  size: number;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-full border-4 border-[var(--color-card)] shadow-[var(--shadow-raised)]",
        className,
      )}
      style={{ width: size, height: size }}
    >
      <Image
        src={src}
        alt=""
        width={size}
        height={size}
        // Decorative and beside the headline, so it must not delay the LCP.
        loading="lazy"
        className="size-full object-cover"
      />
    </div>
  );
}

function Dashes({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      width="88"
      height="64"
      viewBox="0 0 88 64"
      className={className}
      fill="none"
    >
      {Array.from({ length: 12 }).map((_, i) => (
        <line
          key={i}
          x1={(i % 4) * 22 + 2}
          y1={Math.floor(i / 4) * 22 + 2}
          x2={(i % 4) * 22 + 12}
          y2={Math.floor(i / 4) * 22 + 14}
          stroke="var(--brand-green)"
          strokeWidth="3"
          strokeLinecap="round"
          opacity="0.45"
        />
      ))}
    </svg>
  );
}

function DotGrid({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" width="76" height="76" viewBox="0 0 76 76" className={className}>
      {Array.from({ length: 36 }).map((_, i) => (
        <circle
          key={i}
          cx={(i % 6) * 14 + 4}
          cy={Math.floor(i / 6) * 14 + 4}
          r="2"
          fill="var(--brand-blue)"
          opacity="0.28"
        />
      ))}
    </svg>
  );
}


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
                Built by people who <span className="brand-gradient-text">do this work.</span>
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

        {/* Collage. Decorative throughout, so every image has empty alt text
            and the connector lines are hidden from assistive tech. */}
        <div className="relative">
          <div className="grid grid-cols-2 items-end gap-4 sm:gap-5">
            <div className="overflow-hidden rounded-2xl shadow-[var(--shadow-raised)]">
              <Image
                src="/images/about-a.jpg"
                alt=""
                width={640}
                height={800}
                sizes="(max-width: 1024px) 45vw, 22vw"
                className="aspect-[4/5] w-full object-cover"
              />
            </div>

            <div className="overflow-hidden rounded-2xl shadow-[var(--shadow-raised)] sm:translate-y-8">
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

          {/* The two floating figures. Both hug the lower edges: the faces
              sit mid-frame, and anything pinned to the top of a section can be
              covered by the sticky header on the way down. Absolute only from
              sm up; below that they sit in the flow. */}
          <div className="mt-4 grid grid-cols-2 gap-3 sm:mt-0 sm:block">
            <FloatingStat
              value="6"
              label="tracks, each project-led"
              className="sm:absolute sm:-right-4 sm:bottom-0 sm:max-w-[11rem]"
            />
            <FloatingStat
              value="7 days"
              label="and commission clears"
              className="sm:absolute sm:-left-5 sm:bottom-16 sm:max-w-[11rem]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function FloatingStat({
  value,
  label,
  className,
}: {
  value: string;
  label: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-0.5 rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] px-4 py-3 shadow-[var(--shadow-raised)]",
        className,
      )}
    >
      <span className="tabular text-xl font-extrabold leading-none text-[var(--brand-ink)]">
        {value}
      </span>
      <span className="text-xs leading-snug text-[var(--color-muted-foreground)]">{label}</span>
    </div>
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
