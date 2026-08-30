import Link from "next/link";
import {
  ArrowRight,
  Award,
  BadgeCheck,
  BookOpenCheck,
  Gift,
  GraduationCap,
  Headphones,
  Infinity as InfinityIcon,
  ListChecks,
  Sparkles,
  Users,
} from "lucide-react";

import { Counter } from "./counter";
import { cn } from "@/lib/cn";

/**
 * Public homepage sections.
 *
 * Layout, section order and component styling follow the reference site the
 * client supplied. Copy is written for NextMentor rather than duplicated —
 * another company's marketing text is both theirs and factually wrong here.
 */

/** Section heading with the last word(s) gradient-filled, as on the reference. */
export function SectionHeading({
  lead,
  accent,
  subtitle,
  className,
}: {
  lead: string;
  accent?: string;
  subtitle?: string;
  className?: string;
}) {
  return (
    <header className={cn("flex w-full flex-col items-center gap-3 text-center", className)}>
      <h2 className="text-[28px] font-bold leading-tight tracking-tight text-[var(--brand-ink)] sm:text-[40px]">
        {lead}
        {accent && <> <span className="brand-gradient-text">{accent}</span></>}
      </h2>
      {subtitle && (
        <p className="w-full max-w-2xl text-[15px] leading-relaxed text-[var(--color-muted-foreground)]">
          {subtitle}
        </p>
      )}
    </header>
  );
}

/* -------------------------------------------------------------------- hero */

export function Hero() {
  return (
    <section
      className="relative overflow-hidden"
      style={{ background: "var(--brand-hero-wash)" }}
    >
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-[1.1fr_1fr]">
        <div className="flex flex-col items-start gap-6">
          <span className="pill inline-flex items-center gap-2 border border-[var(--color-border)] bg-[var(--color-card)] px-4 py-1.5 text-xs font-semibold text-[var(--color-muted-foreground)]">
            <Sparkles className="size-3.5 text-[var(--brand-green)]" strokeWidth={2} aria-hidden="true" />
            India&apos;s creator-first ed-tech
          </span>

          <h1 className="text-[38px] font-bold leading-[1.15] tracking-tight text-[var(--brand-ink)] sm:text-[56px] lg:text-[62px]">
            Learn, Create,
            <br />
            <span className="brand-gradient-text">Monetize.</span>
          </h1>

          <p className="w-full max-w-lg text-base leading-relaxed text-[var(--color-muted-foreground)] sm:text-lg">
            Master AI, freelancing and design with practical, project-led learning.
            Zero fluff — only skills that get you paid.
          </p>

          <div className="flex flex-wrap gap-3 pt-1">
            <Link
              href="/register"
              className="pill brand-gradient-bg inline-flex min-h-12 items-center gap-2 px-7 text-base font-semibold text-white transition-[filter,transform] duration-200 hover:brightness-110 active:scale-[0.98]"
            >
              Get Started
              <ArrowRight className="size-4" strokeWidth={2} aria-hidden="true" />
            </Link>
            <Link
              href="/courses"
              className="pill inline-flex min-h-12 items-center gap-2 border-2 border-[var(--color-border)] px-7 text-base font-medium text-[var(--brand-ink)] transition-colors duration-200 hover:border-[var(--brand-blue)] hover:text-[var(--brand-blue)]"
            >
              Explore Courses
              <ArrowRight className="size-4" strokeWidth={2} aria-hidden="true" />
            </Link>
          </div>
        </div>

        {/* Decorative composition. aria-hidden — it repeats nothing the copy
            does not already say, so a screen reader gains nothing from it. */}
        <div aria-hidden="true" className="relative hidden lg:block">
          <div className="relative mx-auto aspect-square w-full max-w-md">
            <div className="brand-gradient-bg absolute left-1/2 top-1/2 size-56 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20 blur-2xl" />
            <div className="absolute left-1/2 top-1/2 flex size-40 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-3xl border border-[var(--color-border)] bg-[var(--color-card)] shadow-[var(--shadow-raised)]">
              <GraduationCap className="size-16 text-[var(--brand-blue)]" strokeWidth={1.2} />
            </div>
            {[
              { Icon: BookOpenCheck, pos: "left-0 top-6" },
              { Icon: Award, pos: "right-2 top-16" },
              { Icon: Users, pos: "left-6 bottom-16" },
              { Icon: BadgeCheck, pos: "right-6 bottom-6" },
            ].map(({ Icon, pos }, i) => (
              <div
                key={i}
                className={cn(
                  "absolute flex size-16 items-center justify-center rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] shadow-[var(--shadow-card)]",
                  pos,
                )}
              >
                <Icon className="size-7 text-[var(--brand-green)]" strokeWidth={1.4} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------- feature strip */

const FEATURES = [
  {
    Icon: GraduationCap,
    title: "Best Training System",
    body: "Effective instruction, personalised feedback and accelerated growth. Elevate your skills and achieve greatness.",
  },
  {
    Icon: InfinityIcon,
    title: "Life Time Access",
    body: "Buy once, keep access. Gain the skills employers look for and unlock new opportunities on your own schedule.",
  },
  {
    Icon: Headphones,
    title: "Fast & Friendly Support",
    body: "A dedicated team here to help you reach your goals. Real answers from people who have done the work.",
  },
  {
    Icon: Gift,
    title: "Rewards",
    body: "Earn as you grow. Commission on every referral, plus recognition for the people who bring others with them.",
  },
];

export function FeatureStrip() {
  return (
    <section className="brand-gradient-bg">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:py-14">
        {FEATURES.map(({ Icon, title, body }) => (
          <div key={title} className="flex flex-col gap-3 text-white">
            <Icon className="size-8" strokeWidth={1.4} aria-hidden="true" />
            <h3 className="text-lg font-bold">{title}</h3>
            <p className="text-sm leading-relaxed text-white/80">{body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* -------------------------------------------------------------- stat cards */

const STATS = [
  { value: 12000, suffix: "+", label: "Learners & counting", Icon: Users },
  { value: 24, suffix: "+", label: "Courses", Icon: BookOpenCheck },
  { value: 150, suffix: "+", label: "Live Trainings", Icon: GraduationCap },
  { value: 18, suffix: "+", label: "Trainers", Icon: Award },
];

export function Stats() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
      <SectionHeading lead="Why" accent="NextMentor" className="mb-10" />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {STATS.map(({ value, suffix, label, Icon }) => (
          <div
            key={label}
            className="flex flex-col items-center gap-3 rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-6 text-center shadow-[var(--shadow-card)]"
          >
            <div className="flex size-12 items-center justify-center rounded-xl bg-[var(--color-primary-subtle)]">
              <Icon className="size-6 text-[var(--brand-blue)]" strokeWidth={1.5} aria-hidden="true" />
            </div>
            <span className="tabular text-2xl font-extrabold text-[var(--brand-ink)] sm:text-3xl">
              <Counter to={value} suffix={suffix} />
            </span>
            <span className="text-xs text-[var(--color-muted-foreground)] sm:text-sm">{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------ why choose us */

const REASONS = [
  {
    Icon: BookOpenCheck,
    title: "TOP NOTCH COURSES",
    body: "Stay current with the skills the market is actually hiring and paying for right now.",
  },
  {
    Icon: BadgeCheck,
    title: "COURSE CERTIFICATES",
    body: "A verifiable certificate for every course you finish — shareable, and checkable by anyone.",
  },
  {
    Icon: ListChecks,
    title: "PRACTICAL PROJECTS",
    body: "Every module ends in something you have built, not something you have only watched.",
  },
  {
    Icon: Gift,
    title: "PARTNER PROGRAM",
    body: "Earn real commission on everyone you bring in, tracked transparently and paid to your bank.",
  },
];

export function WhyChooseUs() {
  return (
    <section className="bg-[var(--color-muted)]/40">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <SectionHeading
          lead="Why Choose"
          accent="Us"
          subtitle="Level up your career with NextMentor. Industry-leading training and expert guidance for success."
          className="mb-10"
        />

        <div className="grid gap-4 sm:grid-cols-2">
          {REASONS.map(({ Icon, title, body }) => (
            <div
              key={title}
              className="flex gap-4 rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-5 shadow-[var(--shadow-card)]"
            >
              <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-[var(--color-primary-subtle)]">
                <Icon className="size-5 text-[var(--brand-blue)]" strokeWidth={1.5} aria-hidden="true" />
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="text-sm font-bold tracking-wide text-[var(--brand-ink)]">{title}</h3>
                <p className="text-sm leading-relaxed text-[var(--color-muted-foreground)]">{body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
