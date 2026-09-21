import type { Metadata } from "next";
import { ArrowUpRight, Check, CheckCircle2, Lock } from "lucide-react";

import { BuyButton } from "@/components/marketing/buy-button";
import { PackBox } from "@/components/marketing/pack-box";
import { PageHeader } from "@/components/dashboard/panels";
import { UpgradeCountdown } from "@/components/dashboard/upgrade-countdown";
import { cn } from "@/lib/cn";
import { formatDate, formatPrice } from "@/lib/format";
import { getPack } from "@/lib/packages";
import { getActivePlans, getActiveSubscription, getPlanQuotes } from "@/lib/queries";
import { createCheckoutAction, pollOwnershipAction, previewCouponAction } from "@/actions";

export const metadata: Metadata = {
  title: "Upgrade your package",
  robots: { index: false, follow: false },
};

/**
 * Packages, priced for this member.
 *
 * Packs are a cumulative ladder, so only higher tiers are buyable: the API
 * quotes each one (services/plans#quoteForPlan) and, inside the 72-hour
 * window, an upgrade costs only the difference. Every price shown here comes
 * from that quote — none of it is worked out in the browser.
 */
export default async function PlanPage() {
  const [plans, current, quotes] = await Promise.all([
    getActivePlans(),
    getActiveSubscription(),
    getPlanQuotes(),
  ]);

  const quoteFor = (slug: string) => quotes.quotes.find((q) => q.slug === slug)?.quote;
  const ordered = [...plans].sort((a, b) => a.tier - b.tier);
  const upgradeWindow = quotes.quotes
    .map((q) => (q.quote.kind === "upgrade" && q.quote.discounted ? q.quote.windowEndsAt : null))
    .find(Boolean);

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Your package"
        subtitle="Each package includes everything in the ones below it. Move up any time."
        aside={upgradeWindow ? <UpgradeCountdown windowEndsAt={upgradeWindow} /> : undefined}
      />

      {current && (
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-[18px] bg-[linear-gradient(135deg,#0e5a40,#0b4a34)] px-5 py-4 text-white">
          <span className="flex items-center gap-2.5 text-[15px] font-semibold">
            <CheckCircle2 className="size-5 text-[var(--brand-green-bright)]" strokeWidth={2} aria-hidden="true" />
            You are on {current.planName}
          </span>
          <span className="text-[13px] text-white/75">
            {current.expiresAt
              ? `Renews or expires ${formatDate(current.expiresAt, { day: "numeric", month: "short", year: "numeric" })}`
              : "Lifetime access"}
          </span>
        </div>
      )}

      {upgradeWindow && (
        <p className="rounded-[14px] bg-[#fff4e5] px-4 py-3 text-[14px] text-[#92400e]">
          For the first 72 hours after joining, you upgrade by paying only the difference between
          your package and the new one. After that, an upgrade costs the full package price.
        </p>
      )}

      <div className="grid gap-5 lg:grid-cols-3">
        {ordered.map((plan) => {
          const quote = quoteFor(plan.slug);
          const pack = getPack(plan.slug);
          const blocked = quote?.kind === "blocked";
          const isCurrent = current?.planSlug === plan.slug;
          const payable = quote && quote.kind !== "blocked" ? quote.amountInPaise : plan.priceInPaise;
          const saving = quote?.kind === "upgrade" && quote.discounted ? plan.priceInPaise - quote.amountInPaise : 0;

          return (
            <article
              key={plan.slug}
              className={cn(
                "flex flex-col rounded-[24px] bg-white p-6 sm:p-7",
                isCurrent
                  ? "ring-2 ring-[var(--brand-green)]"
                  : blocked
                    ? "opacity-70 ring-1 ring-[rgb(16_26_71/0.08)]"
                    : "ring-1 ring-[rgb(16_26_71/0.08)] shadow-[0_18px_40px_-32px_rgb(16_26_71/0.45)]",
              )}
            >
              <div className="flex items-center gap-4">
                {pack && <PackBox label={pack.boxLabel} band={pack.boxBand} width={54} />}
                <div>
                  <h2 className="text-[20px] font-semibold tracking-[-0.3px] text-[var(--brand-ink)]">
                    {plan.name}
                  </h2>
                  <p className="text-[12.5px] text-[var(--color-muted-foreground)]">
                    Pack {plan.tier} · {plan.commissionRateBps / 100}% commission
                  </p>
                </div>
              </div>

              <div className="mt-5">
                <p className="flex flex-wrap items-baseline gap-2">
                  <span className="tabular text-[30px] font-semibold leading-none tracking-[-0.8px] text-[var(--brand-ink)]">
                    {formatPrice(payable)}
                  </span>
                  {saving > 0 && (
                    <>
                      <span className="tabular text-[14px] text-[var(--color-muted-foreground)] line-through">
                        {formatPrice(plan.priceInPaise)}
                      </span>
                      <span className="pill bg-[#e5f2e3] px-2 py-0.5 text-[12px] font-semibold text-[#0b4a34]">
                        Save {formatPrice(saving)}
                      </span>
                    </>
                  )}
                </p>
                {saving > 0 && (
                  <p className="mt-1.5 text-[12.5px] text-[#b45309]">
                    Upgrade price — you only pay the difference.
                  </p>
                )}
              </div>

              {pack && (
                <ul className="mt-5 flex flex-1 flex-col gap-2 border-t border-[rgb(16_26_71/0.07)] pt-5">
                  {ordered
                    .filter((p) => p.tier <= plan.tier)
                    .flatMap((p) => getPack(p.slug)?.courses ?? [])
                    .map((c) => (
                      <li key={c.title} className="flex gap-2.5 text-[14px] text-[var(--brand-ink)]/85">
                        <Check className="mt-0.5 size-4 shrink-0 text-[var(--brand-green)]" strokeWidth={2.4} aria-hidden="true" />
                        {c.title}
                      </li>
                    ))}
                </ul>
              )}

              <div className="mt-6">
                {isCurrent ? (
                  <p className="flex min-h-12 items-center justify-center rounded-[14px] bg-[#e5f2e3] text-[14px] font-semibold text-[#0b4a34]">
                    Your current package
                  </p>
                ) : blocked ? (
                  <p className="flex min-h-12 items-center justify-center gap-2 rounded-[14px] bg-[var(--brand-hero-wash)] px-4 text-center text-[13.5px] text-[var(--color-muted-foreground)]">
                    <Lock className="size-4 shrink-0" strokeWidth={1.8} aria-hidden="true" />
                    Included in your package
                  </p>
                ) : (
                  <BuyButton
                    itemType="plan"
                    slug={plan.slug}
                    priceInPaise={payable}
                    razorpayKeyId={process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID ?? ""}
                    successPath="/dashboard"
                    allowCoupon={false}
                    createCheckout={createCheckoutAction}
                    previewCoupon={previewCouponAction}
                    pollOwnership={pollOwnershipAction}
                  />
                )}
              </div>
            </article>
          );
        })}
      </div>

      <p className="flex items-center gap-1.5 text-[13.5px] text-[var(--color-muted-foreground)]">
        <ArrowUpRight className="size-4" strokeWidth={2} aria-hidden="true" />
        Upgrading keeps everything you already have and adds the new package&apos;s courses.
      </p>
    </div>
  );
}
