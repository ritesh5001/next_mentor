import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Trophy } from "lucide-react";

import { OfferForm } from "@/components/admin/offer-form";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/format";
import { getOfferStandings, requireAdmin } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Offer standings",
  robots: { index: false, follow: false },
};

/** Who is closest to winning, worked out from the ledger on every load. */
export default async function AdminOfferPage({
  params,
}: {
  params: Promise<{ offerId: string }>;
}) {
  await requireAdmin();
  const { offerId } = await params;
  const data = await getOfferStandings(offerId);
  if (!data) notFound();

  const { offer, members } = data;
  const qualified = members.filter((m) => m.qualified);

  return (
    <div className="flex flex-col gap-6">
      <Link
        href="/admin/offers"
        className="inline-flex w-fit items-center gap-1.5 text-sm font-medium text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)]"
      >
        <ArrowLeft className="size-4" strokeWidth={1.8} aria-hidden="true" />
        All offers
      </Link>

      <header className="flex flex-wrap items-end justify-between gap-3">
        <div className="flex flex-col gap-1">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight">{offer.title}</h1>
            <Badge tone={offer.isPublished ? "success" : "neutral"}>
              {offer.isPublished ? "Live" : "Draft"}
            </Badge>
          </div>
          <p className="flex items-center gap-1.5 text-sm text-[var(--color-muted-foreground)]">
            <Trophy className="size-3.5" strokeWidth={1.8} aria-hidden="true" />
            {offer.reward}
          </p>
        </div>
        <div className="rounded-[var(--radius-card)] bg-[var(--color-success-subtle)] px-4 py-2">
          <span className="text-xs font-semibold uppercase tracking-wide text-[var(--color-success)]">
            Qualified
          </span>
          <div className="tabular text-xl font-bold text-[var(--color-success)]">
            {qualified.length}
          </div>
        </div>
      </header>

      <section className="flex flex-col gap-3">
        <h2 className="text-lg font-bold tracking-tight">Standings</h2>
        {members.length === 0 ? (
          <p className="rounded-[var(--radius-card)] border border-dashed border-[var(--color-border)] px-6 py-12 text-center text-sm text-[var(--color-muted-foreground)]">
            Nobody has made progress on this offer yet.
          </p>
        ) : (
          <ul className="flex flex-col divide-y divide-[var(--color-border)] rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-card)]">
            {members.map((m, i) => (
              <li key={m.id} className="flex flex-wrap items-center gap-4 px-5 py-4">
                <span className="tabular w-6 shrink-0 text-sm font-bold text-[var(--color-muted-foreground)]">
                  {i + 1}
                </span>
                <div className="flex min-w-[12rem] flex-1 flex-col">
                  <Link
                    href={`/admin/earnings/${m.id}`}
                    className="font-semibold hover:underline"
                  >
                    {m.name ?? m.email}{" "}
                    <span className="font-mono text-[12px] font-normal text-[var(--color-muted-foreground)]">
                      {m.memberId}
                    </span>
                  </Link>
                  <span className="text-[12.5px] text-[var(--color-muted-foreground)]">
                    {m.criteria
                      .map((c) =>
                        c.metric === "earnings"
                          ? `${formatPrice(c.current)} / ${formatPrice(c.target)}`
                          : `${c.current} / ${c.target}`,
                      )
                      .join(" · ")}
                  </span>
                </div>
                <div className="flex w-40 shrink-0 items-center gap-2">
                  <div className="h-2 flex-1 overflow-hidden rounded-full bg-[var(--color-muted)]">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${m.percent}%`,
                        background: m.qualified
                          ? "linear-gradient(90deg,#12a150,#3ddc72)"
                          : "linear-gradient(90deg,#1b3fa0,#3b82f6)",
                      }}
                    />
                  </div>
                  <span className="tabular w-10 text-right text-sm font-bold">{m.percent}%</span>
                </div>
                {m.qualified && <Badge tone="success">Qualified</Badge>}
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="max-w-xl rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-card)] p-5">
        <h2 className="mb-4 text-lg font-bold tracking-tight">Edit this offer</h2>
        <OfferForm offer={offer} />
      </section>
    </div>
  );
}
