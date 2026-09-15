import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Check, Quote } from "lucide-react";

import { SectionHead } from "./home-sections";
import { CtaButton } from "./cta-button";
import type { CourseCardData } from "./course-card";
import { Faq } from "./faq";
import { assetUrl, formatDuration, formatPrice } from "@/lib/format";
import { cn } from "@/lib/cn";

export { Faq };

/**
 * Second half of the homepage.
 *
 * Three sections were removed rather than restyled. A skills word-cloud, a
 * "featured training" band and a generic four-benefit strip were all saying
 * what other sections already said, and length is not the same thing as
 * substance. What is left is the catalogue, the plans, the people and the
 * proof.
 */

/* --------------------------------------------------------------- catalogue */

const LEVEL_LABEL: Record<CourseCardData["level"], string> = {
  beginner: "Beginner",
  intermediate: "Intermediate",
  advanced: "Advanced",
};

/**
 * The catalogue as a few editorial features rather than a product grid.
 *
 * There are only a handful of courses, and a three-column grid of them reads as
 * a sparse marketplace. Large alternating rows make the same two or three
 * courses look deliberate. Only courses with artwork are featured here — a
 * placeholder tile in the most prominent product slot on the site looks
 * unfinished — while /courses still lists everything.
 */
export function FeaturedCourses({ courses }: { courses: CourseCardData[] }) {
  const featured = courses.filter((c) => c.thumbnailKey).slice(0, 3);
  if (featured.length === 0) return null;

  return (
    <section className="bg-[var(--brand-hero-wash)]">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24 lg:py-28">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHead
            eyebrow="Courses"
            title="Start with a skill you can actually use."
            lede="Practical courses built around one skill each. Watch a free preview lesson before you buy."
            className="lg:max-w-[560px]"
          />
          <Link
            href="/courses"
            className="group inline-flex min-h-11 items-center gap-1.5 text-[15px] font-semibold text-[var(--brand-blue)]"
          >
            View all courses
            <ArrowRight
              className="size-4 transition-transform duration-200 ease-out group-hover:translate-x-1"
              strokeWidth={2}
              aria-hidden="true"
            />
          </Link>
        </div>

        <ul className="mt-10 flex flex-col gap-5 sm:mt-14 sm:gap-6 lg:gap-8">
          {featured.map((course, i) => (
            <li key={course.slug} className="reveal">
              <FeatureCourse course={course} flip={i % 2 === 1} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function FeatureCourse({ course, flip }: { course: CourseCardData; flip: boolean }) {
  const thumb = assetUrl(course.thumbnailKey, { width: 960 });
  const hasDiscount = course.mrpInPaise != null && course.mrpInPaise > course.priceInPaise;
  const byFounder = course.instructorName === "Saurabh Namdev";

  return (
    <Link
      href={`/courses/${course.slug}`}
      className={cn(
        "group grid overflow-hidden rounded-2xl border border-[rgb(16_26_71/0.08)] bg-[var(--color-card)] transition-[border-color,box-shadow] duration-300 hover:border-[rgb(16_26_71/0.16)] hover:shadow-[0_24px_48px_-28px_rgb(16_26_71/0.3)] sm:rounded-[18px]",
        flip ? "md:grid-cols-[47fr_53fr]" : "md:grid-cols-[53fr_47fr]",
      )}
    >
      {/* Real lesson footage, lightly treated so its saturated backdrops sit
          inside the navy palette without losing the proof that it is real. */}
      <div
        className={cn(
          "relative aspect-video overflow-hidden bg-[var(--brand-surface-dark)] md:aspect-auto md:min-h-[370px]",
          flip && "md:order-2",
        )}
      >
        {thumb && (
          <Image
            src={thumb}
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, 680px"
            className="object-cover saturate-[0.82] transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />
        )}
        <span aria-hidden="true" className="absolute inset-0 bg-[#101a47]/10 mix-blend-multiply" />
      </div>

      <div className="flex flex-col p-5 sm:p-8">
        <p className="text-[13px] text-[var(--color-muted-foreground)]">
          {course.lessonCount} {course.lessonCount === 1 ? "lesson" : "lessons"} ·{" "}
          {formatDuration(course.durationSeconds)} · {LEVEL_LABEL[course.level]}
        </p>
        <h3 className="mt-3.5 text-balance text-2xl font-semibold leading-[1.1] tracking-[-0.5px] text-[var(--brand-ink)] sm:text-[30px] sm:leading-[1.08]">
          {course.title}
        </h3>
        {course.subtitle && (
          <p className="mt-3 max-w-md text-pretty text-[15px] leading-[1.6] text-[var(--color-muted-foreground)]">
            {course.subtitle}
          </p>
        )}

        {course.instructorName && (
          <p className="mb-5 mt-[22px] flex items-center gap-3">
            <span className="relative size-9 shrink-0 overflow-hidden rounded-full bg-[var(--color-muted)]">
              {byFounder ? (
                <Image
                  src="/images/founder-saurabh-portrait.jpg"
                  alt=""
                  fill
                  sizes="36px"
                  className="scale-[1.5] object-cover object-[55%_22%]"
                />
              ) : (
                <span className="flex size-full items-center justify-center text-xs font-semibold text-[var(--brand-ink)]">
                  {course.instructorName.split(" ").map((w) => w[0]).slice(0, 2).join("")}
                </span>
              )}
            </span>
            <span className="flex flex-col leading-tight">
              <span className="text-sm font-semibold text-[var(--brand-ink)]">{course.instructorName}</span>
              <span className="text-xs text-[var(--color-muted-foreground)]">Instructor</span>
            </span>
          </p>
        )}

        <div className="mt-auto flex flex-wrap items-center justify-between gap-4 border-t border-[rgb(16_26_71/0.08)] pt-5">
          <p className="flex items-baseline gap-2">
            <span className="tabular text-[25px] font-semibold tracking-[-0.5px] text-[var(--brand-ink)]">
              {course.priceInPaise === 0 ? "Free" : formatPrice(course.priceInPaise)}
            </span>
            {hasDiscount && (
              <span className="tabular text-[13px] text-[var(--color-muted-foreground)] line-through">
                {formatPrice(course.mrpInPaise!)}
              </span>
            )}
          </p>
          <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--brand-blue)]">
            View course
            <ArrowRight
              className="size-4 transition-transform duration-200 ease-out group-hover:translate-x-1"
              strokeWidth={2}
              aria-hidden="true"
            />
          </span>
        </div>
      </div>
    </Link>
  );
}

/* ---------------------------------------------------------------- packages */

export type PackageCard = {
  slug: string;
  name: string;
  tagline: string | null;
  priceInPaise: number;
  mrpInPaise: number | null;
  durationDays: number | null;
  features: string[];
  isFeatured: boolean;
};

function planTerm(durationDays: number | null): string {
  if (durationDays == null) return "one-time, lifetime access";
  if (durationDays === 365) return "per year";
  return `for ${durationDays} days`;
}

/**
 * Three plans, prices and features exactly as configured in the admin. The
 * featured plan earns its emphasis from a navy rule, a label and the only
 * filled button — not from being drawn larger than its neighbours.
 */
export function Packages({ plans }: { plans: PackageCard[] }) {
  return (
    <section className="bg-[var(--brand-hero-wash)]">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24 lg:py-28">
        <SectionHead
          align="center"
          eyebrow="Plans"
          title={
            <>
              Buy one course,
              <br className="hidden sm:block" /> or take the lot.
            </>
          }
          lede="A plan opens more of the catalogue and raises what you earn on every referral."
        />

        {plans.length === 0 ? (
          <p className="mx-auto mt-12 max-w-md text-center text-[15px] text-[var(--color-muted-foreground)]">
            Plans are being finalised. You can still buy any course on its own.
          </p>
        ) : (
          <div className="mx-auto mt-12 grid max-w-6xl items-stretch gap-4 sm:mt-14 lg:grid-cols-3 lg:items-center lg:gap-5">
            {plans.map((plan) => {
              const discounted = plan.mrpInPaise != null && plan.mrpInPaise > plan.priceInPaise;
              return (
                <article
                  key={plan.slug}
                  className={cn(
                    "reveal relative flex flex-col rounded-[18px] bg-[var(--color-card)] p-6 sm:p-7",
                    plan.isFeatured
                      ? "border-[1.5px] border-[var(--brand-blue)] shadow-[0_28px_60px_-32px_rgb(27_63_160/0.45)] lg:py-9"
                      : "border border-[rgb(16_26_71/0.1)]",
                  )}
                >
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-xl font-semibold tracking-[-0.3px] text-[var(--brand-ink)]">
                      {plan.name}
                    </h3>
                    {plan.isFeatured && (
                      <span className="pill bg-[var(--brand-fill)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-white">
                        Most popular
                      </span>
                    )}
                  </div>
                  {plan.tagline && (
                    <p className="mt-2 text-[15px] leading-[1.5] text-[var(--color-muted-foreground)]">
                      {plan.tagline}
                    </p>
                  )}

                  <div className="mt-5">
                    <p className="flex items-baseline gap-2.5">
                      <span className="tabular text-[40px] font-semibold leading-none tracking-[-1.2px] text-[var(--brand-ink)]">
                        {plan.priceInPaise === 0 ? "Free" : formatPrice(plan.priceInPaise)}
                      </span>
                      {discounted && (
                        <span className="tabular text-[15px] text-[var(--color-muted-foreground)] line-through">
                          {formatPrice(plan.mrpInPaise!)}
                        </span>
                      )}
                    </p>
                    <p className="mt-2 text-[13px] text-[var(--color-muted-foreground)]">
                      {planTerm(plan.durationDays)}
                    </p>
                  </div>

                  <ul className="mt-6 flex flex-1 flex-col gap-2.5 border-t border-[rgb(16_26_71/0.08)] pt-6">
                    {plan.features.map((f) => (
                      <li key={f} className="flex gap-3 text-[15px] leading-[1.45] text-[var(--brand-ink)]/85">
                        <Check
                          className="mt-[3px] size-4 shrink-0 text-[var(--brand-blue)]"
                          strokeWidth={2.2}
                          aria-hidden="true"
                        />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <CtaButton
                    href={`/pricing?plan=${plan.slug}`}
                    variant={plan.isFeatured ? "primary" : "outline"}
                    size="lg"
                    className="mt-7 w-full justify-center"
                  >
                    Choose {plan.name}
                  </CtaButton>
                </article>
              );
            })}
          </div>
        )}

        <p className="mt-10 text-center text-[15px] text-[var(--color-muted-foreground)]">
          Only need one skill?{" "}
          <Link href="/courses" className="font-semibold text-[var(--brand-blue)] hover:underline">
            Buy a single course
          </Link>
        </p>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------- testimonials */

/**
 * Two of the four quotes that shipped with the site were dropped: they credited
 * SEO and Google Ads courses NextMentor does not sell, and a testimonial for a
 * course that does not exist is a claim the business cannot stand behind.
 */
const TESTIMONIALS = [
  {
    name: "Neeraj Malviya",
    context: "Meta Ads",
    body: "I built a real income from the skills I learned here, and the referral program paid for the course several times over.",
  },
  {
    name: "Priti Priyedarshni",
    context: "Digital marketing",
    body: "Structured training, Q&A sessions and mentorship that actually answered my questions. I went from nothing to running campaigns.",
  },
];

/** Large quotes set as type, no stars and no rating — there is no rating data. */
export function Testimonials() {
  return (
    <section className="bg-[var(--brand-hero-wash)]">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24 lg:py-28">
        <SectionHead eyebrow="Students" title="What people said afterwards." />

        <div className="mt-12 grid gap-12 sm:mt-16 md:grid-cols-2 md:gap-16 lg:gap-20">
          {TESTIMONIALS.map((t) => (
            <figure key={t.name} className="reveal flex flex-col border-t border-[rgb(16_26_71/0.12)] pt-8">
              <Quote
                className="size-7 text-[var(--brand-blue)]/30"
                strokeWidth={1.5}
                aria-hidden="true"
              />
              <blockquote className="mt-5 text-pretty text-[21px] font-medium leading-[1.45] tracking-[-0.3px] text-[var(--brand-ink)] sm:text-2xl">
                {t.body}
              </blockquote>
              <figcaption className="mt-7 flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[var(--color-card)] text-[13px] font-semibold text-[var(--brand-ink)] ring-1 ring-[rgb(16_26_71/0.1)]"
                >
                  {t.name.split(" ").map((n) => n[0]).join("")}
                </span>
                <span className="flex flex-col leading-tight">
                  <span className="text-[15px] font-semibold text-[var(--brand-ink)]">{t.name}</span>
                  <span className="text-[13px] text-[var(--color-muted-foreground)]">{t.context}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
