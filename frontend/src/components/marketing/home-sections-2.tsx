import Link from "next/link";
import { Check } from "lucide-react";

import { SectionHead } from "./home-sections";
import { CtaButton } from "./cta-button";
import { Faq } from "./faq";
import { formatPrice } from "@/lib/format";
import { cn } from "@/lib/cn";

export { Faq };

/**
 * Second half of the homepage.
 *
 * Three sections were removed rather than restyled. A skills word-cloud, a
 * "featured training" band and a generic four-benefit strip were all saying
 * what other sections already said, and length is not the same thing as
 * substance. What is left is the plans and the FAQ.
 */

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

