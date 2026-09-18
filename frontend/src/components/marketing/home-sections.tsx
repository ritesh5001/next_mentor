import Link from "next/link";
import Image from "next/image";
import { ArrowRight, GraduationCap, Search, ShieldCheck, Shuffle, Users } from "lucide-react";
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
            dark ? "text-[var(--brand-green-bright)]" : "text-[var(--brand-blue)]",
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

/* ------------------------------------------------------------- trust bar */

const TRUST_POINTS = [
  { Icon: Users, lines: ["Backed by a 14,000+", "Community"] },
  { Icon: GraduationCap, lines: ["Mentorship", "& Support"] },
  { Icon: ShieldCheck, lines: ["Transparent Pricing", "& Commission"] },
  { Icon: Shuffle, lines: ["Freedom to Pick", "Your Skills"] },
];

/**
 * Four promises on a deep-green bar directly under the hero. Each is something
 * the product actually does — the founder's community, mentorship and support
 * in the plans, commission on what the buyer really paid, and the choice of a
 * single course or a whole plan — not a rating or learner count.
 */
export function TrustBar() {
  return (
    <section className="relative bg-[var(--brand-hero-wash)] px-5 pb-4 pt-14 sm:px-8 sm:pt-16">
      <svg
        aria-hidden="true"
        className="absolute left-[4%] top-4 hidden w-24 text-[var(--brand-green)] sm:block"
        viewBox="0 0 96 64"
        fill="none"
        stroke="currentColor"
        strokeWidth="3.2"
        strokeLinecap="round"
      >
        {Array.from({ length: 12 }).map((_, i) => {
          const x = (i % 4) * 20 + (Math.floor(i / 4) % 2) * 8 + 6;
          const y = Math.floor(i / 4) * 18 + 8;
          return <line key={i} x1={x} y1={y + 8} x2={x + 6} y2={y} opacity={0.55 + (i % 3) * 0.15} />;
        })}
      </svg>
      <svg aria-hidden="true" className="absolute right-[18%] top-4 hidden w-12 sm:block" viewBox="0 0 48 48">
        {Array.from({ length: 16 }).map((_, i) => (
          <circle key={i} cx={(i % 4) * 12 + 6} cy={Math.floor(i / 4) * 12 + 6} r="1.8" fill="#f07b5a" opacity="0.8" />
        ))}
      </svg>

      <ul className="relative mx-auto grid max-w-7xl overflow-hidden rounded-[22px] bg-[#0b4a34] shadow-[0_28px_60px_-30px_rgb(11_74_52/0.7)] sm:grid-cols-2 xl:grid-cols-4">
        {TRUST_POINTS.map(({ Icon, lines }, i) => (
          <li
            key={lines[0]}
            className={cn(
              "flex items-center gap-4 px-6 py-5 sm:px-7 sm:py-6 xl:px-6 min-[1400px]:gap-5 min-[1400px]:px-7",
              // Dividers only between items: a rule under each on one column,
              // a 2×2 grid on tablets, a single row of four on desktop.
              i > 0 && "border-t border-white/10 sm:border-t-0",
              i >= 2 && "sm:border-t xl:border-t-0",
              i % 2 === 1 && "sm:border-l sm:border-white/10",
              i === 2 && "xl:border-l xl:border-white/10",
            )}
          >
            <span className="relative flex size-14 shrink-0 items-center justify-center rounded-full bg-[#12a150] shadow-[inset_0_1px_0_rgb(255_255_255/0.25),0_8px_18px_-8px_rgb(0_0_0/0.55)] ring-[5px] ring-white/[0.07] sm:size-16">
              <Icon className="size-6 text-white sm:size-7" strokeWidth={1.6} aria-hidden="true" />
            </span>
            <span className="text-[15px] font-semibold leading-[1.35] text-white sm:text-base min-[1400px]:text-[17px]">
              {lines[0]}
              <br />
              {lines[1]}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
