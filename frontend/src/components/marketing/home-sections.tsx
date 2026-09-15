import Link from "next/link";
import Image from "next/image";
import { CtaButton } from "./cta-button";
import type { CatalogCourse } from "@nextmentor/shared";
import { assetUrl, formatDuration } from "@/lib/format";
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
 * Hero.
 *
 * Copy left, a real person right. The visual is the founder's own photograph
 * with one real course pinned over its corner, so the fold answers "who
 * teaches this" and "what do I actually get" before anyone scrolls. Every
 * figure in the overlay comes from the catalogue: no invented ratings or
 * learner counts.
 */
export function Hero({ courses }: { courses: CatalogCourse[] }) {
  const featured = courses.find((c) => c.thumbnailKey) ?? courses[0];
  const thumb = featured ? assetUrl(featured.thumbnailKey, { width: 240 }) : null;

  return (
    <section className="overflow-hidden bg-[var(--brand-hero-wash)]">
      <div className="mx-auto grid max-w-7xl items-center gap-9 px-5 pb-16 pt-8 sm:px-8 sm:pb-20 sm:pt-14 lg:min-h-[640px] lg:grid-cols-[1fr_0.92fr] lg:gap-10 lg:pb-20 lg:pt-16 xl:min-h-[680px] xl:grid-cols-[0.94fr_1.06fr] xl:gap-12 xl:pt-[72px]">
        <div className="flex flex-col items-start">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--brand-blue)]">
            Practical digital skills
          </span>

          {/* Line breaks are set, not left to wrapping: at desktop widths the
              headline reads as three deliberate lines. */}
          <h1 className="mt-5 text-[42px] font-bold leading-[1.02] tracking-[-0.8px] text-[var(--brand-ink)] sm:text-[56px] sm:tracking-[-1.5px] lg:text-[50px] lg:leading-[1.04] xl:text-[64px] xl:tracking-[-2px]">
            <span className="block">Learn the skill.</span>
            <span className="block font-semibold text-[var(--brand-blue)]">
              Freelance with <br className="hidden xl:block" />
              confidence.
            </span>
          </h1>

          <p className="mt-6 max-w-[32.5rem] text-pretty text-[17px] leading-[1.65] text-[var(--color-muted-foreground)] [hyphens:manual] sm:text-lg">
            Practical, project-based courses that help you build in-demand
            skills, create real work, and start your freelancing journey.
          </p>

          <div className="mt-9 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
            <CtaButton href="/courses" size="lg" className="justify-center whitespace-nowrap">
              Explore courses
            </CtaButton>
            <CtaButton href="/register" variant="outline" size="lg" className="justify-center whitespace-nowrap">
              Create an account
            </CtaButton>
          </div>

          <p className="mt-6 flex items-center gap-2.5 text-sm text-[var(--color-muted-foreground)]">
            <span className="size-1.5 shrink-0 rounded-full bg-[var(--brand-green-deep)]" aria-hidden="true" />
            Free preview lessons, so you can watch before you buy.
          </p>
        </div>

        <div className="relative w-full pb-5 sm:mx-auto sm:max-w-[27.5rem] lg:mr-0 lg:pb-0">
          <div className="relative overflow-hidden rounded-[18px] bg-[var(--brand-surface-dark)]">
            <Image
              src="/images/founder-saurabh.jpg"
              alt="Saurabh Namdev, founder of NextMentor, at his desk"
              width={941}
              height={1672}
              // `priority` is deprecated in Next 16; this is the LCP image.
              loading="eager"
              fetchPriority="high"
              sizes="(max-width: 640px) calc(100vw - 40px), 440px"
              className="aspect-[4/5] w-full object-cover object-[50%_36%]"
            />

            {/* Plain type on the dark curtain rather than a chip: the
                photograph carries the authority, the caption just names it. */}
            <p className="absolute right-5 top-5 text-right leading-tight text-white [text-shadow:0_1px_8px_rgb(0_0_0/0.35)]">
              <span className="block text-sm font-semibold">Saurabh Namdev</span>
              <span className="block text-xs text-white/80">Founder &amp; instructor</span>
            </p>
          </div>

          {featured && (
            <Link
              href={`/courses/${featured.slug}`}
              className="absolute -bottom-5 left-4 right-4 flex items-center gap-3 rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-2.5 shadow-[0_12px_32px_-12px_rgb(16_26_71/0.22)] transition-transform duration-300 hover:-translate-y-0.5 sm:right-auto sm:max-w-[21.25rem] lg:-bottom-7 lg:-left-7 lg:w-[18.5rem]"
            >
              <span className="relative aspect-[4/3] w-[66px] shrink-0 overflow-hidden rounded-[10px] bg-[var(--color-muted)] lg:w-[78px]">
                {thumb && <Image src={thumb} alt="" fill sizes="78px" className="object-cover" />}
              </span>
              <span className="flex min-w-0 flex-col gap-0.5">
                <span className="text-[10.5px] font-semibold uppercase tracking-[0.14em] text-[var(--color-muted-foreground)]">
                  Now enrolling
                </span>
                <span className="line-clamp-2 text-[14.5px] font-semibold leading-snug text-[var(--brand-ink)]">
                  {featured.title}
                </span>
                <span className="text-[13px] text-[var(--color-muted-foreground)]">
                  {featured.lessonCount} {featured.lessonCount === 1 ? "lesson" : "lessons"} ·{" "}
                  {formatDuration(featured.durationSeconds)}
                </span>
              </span>
            </Link>
          )}
        </div>
      </div>
    </section>
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
