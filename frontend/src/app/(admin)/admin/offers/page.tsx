import type { Metadata } from "next";
import Link from "next/link";
import { BarChart3, CalendarClock, Trophy } from "lucide-react";

import { OfferControls, OfferForm } from "@/components/admin/offer-form";
import { Badge } from "@/components/ui/badge";
import { formatDate, formatPrice } from "@/lib/format";
import { listOffersForAdmin, requireAdmin, type AdminOffer } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Offers",
  robots: { index: false, follow: false },
};

const METRIC_LABEL = {
  referrals: "new members",
  sales: "sales",
  earnings: "commission",
} as const;

/** Targets read back in the units they were typed in. */
function describe(c: AdminOffer["criteria"][number]) {
  return c.metric === "earnings"
    ? `${formatPrice(c.target)} ${METRIC_LABEL.earnings}`
    : `${c.target} ${METRIC_LABEL[c.metric]}`;
}

/**
 * Release an offer, and see who is winning it.
 *
 * An offer is a promise of a prize, so it starts as a draft: nothing reaches
 * members until it is explicitly released, and it can be withdrawn without
 * being deleted.
 */
export default async function AdminOffersPage() {
  await requireAdmin();
  const offers = await listOffersForAdmin();
  const live = offers.filter((o) => o.isPublished).length;

  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold tracking-tight">Offers</h1>
        <p className="text-sm text-[var(--color-muted-foreground)]">
          {offers.length} offer{offers.length === 1 ? "" : "s"} · {live} live. Members see their own
          live progress towards every released offer.
        </p>
      </header>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,420px)_1fr]">
        <section className="h-fit rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-card)] p-5">
          <h2 className="mb-4 text-lg font-bold tracking-tight">New offer</h2>
          <OfferForm />
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="text-lg font-bold tracking-tight">All offers</h2>

          {offers.length === 0 ? (
            <p className="rounded-[var(--radius-card)] border border-dashed border-[var(--color-border)] px-6 py-12 text-center text-sm text-[var(--color-muted-foreground)]">
              No offers yet. Create one on the left — it stays a draft until you release it.
            </p>
          ) : (
            <ul className="flex flex-col gap-4">
              {offers.map((offer) => (
                <li
                  key={offer.id}
                  className="flex flex-col gap-4 rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-card)] p-5"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-[17px] font-bold tracking-tight">{offer.title}</h3>
                        <Badge tone={offer.isPublished ? "success" : "neutral"}>
                          {offer.isPublished ? "Live" : "Draft"}
                        </Badge>
                      </div>
                      <p className="mt-1 flex items-center gap-1.5 text-sm text-[var(--color-muted-foreground)]">
                        <Trophy className="size-3.5" strokeWidth={1.8} aria-hidden="true" />
                        {offer.reward}
                      </p>
                      {offer.description && (
                        <p className="mt-1 text-[13px] text-[var(--color-muted-foreground)]">
                          {offer.description}
                        </p>
                      )}
                    </div>

                    <Link
                      href={`/admin/offers/${offer.id}`}
                      className="inline-flex min-h-10 shrink-0 items-center gap-1.5 rounded-[var(--radius-control)] border border-[var(--color-border)] px-3 text-sm font-semibold hover:bg-[var(--color-muted)]"
                    >
                      <BarChart3 className="size-4" strokeWidth={1.8} aria-hidden="true" />
                      Standings
                    </Link>
                  </div>

                  <ul className="flex flex-wrap gap-2">
                    {offer.criteria.map((c, i) => (
                      <li
                        key={i}
                        className="rounded-full bg-[var(--brand-hero-wash)] px-3 py-1 text-[12.5px] font-medium text-[var(--brand-ink)]"
                      >
                        {describe(c)}
                      </li>
                    ))}
                  </ul>

                  <p className="flex items-center gap-1.5 text-xs text-[var(--color-muted-foreground)]">
                    <CalendarClock className="size-3.5" strokeWidth={1.8} aria-hidden="true" />
                    {formatDate(offer.startsAt, { day: "numeric", month: "short", year: "numeric" })}
                    {offer.endsAt
                      ? ` → ${formatDate(offer.endsAt, { day: "numeric", month: "short", year: "numeric" })}`
                      : " → no closing date"}
                  </p>

                  <OfferControls offer={offer} />
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}
