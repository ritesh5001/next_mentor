import type { Metadata } from "next";
import { Ticket } from "lucide-react";

import { requireUser } from "@/backend/lib/permissions";
import { listVisibleCoupons } from "@/backend/services/coupons";
import { CouponCode } from "@/frontend/components/dashboard/coupon-code";
import { Badge } from "@/frontend/components/ui/badge";
import { formatPrice } from "@/frontend/lib/format";

export const metadata: Metadata = {
  title: "Exclusive coupons",
  robots: { index: false, follow: false },
};

export default async function CouponsPage() {
  const user = await requireUser();
  const coupons = await listVisibleCoupons(user.id);

  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-col gap-1">
        <h1 className="text-2xl font-extrabold tracking-tight">Exclusive coupons</h1>
        <p className="text-sm text-[var(--color-muted-foreground)]">
          Apply these at checkout on any course or plan.
        </p>
      </header>

      {coupons.length === 0 ? (
        <div className="flex flex-col items-center gap-3 rounded-[var(--radius-card)] border border-dashed border-[var(--color-border)] bg-[var(--color-card)] px-6 py-16 text-center">
          <Ticket
            className="size-8 text-[var(--color-muted-foreground)]"
            strokeWidth={1.5}
            aria-hidden="true"
          />
          <h2 className="text-lg font-bold">No coupons right now</h2>
          <p className="max-w-sm text-sm text-[var(--color-muted-foreground)]">
            Offers appear here when they are running. Check back around launches.
          </p>
        </div>
      ) : (
        <ul className="stagger-in grid grid-cols-1 gap-4 sm:grid-cols-2">
          {coupons.map((c) => (
            <li
              key={c.id}
              className="flex flex-col gap-3 rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-card)] p-4"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex flex-col gap-0.5">
                  {/* Amber: this is money off. */}
                  <span className="tabular text-2xl font-extrabold text-[var(--color-accent)]">
                    {c.discountType === "percent"
                      ? `${c.value / 100}% off`
                      : `${formatPrice(c.value)} off`}
                  </span>
                  {c.description && (
                    <span className="text-sm text-[var(--color-muted-foreground)]">
                      {c.description}
                    </span>
                  )}
                </div>
                {c.isUsedUp && <Badge tone="neutral">Used</Badge>}
              </div>

              <CouponCode code={c.code} disabled={c.isUsedUp} />

              <dl className="flex flex-col gap-1 text-xs text-[var(--color-muted-foreground)]">
                {c.minOrderInPaise > 0 && (
                  <div className="flex gap-1">
                    <dt>Minimum order:</dt>
                    <dd className="tabular font-medium">{formatPrice(c.minOrderInPaise)}</dd>
                  </div>
                )}
                {c.maxDiscountInPaise && (
                  <div className="flex gap-1">
                    <dt>Capped at:</dt>
                    <dd className="tabular font-medium">{formatPrice(c.maxDiscountInPaise)}</dd>
                  </div>
                )}
                {c.validUntil && (
                  <div className="flex gap-1">
                    <dt>Expires:</dt>
                    <dd className="font-medium">
                      {c.validUntil.toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </dd>
                  </div>
                )}
              </dl>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
