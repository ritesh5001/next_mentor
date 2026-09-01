import Link from "next/link";
import { ArrowRight, Check, Quote } from "lucide-react";

import { SectionHead } from "./home-sections";
import { CtaButton } from "./cta-button";
import { CourseCard, type CourseCardData } from "./course-card";
import { Faq } from "./faq";
import { Newsletter } from "./newsletter";
import { formatPrice } from "@/lib/format";
import { cn } from "@/lib/cn";

export { Faq, Newsletter };

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

export function FeaturedCourses({ courses }: { courses: CourseCardData[] }) {
  if (courses.length === 0) return null;

  return (
    <section className="border-y border-[var(--color-border)] bg-[var(--color-muted)]/40">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHead
            eyebrow="The catalogue"
            title="Start with one of these."
            lede="Each one is self-contained. Finish it and you have a project you can show and a certificate you can prove."
          />
          <Link
            href="/courses"
            className="group inline-flex min-h-11 items-center gap-1.5 px-1 text-sm font-semibold text-[var(--brand-blue)]"
          >
            All courses
            <ArrowRight
              className="size-4 transition-transform duration-200 ease-out group-hover:translate-x-1"
              strokeWidth={2}
              aria-hidden="true"
            />
          </Link>
        </div>

        {/* A three-column grid with one course in it reads as a broken page,
            not a young catalogue. Below three, the row is completed by a real
            invitation to the full list instead of by empty space. */}
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {courses.slice(0, 3).map((course) => (
            <CourseCard key={course.slug} course={course} />
          ))}

          {courses.length < 3 && (
            <Link
              href="/courses"
              className="group flex min-h-[18rem] flex-col items-start justify-end gap-2 rounded-2xl border border-dashed border-[var(--color-border)] p-6 transition-colors hover:border-[var(--brand-blue)] hover:bg-[var(--color-muted)]/40"
            >
              <span className="text-[15px] font-bold text-[var(--brand-ink)]">
                More on the way
              </span>
              <span className="text-sm leading-relaxed text-[var(--color-muted-foreground)]">
                New tracks open regularly. See everything that is live right now.
              </span>
              <span className="mt-1 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--brand-blue)]">
                Browse the catalogue
                <ArrowRight
                  className="size-4 transition-transform duration-200 ease-out group-hover:translate-x-1"
                  strokeWidth={2}
                  aria-hidden="true"
                />
              </span>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- packages */

export type PackageCard = {
  slug: string;
  name: string;
  tagline: string | null;
  priceInPaise: number;
  mrpInPaise: number | null;
  features: string[];
  isFeatured: boolean;
};

export function Packages({ plans }: { plans: PackageCard[] }) {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
      <SectionHead
        align="center"
        eyebrow="Plans"
        title="Buy one course, or take the lot."
        lede="A plan opens the whole catalogue and raises what you earn on every referral."
      />

      {plans.length === 0 ? (
        <p className="mt-10 rounded-2xl border border-dashed border-[var(--color-border)] px-6 py-14 text-center text-sm text-[var(--color-muted-foreground)]">
          Plans are being finalised. You can still buy any course on its own.
        </p>
      ) : (
        <div className="mt-12 grid items-start gap-5 lg:grid-cols-3">
          {plans.map((plan) => (
            <article
              key={plan.slug}
              className={cn(
                "relative flex flex-col gap-5 rounded-2xl border bg-[var(--color-card)] p-6",
                "transition-transform duration-200 ease-out hover:-translate-y-1",
                plan.isFeatured
                  ? "border-[var(--brand-blue)] shadow-[var(--shadow-raised)] lg:-mt-3 lg:pb-8"
                  : "border-[var(--color-border)] shadow-[var(--shadow-card)]",
              )}
            >
              {plan.isFeatured && (
                <span
                  className="pill absolute -top-3 left-6 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-white"
                  style={{ background: "var(--brand-gradient)" }}
                >
                  Most popular
                </span>
              )}

              <div className="flex flex-col gap-1">
                <h3 className="text-lg font-bold text-[var(--brand-ink)]">{plan.name}</h3>
                {plan.tagline && (
                  <p className="text-sm text-[var(--color-muted-foreground)]">{plan.tagline}</p>
                )}
              </div>

              <p className="flex items-baseline gap-2">
                <span className="tabular text-3xl font-extrabold tracking-tight text-[var(--brand-ink)]">
                  {plan.priceInPaise === 0 ? "Free" : formatPrice(plan.priceInPaise)}
                </span>
                {plan.mrpInPaise != null && plan.mrpInPaise > plan.priceInPaise && (
                  <span className="tabular text-sm text-[var(--color-muted-foreground)] line-through">
                    {formatPrice(plan.mrpInPaise)}
                  </span>
                )}
              </p>

              <ul className="flex flex-1 flex-col gap-2.5">
                {plan.features.map((f) => (
                  <li key={f} className="flex gap-2.5 text-sm text-[var(--color-muted-foreground)]">
                    <Check
                      className="mt-0.5 size-4 shrink-0 text-[var(--brand-green-deep)]"
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
                className="w-full justify-center"
              >
                Choose {plan.name}
              </CtaButton>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

/* ---------------------------------------------------------------- founders */

const FOUNDERS = [
  {
    name: "Saurabh Namdev",
    role: "Founder",
    bio: "Saurabh started NextMentor to fix one problem: most online courses teach theory and leave you where you started. Every track here ends in something you have built and can show.",
  },
  {
    name: "Aishwarya Sharma",
    role: "Co-Founder",
    bio: "Aishwarya runs curriculum. Every instructor still does the work they teach, and a module gets rebuilt when the tools change. What you learn on a Sunday should still work on Monday.",
  },
];

export function Founders() {
  return (
    <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 sm:pb-24">
      <SectionHead eyebrow="Who runs it" title="The two people behind this." />

      <div className="mt-10 grid gap-8 sm:grid-cols-2 sm:gap-12">
        {FOUNDERS.map((f) => (
          <article key={f.name} className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              {/* Placeholder portrait. Swap for a real photo when there is one. */}
              <span
                aria-hidden="true"
                className="flex size-12 shrink-0 items-center justify-center rounded-full text-sm font-extrabold text-white"
                style={{ background: "var(--brand-gradient)" }}
              >
                {f.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </span>
              <span className="flex flex-col">
                <span className="text-[15px] font-bold text-[var(--brand-ink)]">{f.name}</span>
                <span className="text-xs font-semibold uppercase tracking-wide text-[var(--brand-blue)]">
                  {f.role}
                </span>
              </span>
            </div>
            <p className="text-[15px] leading-relaxed text-[var(--color-muted-foreground)]">
              {f.bio}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------- testimonials */

const TESTIMONIALS = [
  {
    name: "Neeraj Malviya",
    role: "Meta Ads",
    body: "I built a real income from the skills I learned here, and the referral program paid for the course several times over.",
  },
  {
    name: "Priti Priyedarshni",
    role: "Digital Marketing",
    body: "Structured training, Q&A sessions and mentorship that actually answered my questions. I went from nothing to running campaigns.",
  },
  {
    name: "Navnish Sharma",
    role: "SEO",
    body: "Two years in an MNC on low pay with no balance. This helped me build skills and income that did not depend on one employer.",
  },
  {
    name: "Gautam Mali",
    role: "Google Ads",
    body: "SEO and Google Ads were the two that changed things for me. The lessons were specific enough that I could apply them the same week.",
  },
];

export function Testimonials() {
  return (
    <section className="border-y border-[var(--color-border)] bg-[var(--color-muted)]/40">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <SectionHead eyebrow="Students" title="What people said afterwards." />

        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {TESTIMONIALS.map((t) => (
            <figure
              key={t.name}
              className="flex flex-col gap-4 rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-6 shadow-[var(--shadow-card)]"
            >
              <Quote
                className="size-5 text-[var(--brand-blue)] opacity-40"
                strokeWidth={2}
                aria-hidden="true"
              />
              <blockquote className="text-[15px] leading-relaxed text-[var(--brand-ink)]">
                {t.body}
              </blockquote>
              <figcaption className="mt-auto flex items-center gap-2.5 border-t border-[var(--color-border)] pt-4">
                <span
                  aria-hidden="true"
                  className="flex size-8 shrink-0 items-center justify-center rounded-full text-[11px] font-bold text-white"
                  style={{ background: "var(--brand-gradient)" }}
                >
                  {t.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </span>
                <span className="flex flex-col">
                  <span className="text-[13px] font-bold text-[var(--brand-ink)]">{t.name}</span>
                  <span className="text-xs text-[var(--color-muted-foreground)]">{t.role}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
