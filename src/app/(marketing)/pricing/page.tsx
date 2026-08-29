import type { Metadata } from "next";
import Link from "next/link";

import { getActivePlans } from "@/backend/services/plans";
import { getSessionUser } from "@/backend/lib/permissions";
import { PlanCard } from "@/frontend/components/marketing/plan-card";
import { buttonClasses } from "@/frontend/components/ui/button";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Membership plans for NextMentor — unlock the full catalog and earn commission on every person you bring in.",
  alternates: { canonical: "/pricing" },
};

export default async function PricingPage() {
  const [plans, user] = await Promise.all([getActivePlans(), getSessionUser()]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-20">
      <header className="mx-auto mb-12 flex max-w-2xl flex-col items-center gap-3 text-center">
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
          Pick your plan
        </h1>
        <p className="text-lg leading-relaxed text-[var(--color-muted-foreground)]">
          Unlock the catalog, and earn a share of every enrolment you refer.
        </p>
      </header>

      {plans.length === 0 ? (
        <div className="mx-auto max-w-md rounded-[var(--radius-card)] border border-dashed border-[var(--color-border)] px-6 py-16 text-center">
          <h2 className="text-lg font-bold">Plans are on the way</h2>
          <p className="mt-2 text-sm text-[var(--color-muted-foreground)]">
            In the meantime you can buy any course individually.
          </p>
          <Link href="/courses" className={buttonClasses({ className: "mt-4" })}>
            Browse courses
          </Link>
        </div>
      ) : (
        <div className="stagger-in grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {plans.map((plan) => (
            <PlanCard key={plan.id} plan={plan}>
              <Link
                href={user ? `/dashboard/plan?select=${plan.slug}` : "/register"}
                className={buttonClasses({
                  variant: plan.isFeatured ? "primary" : "secondary",
                  size: "lg",
                  className: "w-full",
                })}
              >
                {user ? "Choose this plan" : "Get started"}
              </Link>
            </PlanCard>
          ))}
        </div>
      )}

      <p className="mt-10 text-center text-sm text-[var(--color-muted-foreground)]">
        Prefer a single course?{" "}
        <Link href="/courses" className="font-semibold text-[var(--color-primary)] hover:underline">
          Browse the catalog
        </Link>
      </p>
    </div>
  );
}
