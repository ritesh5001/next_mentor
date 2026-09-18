"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  BadgeCheck,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  Headphones,
  Megaphone,
  MessageCircle,
  Share2,
  Smartphone,
  Sparkles,
  Target,
  TrendingUp,
  Wallet,
  type LucideIcon,
} from "lucide-react";

import { CtaButton } from "./cta-button";
import type { CatalogCourse } from "@nextmentor/shared";
import { assetUrl, formatDuration, formatPrice } from "@/lib/format";
import { cn } from "@/lib/cn";

const SLIDE_COUNT = 2;
const AUTOPLAY_MS = 7000;

type IconType = LucideIcon;

/**
 * Two-slide carousel between the trust bar and "Why NextMentor".
 *
 * Every badge, stat and feature line names something the product actually
 * does — the two real courses, the certificate, the referral commission, the
 * plan features. Nothing here is a rating, a headcount or a third-party logo:
 * this site has no ratings or learner counts, and a commercial site putting
 * Meta/Google/WhatsApp/Canva/OpenAI marks on its own marketing without
 * permission is a trademark problem, not a style choice.
 */
export function SkillsCarousel({ courses }: { courses: CatalogCourse[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    timer.current = setInterval(() => setIndex((i) => (i + 1) % SLIDE_COUNT), AUTOPLAY_MS);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [paused]);

  const goTo = useCallback((next: number) => setIndex(((next % SLIDE_COUNT) + SLIDE_COUNT) % SLIDE_COUNT), []);

  const featured = courses.filter((c) => c.thumbnailKey).slice(0, 2);

  return (
    <section
      className="relative overflow-hidden"
      aria-roledescription="carousel"
      aria-label="What you get with NextMentor"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div
        className="flex transition-transform duration-500 ease-out motion-reduce:transition-none"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        <div className="w-full shrink-0" aria-hidden={index !== 0} inert={index !== 0}>
          <SkillsSlide />
        </div>
        <div className="w-full shrink-0" aria-hidden={index !== 1} inert={index !== 1}>
          <CourseSlide courses={featured} />
        </div>
      </div>

      <button
        type="button"
        onClick={() => goTo(index - 1)}
        aria-label="Previous slide"
        className="absolute left-3 top-1/2 z-10 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-[var(--brand-ink)] shadow-[var(--shadow-raised)] transition-colors hover:bg-white sm:left-6 sm:size-11"
      >
        <ChevronLeft className="size-5" strokeWidth={2} aria-hidden="true" />
      </button>
      <button
        type="button"
        onClick={() => goTo(index + 1)}
        aria-label="Next slide"
        className="absolute right-3 top-1/2 z-10 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-[var(--brand-ink)] shadow-[var(--shadow-raised)] transition-colors hover:bg-white sm:right-6 sm:size-11"
      >
        <ChevronRight className="size-5" strokeWidth={2} aria-hidden="true" />
      </button>

      {/* A fixed dark capsule regardless of which slide is showing — a
          translucent one nearly vanished against the light slide's pale
          background, which is exactly where losing the controls matters. */}
      <div className="absolute bottom-5 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2 rounded-full bg-[var(--brand-ink)]/75 px-3 py-2 ring-1 ring-white/15 backdrop-blur-sm">
        {Array.from({ length: SLIDE_COUNT }).map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            aria-current={index === i}
            className={cn(
              "h-2 rounded-full transition-all duration-300",
              index === i ? "w-6 bg-[var(--brand-green-bright)]" : "w-2 bg-white/45 hover:bg-white/70",
            )}
          />
        ))}
      </div>
    </section>
  );
}

/* --------------------------------------------------------------- slide 1 */

const SKILL_ITEMS = [
  { Icon: Megaphone, title: "Meta Ads", sub: "Run & grow ads" },
  { Icon: MessageCircle, title: "WhatsApp Leads", sub: "Get real customers" },
  { Icon: BadgeCheck, title: "Certificate", sub: "Boost your profile" },
  { Icon: Share2, title: "Referral & Commission", sub: "Share & earn" },
];

function SkillsSlide() {
  return (
    // scroll-mt so a future anchor or keyboard focus that jumps here doesn't
    // land with the sticky header covering the eyebrow line.
    <div id="skills-showcase" className="scroll-mt-24 bg-[var(--brand-surface-dark)] px-5 py-14 sm:px-8 sm:py-16 lg:py-20">
      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1fr_1.05fr_0.85fr] lg:gap-8">
        <div className="flex flex-col items-start text-left">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--brand-green-bright)]">
            Learn · Practice · Earn
          </span>
          <h2 className="mt-4 text-balance text-[30px] font-bold leading-[1.12] tracking-[-0.7px] text-white sm:text-[38px] sm:tracking-[-1.1px]">
            Your Skills, <span className="text-[var(--brand-green-bright)]">Your Freedom</span>
          </h2>
          <p className="mt-4 max-w-sm text-[15px] leading-[1.6] text-white/70">
            Learn a real skill, practice on real work, and start freelancing on
            your own terms.
          </p>
          <CtaButton href="/register" size="lg" className="btn-liquid--light mt-7">
            Start Your Journey
          </CtaButton>
        </div>

        <div className="relative mx-auto h-[240px] w-full max-w-[15rem] sm:h-[340px] sm:max-w-[22rem] lg:h-[380px]">
          <Image
            src="/images/slide-professional.webp"
            alt="A young professional working on a laptop"
            width={1122}
            height={1402}
            // This section sits right after the hero and trust bar, so on
            // shorter viewports it is already on screen at first paint —
            // Next's own LCP heuristic flagged it as lazy-loaded above the fold.
            loading="eager"
            sizes="(max-width: 640px) 45vw, (max-width: 1024px) 60vw, 320px"
            className="absolute bottom-0 left-1/2 h-full w-auto max-w-none -translate-x-1/2 object-contain object-bottom"
          />

          {/* Floating badges only from sm up — at 390px wide, four
              absolutely-positioned badges around a ~240px-tall image have no
              room and collide. Below sm the same four facts render as a plain
              grid under the image instead. */}
          {SKILL_ITEMS.map(({ Icon, title, sub }, i) => (
            <SkillBadge
              key={title}
              className={cn(
                "hidden sm:flex",
                i === 0 && "left-0 top-0 sm:-left-3",
                i === 1 && "bottom-10 left-0 sm:-left-6",
                i === 2 && "right-0 top-0 sm:-right-3",
                i === 3 && "bottom-10 right-0 sm:-right-6",
              )}
              Icon={Icon}
              title={title}
              sub={sub}
            />
          ))}
        </div>

        <ul className="hidden flex-col gap-6 lg:flex">
          <StatRow Icon={GraduationCap} title="Expert-Led Courses" sub="Learn from a working practitioner" />
          <StatRow Icon={Smartphone} title="Lifetime Access" sub="Learn anytime, on any device" />
          <StatRow Icon={Headphones} title="Priority Support" sub="Included with Pro & Premium" />
          <StatRow Icon={Sparkles} title="100% Practical" sub="Learn by doing, not just watching" />
        </ul>

        <ul className="grid grid-cols-2 gap-3 sm:hidden">
          {SKILL_ITEMS.map(({ Icon, title, sub }) => (
            <li
              key={title}
              className="flex items-center gap-2.5 rounded-2xl bg-white/[0.07] px-3 py-2.5 ring-1 ring-white/10"
            >
              <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[var(--brand-blue-bright)]">
                <Icon className="size-4 text-white" strokeWidth={1.8} aria-hidden="true" />
              </span>
              <span className="flex min-w-0 flex-col leading-tight">
                <span className="truncate text-[12px] font-semibold text-white">{title}</span>
                <span className="truncate text-[10.5px] text-white/60">{sub}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function SkillBadge({
  className,
  Icon,
  title,
  sub,
}: {
  className?: string;
  Icon: IconType;
  title: string;
  sub: string;
}) {
  return (
    <div
      className={cn(
        "absolute flex items-center gap-2.5 rounded-2xl bg-[var(--brand-ink)]/95 px-3.5 py-2.5 shadow-[0_16px_32px_-16px_rgb(0_0_0/0.65)] ring-1 ring-white/10",
        className,
      )}
    >
      <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[var(--brand-blue-bright)]">
        <Icon className="size-4 text-white" strokeWidth={1.8} aria-hidden="true" />
      </span>
      <span className="flex flex-col leading-tight">
        <span className="whitespace-nowrap text-[12.5px] font-semibold text-white">{title}</span>
        <span className="whitespace-nowrap text-[11px] text-white/60">{sub}</span>
      </span>
    </div>
  );
}

function StatRow({ Icon, title, sub }: { Icon: IconType; title: string; sub: string }) {
  return (
    <li className="flex items-start gap-3">
      <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-white/10">
        <Icon className="size-5 text-[var(--brand-green-bright)]" strokeWidth={1.8} aria-hidden="true" />
      </span>
      <span className="flex flex-col">
        <span className="text-sm font-semibold text-white">{title}</span>
        <span className="text-[13px] text-white/55">{sub}</span>
      </span>
    </li>
  );
}

/* --------------------------------------------------------------- slide 2 */

function CourseSlide({ courses }: { courses: CatalogCourse[] }) {
  return (
    <div className="bg-[var(--color-card)] px-5 py-14 sm:px-8 sm:py-16 lg:py-20">
      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        <div className="flex flex-col items-start text-left">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--brand-blue)]">
            Learn · Practice · Earn
          </span>
          <h2 className="mt-4 text-balance text-[30px] font-bold leading-[1.12] tracking-[-0.7px] text-[var(--brand-ink)] sm:text-[38px] sm:tracking-[-1.1px]">
            Build Your Skills, Create Your <span className="text-[var(--brand-blue)]">Future</span>
          </h2>
          <p className="mt-4 max-w-md text-[15px] leading-[1.6] text-[var(--color-muted-foreground)]">
            Practical, project-led courses that turn into real freelance work —
            and a referral link that keeps paying after you finish.
          </p>

          <ul className="mt-8 grid grid-cols-3 gap-5">
            <FeatureItem Icon={Target} title="Real Projects" sub="Hands-on lessons" />
            <FeatureItem Icon={Wallet} title="Freelancing" sub="Turn skills into income" />
            <FeatureItem Icon={TrendingUp} title="Grow Your Income" sub="Through referral commission" />
          </ul>

          <CtaButton href="/courses" size="lg" className="mt-8">
            Explore Courses
          </CtaButton>
        </div>

        <div className="flex flex-col gap-3.5 rounded-3xl border border-[var(--color-border)] bg-[var(--brand-hero-wash)] p-5 sm:p-6">
          <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-muted-foreground)]">
            Courses live now
          </span>
          {courses.length === 0 && (
            <p className="py-6 text-center text-sm text-[var(--color-muted-foreground)]">
              New courses are on the way.
            </p>
          )}
          {courses.map((c) => {
            const thumb = assetUrl(c.thumbnailKey, { width: 200 });
            return (
              <Link
                key={c.slug}
                href={`/courses/${c.slug}`}
                className="group flex items-center gap-4 rounded-2xl bg-[var(--color-card)] p-3 shadow-[var(--shadow-card)] transition-shadow hover:shadow-[var(--shadow-raised)]"
              >
                <span className="relative aspect-video w-24 shrink-0 overflow-hidden rounded-xl bg-[var(--color-muted)] sm:w-28">
                  {thumb && <Image src={thumb} alt="" fill sizes="112px" className="object-cover" />}
                </span>
                <span className="flex min-w-0 flex-col gap-1">
                  <span className="truncate text-[15px] font-semibold text-[var(--brand-ink)]">{c.title}</span>
                  <span className="text-[13px] text-[var(--color-muted-foreground)]">
                    {c.lessonCount} {c.lessonCount === 1 ? "lesson" : "lessons"} ·{" "}
                    {formatDuration(c.durationSeconds)}
                  </span>
                  <span className="tabular text-[15px] font-semibold text-[var(--brand-blue)]">
                    {formatPrice(c.priceInPaise)}
                  </span>
                </span>
                <ArrowRight
                  className="ml-auto size-4 shrink-0 text-[var(--color-muted-foreground)] transition-transform group-hover:translate-x-1"
                  strokeWidth={2}
                  aria-hidden="true"
                />
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function FeatureItem({ Icon, title, sub }: { Icon: IconType; title: string; sub: string }) {
  return (
    <li className="flex flex-col gap-1.5">
      <Icon className="size-5 text-[var(--brand-blue)]" strokeWidth={1.8} aria-hidden="true" />
      <span className="text-[13.5px] font-semibold leading-tight text-[var(--brand-ink)]">{title}</span>
      <span className="text-xs leading-tight text-[var(--color-muted-foreground)]">{sub}</span>
    </li>
  );
}
