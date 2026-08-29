import type { Metadata } from "next";
import { CheckCircle2 } from "lucide-react";

import { requireUser } from "@/backend/lib/permissions";
import { getActivePlans, getActiveSubscription } from "@/backend/services/plans";
import {
  createCheckoutAction,
  previewCouponAction,
  pollOwnershipAction,
} from "@/backend/actions/checkout";
import { PlanCard } from "@/frontend/components/marketing/plan-card";
import { BuyButton } from "@/frontend/components/marketing/buy-button";
import { Badge } from "@/frontend/components/ui/badge";

export const metadata: Metadata = {
  title: "Upgrade your plan",
  robots: { index: false, follow: false },
};

export default async function PlanPage() {
  const user = await requireUser();
  const [plans, current] = await Promise.all([
    getActivePlans(),
    getActiveSubscription(user.id),
  ]);

  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-col gap-1">
        <h1 className="text-2xl font-extrabold tracking-tight">Upgrade your plan</h1>
        <p className="text-sm text-[var(--color-muted-foreground)]">
          A higher tier unlocks more of the catalog and raises your commission rate.
        </p>
      </header>

      {current && (
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-[var(--radius-card)] border border-[var(--color-primary)] bg-[var(--color-primary-subtle)] px-4 py-3">
          <span className="flex items-center gap-2 text-sm font-semibold">
            <CheckCircle2
              className="size-4 text-[var(--color-primary)]"
              strokeWidth={1.5}
              aria-hidden="true"
            />
            You are on {current.planName}
          </span>
          <span className="text-xs text-[var(--color-muted-foreground)]">
            {current.expiresAt
              ? `Renews or expires ${current.expiresAt.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}`
              : "Lifetime access"}
          </span>
        </div>
      )}

      {plans.length === 0 ? (
        <p className="rounded-[var(--radius-card)] border border-dashed border-[var(--color-border)] px-6 py-12 text-center text-sm text-[var(--color-muted-foreground)]">
          No plans are available right now.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {plans.map((plan) => {
            const isCurrent = current?.planId === plan.id;

            return (
              <PlanCard key={plan.id} plan={plan}>
                {isCurrent ? (
                  <Badge tone="success" className="w-full justify-center py-2">
                    Your current plan
                  </Badge>
                ) : (
                  <BuyButton
                    itemType="plan"
                    slug={plan.slug}
                    priceInPaise={plan.priceInPaise}
                    razorpayKeyId={process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID ?? ""}
                    successPath="/dashboard/plan"
                    createCheckout={createCheckoutAction}
                    previewCoupon={previewCouponAction}
                    pollOwnership={pollOwnershipAction}
                  />
                )}
              </PlanCard>
            );
          })}
        </div>
      )}
    </div>
  );
}
