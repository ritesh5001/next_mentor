import Link from "next/link";
import { ArrowRight, Check, PlayCircle, Quote, Star } from "lucide-react";

import { SectionHeading } from "./home-sections";
import { Faq } from "./faq";
import { Newsletter } from "./newsletter";
import { formatPrice } from "@/lib/format";
import { cn } from "@/lib/cn";

export { Faq, Newsletter };

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
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
      <SectionHeading
        lead="Take Your Skills To The"
        accent="Next level"
        subtitle="Unlock expertise with exclusive packages. Empower yourself with industry-leading courses."
        className="mb-10"
      />

      {plans.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-[var(--color-border)] px-6 py-14 text-center text-sm text-[var(--color-muted-foreground)]">
          Packages are being finalised. Meanwhile you can buy any course individually.
        </p>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {plans.map((p) => (
            <article
              key={p.slug}
              id={p.slug}
              className={cn(
                "relative flex flex-col gap-5 rounded-2xl border bg-[var(--color-card)] p-6",
                p.isFeatured
                  ? "border-[var(--brand-blue)] shadow-[var(--shadow-raised)]"
                  : "border-[var(--color-border)] shadow-[var(--shadow-card)]",
              )}
            >
              {p.isFeatured && (
                <span className="pill brand-gradient-bg absolute -top-3 left-6 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-white">
                  Best Seller
                </span>
              )}

              <header className="flex flex-col gap-1">
                <h3 className="text-xl font-extrabold uppercase tracking-wide text-[var(--brand-ink)]">
                  {p.name}
                </h3>
                {p.tagline && (
                  <p className="text-sm text-[var(--color-muted-foreground)]">{p.tagline}</p>
                )}
              </header>

              <div className="flex items-baseline gap-2">
                <span className="tabular text-3xl font-extrabold text-[var(--brand-ink)]">
                  {p.priceInPaise === 0 ? "Free" : formatPrice(p.priceInPaise)}
                </span>
                {p.mrpInPaise && p.mrpInPaise > p.priceInPaise && (
                  <span className="tabular text-base text-[var(--color-muted-foreground)] line-through">
                    {formatPrice(p.mrpInPaise)}
                  </span>
                )}
              </div>

              {p.features.length > 0 && (
                <ul className="flex flex-1 flex-col gap-2.5 text-sm">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <Check
                        className="mt-0.5 size-4 shrink-0 text-[var(--brand-green)]"
                        strokeWidth={2.5}
                        aria-hidden="true"
                      />
                      <span className="leading-relaxed">{f}</span>
                    </li>
                  ))}
                </ul>
              )}

              <Link
                href={`/dashboard/plan?select=${p.slug}`}
                className={cn(
                  "pill mt-auto inline-flex min-h-11 items-center justify-center gap-2 px-6 text-[15px] font-semibold transition-all duration-200 active:scale-[0.98]",
                  p.isFeatured
                    ? "brand-gradient-bg text-white hover:brightness-110"
                    : "border-2 border-[var(--color-border)] text-[var(--brand-ink)] hover:border-[var(--brand-blue)] hover:text-[var(--brand-blue)]",
                )}
              >
                Buy Now
                <ArrowRight className="size-4" strokeWidth={2} aria-hidden="true" />
              </Link>
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
    bio: "Saurabh started NextMentor to fix a simple problem: most online courses teach theory and leave you exactly where you started. Every track here ends in something you have built and can show. He has spent years in the digital space and has helped thousands of people turn a skill into an income.",
  },
  {
    name: "Aishwarya Sharma",
    role: "Co-Founder",
    bio: "Aishwarya leads curriculum and instruction. She built the practitioner-first teaching model NextMentor runs on: every instructor still does the work they teach, and every module is rebuilt when the tools change. Her focus is making sure what you learn on a Sunday still works on Monday.",
  },
];

export function Founders() {
  return (
    <section className="bg-[var(--color-muted)]/40">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <SectionHeading lead="Our" accent="Founders" className="mb-10" />

        <div className="grid gap-5 lg:grid-cols-2">
          {FOUNDERS.map((f) => (
            <article
              key={f.name}
              className="flex flex-col gap-4 rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-6 shadow-[var(--shadow-card)] sm:flex-row"
            >
              {/* Placeholder portrait — swap for a real photo in public/. */}
              <div
                aria-hidden="true"
                className="brand-gradient-bg flex size-24 shrink-0 items-center justify-center rounded-2xl text-2xl font-extrabold text-white"
              >
                {f.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>

              <div className="flex flex-col gap-2">
                <div>
                  <h3 className="text-lg font-bold text-[var(--brand-ink)]">{f.name}</h3>
                  <p className="text-sm font-semibold text-[var(--brand-blue)]">{f.role}</p>
                </div>
                <p className="text-sm leading-relaxed text-[var(--color-muted-foreground)]">
                  {f.bio}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------- instructors */

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

export function Instructors() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
      <SectionHeading lead="Instructors At" accent="NextMentor" className="mb-10" />

      <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {INSTRUCTORS.map((i) => (
          <li
            key={i.name}
            className="flex flex-col items-center gap-3 rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-5 text-center shadow-[var(--shadow-card)]"
          >
            <div
              aria-hidden="true"
              className="brand-gradient-bg flex size-16 items-center justify-center rounded-full text-lg font-extrabold text-white"
            >
              {i.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </div>
            <div>
              <h3 className="text-sm font-bold text-[var(--brand-ink)]">{i.name}</h3>
              <p className="text-xs text-[var(--brand-blue)]">{i.role}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

/* ------------------------------------------------------- featured training */

export function FeaturedTraining() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
      <div className="grid items-center gap-8 overflow-hidden rounded-3xl border border-[var(--color-border)] bg-[var(--color-card)] shadow-[var(--shadow-card)] lg:grid-cols-2">
        <div
          aria-hidden="true"
          className="brand-gradient-bg flex aspect-video items-center justify-center"
        >
          <PlayCircle className="size-20 text-white/90" strokeWidth={1} />
        </div>

        <div className="flex flex-col gap-4 p-6 sm:p-10">
          <h2 className="text-2xl font-bold tracking-tight text-[var(--brand-ink)] sm:text-3xl">
            Freelance <span className="brand-gradient-text">Training</span>
          </h2>
          <p className="text-sm font-semibold text-[var(--brand-green)]">
            Freelance Training Now Live!
          </p>
          <p className="text-sm leading-relaxed text-[var(--color-muted-foreground)]">
            Learn content creation, marketing, video editing and client acquisition from people
            who do it every day. Don&apos;t miss the chance to start earning from your skills.
          </p>
          <Link
            href="/courses"
            className="pill brand-gradient-bg inline-flex min-h-11 w-fit items-center gap-2 px-6 text-[15px] font-semibold text-white transition-[filter] hover:brightness-110"
          >
            View Course Details
            <ArrowRight className="size-4" strokeWidth={2} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------ testimonials */

const TESTIMONIALS = [
  {
    name: "Neeraj Malviya",
    role: "Business Coach",
    body: "Who says there is no scope in online work? I built a real income from the skills I learned here, and the referral program paid for the course several times over.",
  },
  {
    name: "Shivam Kashyap",
    role: "Class 12 Student",
    body: "Exceptional support and genuinely useful skills. NextMentor opened opportunities I did not think were available to someone still in school.",
  },
  {
    name: "Gautam Mali",
    role: "B.Com Student",
    body: "The biggest lesson: money is out there, you just need the right skills to earn it. SEO and Google Ads were the two that changed things for me.",
  },
  {
    name: "Narottam Sankhua",
    role: "Corporate Job Holder",
    body: "The digital marketing track was thorough and practical. The instructors clearly do this work, and the exercises made it stick.",
  },
  {
    name: "Priti Priyedarshni",
    role: "Homemaker",
    body: "From starting out to growing digitally — skill-based courses, structured training, Q&A sessions and real mentorship. It changed things for me.",
  },
  {
    name: "Navnish Sharma",
    role: "Engineer",
    body: "Two years in an MNC with low pay and no balance. NextMentor helped me build skills and find income that did not depend on one employer.",
  },
];

export function Testimonials() {
  return (
    <section className="bg-[var(--color-muted)]/40">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <SectionHeading lead="Words From Our" accent="Students" className="mb-10" />

        <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <li
              key={t.name}
              className="flex flex-col gap-4 rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-6 shadow-[var(--shadow-card)]"
            >
              <Quote
                className="size-6 text-[var(--brand-blue)] opacity-40"
                strokeWidth={1.5}
                aria-hidden="true"
              />
              <p className="flex-1 text-sm leading-relaxed text-[var(--color-foreground)]">
                {t.body}
              </p>

              <div className="flex items-center gap-3 border-t border-[var(--color-border)] pt-4">
                <div
                  aria-hidden="true"
                  className="brand-gradient-bg flex size-10 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white"
                >
                  {t.name[0]}
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-bold text-[var(--brand-ink)]">{t.name}</p>
                  <p className="truncate text-xs text-[var(--color-muted-foreground)]">{t.role}</p>
                </div>
                <div className="ml-auto flex gap-0.5" aria-label="5 out of 5 stars">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className="size-3 fill-[var(--color-warning)] text-[var(--color-warning)]"
                      aria-hidden="true"
                    />
                  ))}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------ skills cloud */

const SKILLS = [
  "Meta Ads", "Google Ads", "SEO", "Blogging", "Web Development", "UI/UX Design",
  "Video Editing", "Mobile Editing", "Graphic Design", "AI Automation", "Funnel Building",
  "Landing Pages", "Email Marketing", "Copywriting", "Influencer Marketing", "Lead Generation",
  "Freelancing", "Personal Branding", "Sales & Closing", "Content Creation", "Analytics",
  "E-Commerce", "Domain & Hosting", "WordPress",
];

export function SkillsCloud() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-20">
      <SectionHeading lead="Explore New" accent="Digital Skills" className="mb-10" />

      <ul className="flex flex-wrap justify-center gap-2.5">
        {SKILLS.map((s) => (
          <li key={s}>
            <Link
              href="/courses"
              className="pill inline-flex min-h-10 items-center border border-[var(--color-border)] bg-[var(--color-card)] px-4 text-sm font-medium text-[var(--color-foreground)] transition-colors hover:border-[var(--brand-blue)] hover:text-[var(--brand-blue)]"
            >
              {s}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
