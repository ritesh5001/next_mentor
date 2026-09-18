import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Check, CheckCircle2 } from "lucide-react";

import { BuyButton } from "@/components/marketing/buy-button";
import { PackBox } from "@/components/marketing/pack-box";
import { SignOutButton } from "@/components/dashboard/sign-out-button";
import { cn } from "@/lib/cn";
import { discountPercent, formatPrice } from "@/lib/format";
import { PACKS } from "@/lib/packages";
import { getActivePlans, getActiveSubscription, requireUser } from "@/lib/queries";
import { createCheckoutAction, pollOwnershipAction, previewCouponAction } from "@/actions";

export const metadata: Metadata = {
  title: "Choose your plan",
  robots: { index: false, follow: false },
};

const STEPS = ["Create account", "Verify email", "Choose plan"];

/**
 * Step 3 of signup, and the only page a student without a plan can use.
 *
 * Membership is paid, so a verified account lands here until a plan is
 * bought; the dashboard and the player both redirect back while it has none.
 * `?plan=` preselects a pack and opens its checkout straight away — that is
 * how a signed-out "Buy Now" on the homepage resumes after signup.
 */
export default async function ChoosePlanPage({
  searchParams,
}: {
  searchParams: Promise<{ plan?: string }>;
}) {
  const user = await requireUser();
  if (user.role === "admin") redirect("/admin");

  const [{ plan: wanted }, subscription, plans] = await Promise.all([
    searchParams,
    getActiveSubscription(),
    getActivePlans(),
  ]);
  if (subscription) redirect("/dashboard");

  const cards = PACKS.map((pack) => ({ pack, plan: plans.find((p) => p.slug === pack.slug) }));

  return (
    <div className="bg-[var(--brand-hero-wash)]">
      <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-16">
        {/* Progress */}
        <ol className="mx-auto flex max-w-xl items-center justify-center gap-2 sm:gap-3" aria-label="Signup progress">
          {STEPS.map((label, i) => {
            const done = i < 2;
            return (
              <li key={label} className="flex items-center gap-2 sm:gap-3">
                <span className="flex items-center gap-2">
                  <span
                    className={cn(
                      "flex size-7 items-center justify-center rounded-full text-[12px] font-semibold",
                      done
                        ? "bg-[var(--brand-green)] text-white"
                        : "bg-[var(--brand-blue)] text-white ring-4 ring-[var(--brand-blue)]/15",
                    )}
                  >
                    {done ? <Check className="size-3.5" strokeWidth={3} aria-hidden="true" /> : i + 1}
                  </span>
                  <span
                    className={cn(
                      "hidden text-[13px] font-medium sm:inline",
                      done ? "text-[var(--brand-ink)]/60" : "text-[var(--brand-ink)]",
                    )}
                  >
                    {label}
                    {done && <span className="sr-only"> (done)</span>}
                  </span>
                </span>
                {i < STEPS.length - 1 && (
                  <span aria-hidden="true" className="h-px w-8 bg-[rgb(16_26_71/0.15)] sm:w-12" />
                )}
              </li>
            );
          })}
        </ol>

        <header className="mx-auto mt-10 max-w-2xl text-center">
          <h1 className="text-balance text-[32px] font-bold leading-[1.1] tracking-[-1px] text-[var(--brand-ink)] sm:text-[42px]">
            Choose your plan to get started
          </h1>
          <p className="mt-4 text-pretty text-[15px] leading-[1.6] text-[var(--color-muted-foreground)] sm:text-base">
            Your account is ready. Pay once for a plan to unlock your dashboard, your courses and
            your referral link.
          </p>
        </header>

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {cards.map(({ pack, plan }, i) => {
            const featured = i === cards.length - 1;
            const off = plan ? discountPercent(plan.priceInPaise, plan.mrpInPaise) : null;
            const preselected = wanted === pack.slug;
            return (
              <article
                key={pack.slug}
                className={cn(
                  "relative flex flex-col rounded-[24px] bg-white p-6 sm:p-7",
                  preselected || featured
                    ? "ring-2 ring-[var(--brand-blue)] shadow-[0_28px_60px_-32px_rgb(27_63_160/0.5)]"
                    : "ring-1 ring-[rgb(16_26_71/0.08)]",
                )}
              >
                {featured && (
                  <span className="pill absolute right-5 top-5 bg-[var(--brand-blue)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-white">
                    Best value
                  </span>
                )}
                <div className="flex items-center gap-4">
                  <PackBox label={pack.boxLabel} band={pack.boxBand} width={58} />
                  <div>
                    <h2 className="text-[22px] font-semibold tracking-[-0.4px] text-[var(--brand-ink)]">
                      {pack.name}
                    </h2>
                    <p className="text-[13px] text-[var(--color-muted-foreground)]">
                      {pack.courses.length} {pack.courses.length === 1 ? "course" : "courses"}
                    </p>
                  </div>
                </div>

                <p className="mt-5 text-[14.5px] leading-[1.55] text-[var(--brand-ink)]/75">{pack.tagline}</p>

                <p className="mt-5 flex flex-wrap items-baseline gap-2.5">
                  <span className="tabular text-[34px] font-semibold leading-none tracking-[-1px] text-[var(--brand-ink)]">
                    {formatPrice(plan?.priceInPaise ?? pack.fallbackPriceInPaise)}
                  </span>
                  {off !== null && plan?.mrpInPaise && (
                    <>
                      <span className="tabular text-[14px] text-[var(--color-muted-foreground)] line-through">
                        {formatPrice(plan.mrpInPaise)}
                      </span>
                      <span className="pill bg-[var(--color-success-subtle)] px-2 py-0.5 text-[12px] font-semibold text-[var(--color-success)]">
                        {off}% off
                      </span>
                    </>
                  )}
                </p>

                <ul className="mt-6 flex flex-1 flex-col gap-2.5 border-t border-[rgb(16_26_71/0.08)] pt-6">
                  {pack.courses.map((c) => (
                    <li key={c.title} className="flex gap-3 text-[14.5px] text-[var(--brand-ink)]/85">
                      <CheckCircle2
                        className="mt-0.5 size-4 shrink-0 text-[var(--brand-green)]"
                        strokeWidth={2}
                        aria-hidden="true"
                      />
                      {c.title}
                    </li>
                  ))}
                </ul>

                <div className="mt-7">
                  {plan ? (
                    <BuyButton
                      itemType="plan"
                      slug={plan.slug}
                      priceInPaise={plan.priceInPaise}
                      razorpayKeyId={process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID ?? ""}
                      successPath="/dashboard"
                      autoStart={preselected}
                      createCheckout={createCheckoutAction}
                      previewCoupon={previewCouponAction}
                      pollOwnership={pollOwnershipAction}
                    />
                  ) : (
                    <p className="rounded-[14px] bg-[var(--brand-hero-wash)] px-4 py-3 text-center text-[14px] text-[var(--color-muted-foreground)]">
                      Not available right now.
                    </p>
                  )}
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-10 flex flex-col items-center gap-2 text-center text-[13.5px] text-[var(--color-muted-foreground)]">
          <p>
            Signed in as <strong className="font-semibold text-[var(--brand-ink)]">{user.email}</strong>
          </p>
          <SignOutButton />
        </div>
      </div>
    </div>
  );
}
