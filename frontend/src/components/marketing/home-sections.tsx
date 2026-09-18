import Link from "next/link";
import Image from "next/image";
import { ArrowRight, GraduationCap, Search } from "lucide-react";
import { CtaButton } from "./cta-button";
import type { CatalogCourse } from "@nextmentor/shared";
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
 * Section heading. Tight, large type for the claim; relaxed, readable type for
 * the explanation. That contrast does most of the editorial work.
 */
export function SectionHead({
  eyebrow,
  title,
  lede,
  align = "left",
  tone = "light",
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  lede?: string;
  align?: "left" | "center";
  tone?: "light" | "dark";
  className?: string;
}) {
  const dark = tone === "dark";
  return (
    <header
      className={cn(
        "reveal flex max-w-2xl flex-col",
        align === "center" && "mx-auto items-center text-center",
        className,
      )}
    >
      {eyebrow && (
        <span
          className={cn(
            "mb-4 text-[11px] font-semibold uppercase tracking-[0.2em] sm:text-xs",
            dark ? "text-[var(--brand-green)]" : "text-[var(--brand-blue)]",
          )}
        >
          {eyebrow}
        </span>
      )}
      <h2
        className={cn(
          "text-balance text-[32px] font-bold leading-[1.08] tracking-[-0.8px] sm:text-[40px] sm:tracking-[-1.2px] lg:text-[44px] lg:leading-[1.05] lg:tracking-[-1.5px]",
          dark ? "text-white" : "text-[var(--brand-ink)]",
        )}
      >
        {title}
      </h2>
      {lede && (
        <p
          className={cn(
            "mt-4 text-pretty text-[15px] leading-[1.6] sm:text-base",
            dark ? "text-white/70" : "text-[var(--color-muted-foreground)]",
          )}
        >
          {lede}
        </p>
      )}
    </header>
  );
}

/* -------------------------------------------------------------------- hero */

/**
 * Hero: dark navy stage, centred headline, a working course search, and a
 * student cut-out rising out of a circle at the bottom edge.
 *
 * The two floating cards carry only facts the product can back up — the live
 * course count and the founder's community — rather than a star rating or a
 * learner count, neither of which exists in the data.
 */
export function Hero({ courses }: { courses: CatalogCourse[] }) {
  const quickLinks = courses.filter((c) => c.thumbnailKey).slice(0, 2);

  return (
    <section className="relative overflow-hidden bg-[var(--brand-surface-dark)] text-white">
      <HeroDecor />

      <div className="relative mx-auto flex max-w-7xl flex-col items-center px-5 pt-10 text-center sm:px-8 sm:pt-12 lg:pt-10">
        <span className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/[0.06] px-4 py-2 text-[13px] font-medium text-white/85">
          <GraduationCap className="size-4 text-[var(--brand-green-bright)]" strokeWidth={1.8} aria-hidden="true" />
          Learn from someone who does the work
        </span>

        <h1 className="mt-6 max-w-4xl text-[38px] font-bold leading-[1.08] tracking-[-1px] sm:text-[56px] sm:tracking-[-1.6px] lg:text-[64px] lg:leading-[1.06] lg:tracking-[-2px]">
          Learn the Skill,{" "}
          <span className="text-[var(--brand-green-bright)]">Freelance</span>
          <span className="mt-1 block font-medium tracking-[-0.5px] text-white/95">
            with Confidence
          </span>
        </h1>

        <p className="mt-5 max-w-[34rem] text-pretty text-base leading-[1.65] text-white/70 sm:text-[17px]">
          Practical, project-based courses that help you build in-demand skills,
          create real work, and start your freelancing journey.
        </p>

        {/* A real search: a plain GET to /courses?q=…, so it works before any
            JavaScript loads and the results page is shareable. */}
        <form
          action="/courses"
          method="get"
          role="search"
          className="mt-8 flex w-full max-w-[36rem] items-center gap-2 rounded-full bg-white p-1.5 pl-5 shadow-[0_20px_50px_-20px_rgb(0_0_0/0.5)] focus-within:ring-2 focus-within:ring-[var(--brand-green-bright)]/70"
        >
          <Search className="size-5 shrink-0 text-[var(--color-muted-foreground)]" strokeWidth={1.8} aria-hidden="true" />
          <label htmlFor="hero-search" className="sr-only">
            Search courses
          </label>
          <input
            id="hero-search"
            name="q"
            type="search"
            placeholder="Search your course…"
            autoComplete="off"
            className="min-w-0 flex-1 bg-transparent py-3 text-[15px] text-[var(--brand-ink)] outline-none placeholder:text-[var(--color-muted-foreground)] sm:text-base"
          />
          <button
            type="submit"
            aria-label="Search"
            className="flex size-11 shrink-0 items-center justify-center rounded-full bg-[var(--brand-green-bright)] text-[var(--brand-surface-dark)] transition-transform duration-200 hover:scale-105 focus-visible:outline-none sm:size-12"
          >
            <ArrowRight className="size-5" strokeWidth={2.2} aria-hidden="true" />
          </button>
        </form>

        {quickLinks.length > 0 && (
          <p className="mt-4 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[13px] text-white/55">
            <span>Popular:</span>
            {quickLinks.map((c) => (
              <Link
                key={c.slug}
                href={`/courses/${c.slug}`}
                className="text-white/80 underline decoration-white/25 underline-offset-4 transition-colors hover:text-white hover:decoration-white"
              >
                {c.title}
              </Link>
            ))}
          </p>
        )}

        {/* The stage: circles + cut-out, with the two cards pinned to it. */}
        <div className="relative mt-8 w-full max-w-5xl lg:mt-4">
          <div className="relative mx-auto h-[330px] w-full max-w-[34rem] sm:h-[420px] lg:h-[430px]">
            <span
              aria-hidden="true"
              className="absolute bottom-[-46%] left-1/2 aspect-square w-[118%] -translate-x-1/2 rounded-full bg-white/[0.05] sm:w-[112%]"
            />
            <span
              aria-hidden="true"
              className="absolute bottom-[-40%] left-1/2 aspect-square w-[86%] -translate-x-1/2 rounded-full bg-[var(--brand-blue-bright)]"
            />
            <Image
              src="/images/hero-student.webp"
              alt="A smiling student holding a tablet"
              width={1122}
              height={1402}
              loading="eager"
              fetchPriority="high"
              sizes="(max-width: 640px) 80vw, 420px"
              className="absolute bottom-0 left-1/2 h-full w-auto max-w-none -translate-x-1/2 object-contain object-bottom"
            />
          </div>

          <HeroCard className="left-0 top-[26%] hidden md:flex lg:top-[34%]">
            <span className="tabular text-[34px] font-bold leading-none tracking-[-1px] text-[var(--brand-ink)]">
              {courses.length}
            </span>
            <span className="mt-2 flex items-center gap-1.5 text-[13px] font-semibold text-[var(--brand-green)]">
              <span className="size-1.5 rounded-full bg-[var(--brand-green)]" aria-hidden="true" />
              Courses open now
            </span>
            <span className="mt-2 text-[13px] leading-[1.5] text-[var(--color-muted-foreground)]">
              Screen-recorded, step by step — follow along in your own account.
            </span>
          </HeroCard>

          <HeroCard className="right-0 top-[6%] hidden md:flex lg:top-[8%]">
            <span className="flex items-center gap-2.5">
              <span className="relative size-10 overflow-hidden rounded-full ring-2 ring-white">
                <Image
                  src="/images/founder-saurabh-portrait.jpg"
                  alt=""
                  fill
                  sizes="40px"
                  className="scale-[1.5] object-cover object-[55%_22%]"
                />
              </span>
              <span className="flex flex-col text-left leading-tight">
                <span className="text-[13px] font-semibold text-[var(--brand-ink)]">Saurabh Namdev</span>
                <span className="text-xs text-[var(--color-muted-foreground)]">Founder &amp; instructor</span>
              </span>
            </span>
            <span className="mt-4 tabular text-[34px] font-bold leading-none tracking-[-1px] text-[var(--brand-ink)]">
              14,000+
            </span>
            <span className="mt-2 text-[13px] leading-[1.5] text-[var(--color-muted-foreground)]">
              People in the community Saurabh has built and led.
            </span>
          </HeroCard>
        </div>
      </div>
    </section>
  );
}

function HeroCard({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div
      className={cn(
        "absolute w-[15.5rem] flex-col rounded-2xl bg-white p-5 text-left shadow-[0_24px_60px_-24px_rgb(0_0_0/0.55)] lg:w-[17rem]",
        className,
      )}
    >
      {children}
    </div>
  );
}

/** Background marks: soft circles, a dot grid, and two hand-drawn strokes. */
function HeroDecor() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      <span className="absolute -left-40 top-[42%] size-[26rem] rounded-full bg-white/[0.035]" />
      <span className="absolute -right-32 top-[30%] size-[22rem] rounded-full bg-white/[0.035]" />

      <svg className="absolute left-[9%] top-[30%] hidden lg:block" width="84" height="84" viewBox="0 0 84 84">
        {Array.from({ length: 16 }).map((_, i) => (
          <circle key={i} cx={(i % 4) * 22 + 9} cy={Math.floor(i / 4) * 22 + 9} r="2.2" fill="white" opacity="0.28" />
        ))}
      </svg>

      <svg
        className="absolute left-[3%] top-[11%] hidden w-20 lg:block xl:left-[7%] xl:w-24 2xl:left-[13%] 2xl:w-28"
        viewBox="0 0 120 110"
        fill="none"
        stroke="var(--brand-green-bright)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M10 98c18-8 34-20 44-36 7-11 9-24 3-30-5-5-14-1-15 7-2 12 12 20 25 18 17-3 30-18 35-35" />
        <path d="M94 16l8 7-10 4" />
      </svg>

      <svg
        className="absolute right-[14%] top-[44%] hidden w-20 lg:block"
        viewBox="0 0 90 60"
        fill="none"
        stroke="#f5d547"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M6 52c8-8 14-20 20-30 3-5 7-4 7 2 0 8-2 16 1 20 3 4 9-2 13-8 8-12 18-24 36-30" />
      </svg>
    </div>
  );
}

/* -------------------------------------------------------- why nextmentor */

const PRINCIPLES = [
  {
    title: "Lessons built around doing",
    body: "Each course walks through the real setup on screen, so you follow along in your own account instead of just watching someone talk.",
  },
  {
    title: "Taught by someone who does the work",
    body: "Saurabh Namdev brings 6+ years in entrepreneurship, sales and digital marketing, and has built and led a community of more than 14,000 people.",
  },
  {
    title: "A certificate anyone can check",
    body: "Finish every lesson and earn a certificate with its own serial number and a public verification page. No editable PDF.",
  },
  {
    title: "A referral link that pays",
    body: "Every account can share a link. You earn commission on what your referrals actually pay, not on the list price.",
  },
];

/**
 * Why learn here, answered before the catalogue. Four statements set as ruled
 * rows rather than icon cards: the claims are the content, so they get the
 * type size, and nothing decorative competes with them.
 */
export function WhyNextMentor() {
  return (
    <section className="bg-[var(--color-card)]">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20 lg:py-24">
        <SectionHead
          eyebrow="Why NextMentor"
          title="Not another course you watch and forget."
          lede="Most online courses teach theory and leave you where you started. Here, every lesson is built to end in something you can actually use."
          className="lg:sticky lg:top-28 lg:max-w-[380px] lg:self-start"
        />

        <ol className="border-t border-[rgb(16_26_71/0.1)]">
          {PRINCIPLES.map((p, i) => (
            <li
              key={p.title}
              className="reveal grid gap-2 border-b border-[rgb(16_26_71/0.1)] py-[22px] sm:grid-cols-[3.5rem_1fr] sm:gap-6 sm:py-6"
            >
              <span className="tabular text-xs font-semibold text-[var(--brand-blue)] sm:pt-1">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="text-lg font-semibold leading-snug tracking-[-0.2px] text-[var(--brand-ink)] sm:text-[19px]">
                  {p.title}
                </h3>
                <p className="mt-2 max-w-[520px] text-[15px] leading-[1.6] text-[var(--color-muted-foreground)]">
                  {p.body}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------- how it works */

const STEPS = [
  {
    n: "01",
    title: "Pick a course and learn",
    body: "Start with the free preview. Buy once and watch every lesson at your own pace, on any device.",
  },
  {
    n: "02",
    title: "Finish and get certified",
    body: "Complete every lesson to earn a serial-numbered certificate that anyone can verify on our site.",
  },
  {
    n: "03",
    title: "Share your link and earn",
    body: "Earn commission on what your referrals pay. It clears after 7 days and is paid to your bank once your KYC is approved.",
  },
];

/**
 * Oversized numerals over a hairline, no icons. The numbers carry the
 * sequence; an icon per step would only restate the heading beside it.
 */
export function HowItWorks() {
  return (
    <section id="how-it-works" className="scroll-mt-24 bg-[#f8fafd]">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:py-24">
        <div className="grid gap-6 lg:grid-cols-2 lg:items-end lg:gap-20">
          <SectionHead
            eyebrow="How it works"
            title={
              <>
                Three steps.
                <br />
                Then the third one pays.
              </>
            }
          />
          <p className="max-w-md text-pretty text-[15px] leading-[1.6] text-[var(--color-muted-foreground)] sm:text-base lg:justify-self-end">
            Most course platforms stop at the certificate. The referral link is
            the part that keeps working after you have finished studying.
          </p>
        </div>

        <ol className="mt-14 grid gap-12 sm:mt-20 md:grid-cols-3 md:gap-10 lg:gap-14">
          {STEPS.map((step) => (
            <li key={step.n} className="reveal flex flex-col">
              <span className="tabular text-[56px] font-semibold leading-none tracking-[-2px] text-[var(--brand-blue)]/[0.11] sm:text-[64px] lg:text-[80px]">
                {step.n}
              </span>
              <span aria-hidden="true" className="mt-4 h-px w-full bg-[rgb(16_26_71/0.1)]" />
              <h3 className="mt-5 text-lg font-semibold leading-snug tracking-[-0.2px] text-[var(--brand-ink)] sm:text-[20px]">
                {step.title}
              </h3>
              <p className="mt-2.5 text-[15px] leading-[1.6] text-[var(--color-muted-foreground)] sm:text-base">
                {step.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------- what you get */

const INCLUDED = [
  {
    title: "Lessons you follow along with",
    body: "Screen recordings of the real setup, step by step, so you can do it in your own account as you watch.",
  },
  {
    title: "Access that does not run out",
    body: "Buy a course once and it stays in your account. No subscription needed to keep watching.",
  },
  {
    title: "Learn at your own pace",
    body: "Watch on any device. The player remembers where you stopped, so you can pick up mid-lesson.",
  },
  {
    title: "A community to learn alongside",
    body: "Ask questions and share progress with other students in the community space inside your dashboard.",
  },
];

/**
 * Heading across the top, then an open 2×2 grid ruled only on the inside — no
 * enclosing border, no cards. A different shape from the statement-plus-list
 * sections above it, so the page does not settle into one formula.
 */
export function WhatYouGet() {
  return (
    <section className="bg-[var(--color-card)]">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:py-24">
        <SectionHead
          eyebrow="What's included"
          title={
            <>
              Everything comes
              <br className="hidden sm:block" /> with the course.
            </>
          }
          lede="One price, no recurring access fee. Everything you need to learn and finish the course."
        />

        <ul className="mt-10 grid sm:mt-16 sm:grid-cols-2">
          {INCLUDED.map((item, i) => (
            <li
              key={item.title}
              className={cn(
                "reveal border-[rgb(16_26_71/0.1)] py-6 sm:py-10",
                i > 0 && "border-t sm:border-t-0",
                i < 2 && "sm:border-b",
                i % 2 === 0 ? "sm:border-r sm:pr-10 lg:pr-16" : "sm:pl-10 lg:pl-16",
              )}
            >
              <span className="tabular text-[11px] font-semibold text-[var(--brand-blue)]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 text-lg font-semibold leading-snug tracking-[-0.2px] text-[var(--brand-ink)] sm:mt-6 sm:text-[22px]">
                {item.title}
              </h3>
              <p className="mt-2 max-w-md text-[15px] leading-[1.6] text-[var(--color-muted-foreground)] sm:mt-3">
                {item.body}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------- earn band */

const EARN_RULES = [
  {
    label: "Earned on",
    value: "What they actually paid",
    body: "Commission is calculated on the amount charged, so a discount never quietly comes out of your cut.",
  },
  {
    label: "Clears in",
    value: "7 days",
    body: "Each commission matures for a week before it can be withdrawn.",
  },
  {
    label: "Paid to",
    value: "Your bank account",
    body: "Withdraw to your bank once your KYC has been approved.",
  },
  {
    label: "Tracked in",
    value: "Your dashboard",
    body: "Every click, referral and payout is recorded where you can see it.",
  },
];

/**
 * The page's one deep-navy chapter. The referral programme is the part no
 * other course platform offers, so it gets the most contrast on the page —
 * set as a statement and a ledger of rules, with no decoration around either.
 */
export function EarnBand() {
  return (
    <section id="partner-programme" className="scroll-mt-24 bg-[var(--brand-surface-dark)]">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 sm:px-8 sm:py-24 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20 lg:py-28">
        <div className="flex flex-col items-start lg:sticky lg:top-28 lg:self-start">
          <SectionHead
            tone="dark"
            eyebrow="Partner programme"
            title={
              <>
                Study once.
                <br />
                Keep earning after.
              </>
            }
            lede="Every account gets a referral link. Share it, and when someone buys through it you earn a share of what they pay — long after you have finished your own course."
          />
          <CtaButton href="/register" size="lg" className="btn-liquid--light mt-9">
            Get your referral link
          </CtaButton>
        </div>

        <dl className="border-t border-white/10">
          {EARN_RULES.map((rule) => (
            <div
              key={rule.label}
              className="reveal grid gap-1.5 border-b border-white/10 py-6 sm:grid-cols-[8.5rem_1fr] sm:gap-8 sm:py-7"
            >
              <dt className="pt-1.5 text-[11px] font-medium uppercase tracking-[0.16em] text-white/50">
                {rule.label}
              </dt>
              <dd>
                <span className="block text-[22px] font-semibold tracking-[-0.4px] text-white sm:text-[25px]">
                  {rule.value}
                </span>
                <span className="mt-2 block max-w-md text-[14.5px] leading-[1.6] text-white/60">
                  {rule.body}
                </span>
              </dd>
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
  { value: "14,000+", label: "people in the community he has built and led" },
];

/**
 * The founder, as an editorial profile. Same photograph as the hero, framed
 * differently on purpose: the hero crops to the face, this one keeps the desk
 * and workspace and sits on the opposite side of the page.
 */
export function Founder() {
  return (
    <section className="bg-[var(--color-card)]">
      <div className="mx-auto grid max-w-7xl items-center gap-7 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-[370px_minmax(0,540px)] lg:justify-center lg:gap-16 lg:py-28 xl:gap-[72px]">
        <div className="overflow-hidden rounded-3xl bg-[var(--brand-surface-dark)] sm:mx-auto sm:max-w-md sm:rounded-[18px] lg:mx-0 lg:max-w-none">
          <Image
            src="/images/founder-saurabh-portrait.jpg"
            alt="Saurabh Namdev in his workspace"
            width={741}
            height={988}
            sizes="(max-width: 1024px) 90vw, 370px"
            className="aspect-[3/4] w-full object-cover object-top"
          />
        </div>

        <div className="flex flex-col">
          <SectionHead
            eyebrow="The founder"
            title="Taught by the person who built the business."
          />

          <div className="mt-8 flex flex-col">
            <span className="text-lg font-semibold text-[var(--brand-ink)]">Saurabh Namdev</span>
            <span className="text-[15px] text-[var(--color-muted-foreground)]">
              Founder &amp; CEO, NextMentor
            </span>
          </div>

          <div className="mt-6 flex max-w-[520px] flex-col gap-4 text-[15px] leading-[1.6] text-[var(--color-muted-foreground)]">
            <p>
              With 6+ years of experience in entrepreneurship, sales, leadership
              and team building, Saurabh has built and led a community of more
              than 14,000 people — gaining hands-on experience in communication,
              business development and digital marketing.
            </p>
            <p>
              He started NextMentor to turn that real-world experience into
              practical, career-focused learning: skills that go beyond theory
              and help people build confidence and find opportunities through
              freelancing and digital entrepreneurship.
            </p>
          </div>

          <dl className="mt-9 grid max-w-[520px] grid-cols-2 gap-8 border-t border-[rgb(16_26_71/0.1)] pt-7">
            {FOUNDER_CREDENTIALS.map(({ value, label }) => (
              <div key={value}>
                <dt className="tabular text-[30px] font-semibold leading-none tracking-[-0.8px] text-[var(--brand-ink)] sm:text-[35px]">
                  {value}
                </dt>
                <dd className="mt-2.5 text-[13.5px] leading-[1.5] text-[var(--color-muted-foreground)]">
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

/** The last ask. Open on the page surface, no boxed container around it. */
export function ClosingCta() {
  return (
    <section className="border-t border-[rgb(16_26_71/0.06)] bg-[var(--brand-hero-wash)]">
      <div className="mx-auto flex max-w-3xl flex-col items-center px-5 py-20 text-center sm:px-8 sm:py-24 lg:py-28">
        <h2 className="text-balance text-[34px] font-bold leading-[1.05] tracking-[-1px] text-[var(--brand-ink)] sm:text-[48px] sm:tracking-[-1.6px] lg:text-[54px]">
          Pick one course
          <br />
          and start this week.
        </h2>
        <p className="mt-5 max-w-[500px] text-pretty text-base leading-[1.6] text-[var(--color-muted-foreground)] sm:text-[17px]">
          Creating an account is free. Watch a preview first, and only pay when
          you know which course you want.
        </p>
        <div className="mt-7 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <CtaButton href="/courses" size="lg" className="justify-center">
            Explore courses
          </CtaButton>
          <CtaButton href="/register" variant="outline" size="lg" className="justify-center">
            Create an account
          </CtaButton>
        </div>
      </div>
    </section>
  );
}
