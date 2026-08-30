import { Check, Sparkles } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { formatPrice, discountPercent } from "@/lib/format";
import { cn } from "@/lib/cn";

export type PlanCardData = {
  id: string;
  slug: string;
  name: string;
  tagline: string | null;
  priceInPaise: number;
  mrpInPaise: number | null;
  durationDays: number | null;
  features: string[];
  commissionRateBps: number;
  isFeatured: boolean;
};

function periodLabel(durationDays: number | null): string {
  if (!durationDays) return "one-time · lifetime";
  if (durationDays % 365 === 0) {
    const y = durationDays / 365;
    return y === 1 ? "per year" : `per ${y} years`;
  }
  if (durationDays % 30 === 0) {
    const m = durationDays / 30;
    return m === 1 ? "per month" : `per ${m} months`;
  }
  return `per ${durationDays} days`;
}

export function PlanCard({
  plan,
  children,
}: {
  plan: PlanCardData;
  /** The CTA — differs between the public pricing page and the dashboard. */
  children?: React.ReactNode;
}) {
  const off = discountPercent(plan.priceInPaise, plan.mrpInPaise);

  return (
    <article
      className={cn(
        "relative flex flex-col gap-5 rounded-[var(--radius-card)] border bg-[var(--color-card)] p-6",
        plan.isFeatured
          ? "border-[var(--color-primary)] shadow-[var(--shadow-raised)]"
          : "border-[var(--color-border)] shadow-[var(--shadow-card)]",
      )}
    >
      {plan.isFeatured && (
        <div className="absolute -top-3 left-6">
          <Badge tone="primary" className="shadow-[var(--shadow-card)]">
            <Sparkles className="size-3" strokeWidth={2} aria-hidden="true" />
            Most popular
          </Badge>
        </div>
      )}

      <header className="flex flex-col gap-1.5">
        <h3 className="text-lg font-extrabold tracking-tight">{plan.name}</h3>
        {plan.tagline && (
          <p className="text-sm leading-relaxed text-[var(--color-muted-foreground)]">
            {plan.tagline}
          </p>
        )}
      </header>

      <div className="flex flex-col gap-1">
        <div className="flex items-baseline gap-2">
          <span className="tabular text-3xl font-extrabold">
            {plan.priceInPaise === 0 ? "Free" : formatPrice(plan.priceInPaise)}
          </span>
          {off !== null && plan.mrpInPaise && (
            <span className="tabular text-base text-[var(--color-muted-foreground)] line-through">
              {formatPrice(plan.mrpInPaise)}
            </span>
          )}
        </div>
        <span className="text-xs text-[var(--color-muted-foreground)]">
          {periodLabel(plan.durationDays)}
        </span>
      </div>

      {plan.commissionRateBps > 0 && (
        // Amber: this is earnings, and earnings is the one thing amber marks.
        <div className="rounded-[var(--radius-control)] bg-[var(--color-accent-subtle)] px-3 py-2 text-sm font-semibold text-[var(--color-accent)]">
          Earn {plan.commissionRateBps / 100}% commission on referrals
        </div>
      )}

      {plan.features.length > 0 && (
        <ul className="flex flex-1 flex-col gap-2 text-sm">
          {plan.features.map((f) => (
            <li key={f} className="flex items-start gap-2">
              <Check
                className="mt-0.5 size-4 shrink-0 text-[var(--color-success)]"
                strokeWidth={2}
                aria-hidden="true"
              />
              <span className="leading-relaxed">{f}</span>
            </li>
          ))}
        </ul>
      )}

      {children && <div className="mt-auto pt-1">{children}</div>}
    </article>
  );
}
