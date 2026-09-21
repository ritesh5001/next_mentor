import type { Metadata } from "next";
import { CalendarClock, CheckCircle2, Gift, Trophy } from "lucide-react";

import { LiveRefresh } from "@/components/dashboard/live-refresh";
import { PageHeader } from "@/components/dashboard/panels";
import { formatDate, formatPrice } from "@/lib/format";
import { getMyOffers, type OfferProgress } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Offers & rewards",
  robots: { index: false, follow: false },
};

/** Counts are counts; the earnings target is stored in paise like all money. */
const value = (metric: OfferProgress["criteria"][number]["metric"], n: number) =>
  metric === "earnings" ? formatPrice(n) : String(n);

/**
 * What is on offer, and exactly how far this member has got.
 *
 * A target nobody can measure is a target nobody chases, so every criterion
 * shows its own bar and its own numbers rather than one opaque percentage.
 */
export default async function OffersPage() {
  const offers = await getMyOffers();

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Offers & rewards"
        subtitle="Live campaigns you can qualify for. Your progress updates as your team grows."
      />

      {offers.length === 0 ? (
        <div className="flex flex-col items-center gap-3 rounded-[22px] border border-dashed border-[var(--color-border)] bg-white px-6 py-14 text-center">
          <Gift className="size-9 text-[var(--color-muted-foreground)]" strokeWidth={1.4} aria-hidden="true" />
          <h2 className="text-[17px] font-bold text-[var(--brand-ink)]">No offers running right now</h2>
          <p className="max-w-sm text-sm text-[var(--color-muted-foreground)]">
            When a new campaign is announced it appears here, with your live progress towards it.
          </p>
        </div>
      ) : (
        <ul className="flex flex-col gap-5">
          {offers.map((offer) => (
            <li
              key={offer.id}
              className="overflow-hidden rounded-[22px] bg-white shadow-[0_18px_40px_-32px_rgb(16_26_71/0.45)] ring-1 ring-[rgb(16_26_71/0.07)]"
            >
              {/* Header carries the prize and the headline number. */}
              <div className="relative overflow-hidden bg-[linear-gradient(135deg,#101a47,#132a6b_55%,#0b4a34)] p-5 text-white sm:p-6">
                <span aria-hidden="true" className="absolute -right-20 -top-20 size-64 rounded-full bg-[radial-gradient(circle,rgb(61_220_114/0.3),transparent_65%)]" />
                <div className="relative flex flex-wrap items-start justify-between gap-4">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="pill bg-[var(--brand-green-bright)] px-3 py-1 text-[11.5px] font-bold uppercase tracking-[0.1em] text-[var(--brand-ink)]">
                        <Trophy className="mr-1 inline size-3.5" strokeWidth={2.2} aria-hidden="true" />
                        {offer.reward}
                      </span>
                      {offer.qualified && (
                        <span className="pill bg-white/15 px-3 py-1 text-[11.5px] font-bold uppercase tracking-[0.1em] ring-1 ring-white/25">
                          Qualified
                        </span>
                      )}
                    </div>
                    <h2 className="mt-3 text-[21px] font-bold leading-tight tracking-[-0.5px] sm:text-[24px]">
                      {offer.title}
                    </h2>
                    {offer.description && (
                      <p className="mt-1.5 max-w-xl text-[13.5px] leading-[1.55] text-white/75">
                        {offer.description}
                      </p>
                    )}
                    <p className="mt-3 flex flex-wrap items-center gap-1.5 text-[12.5px] text-white/70">
                      <CalendarClock className="size-3.5" strokeWidth={1.8} aria-hidden="true" />
                      {offer.endsAt ? (
                        <>
                          Ends {formatDate(offer.endsAt, { day: "numeric", month: "short", year: "numeric" })}
                          {offer.daysLeft !== null && (
                            <strong className="font-semibold text-white">
                              · {offer.daysLeft} day{offer.daysLeft === 1 ? "" : "s"} left
                            </strong>
                          )}
                        </>
                      ) : (
                        "No closing date"
                      )}
                    </p>
                  </div>

                  <div className="flex shrink-0 flex-col items-end gap-1.5">
                    <LiveRefresh />
                    <span className="tabular text-[40px] font-bold leading-none tracking-[-1.5px]">
                      {offer.percent}%
                    </span>
                    <span className="text-[11.5px] font-semibold uppercase tracking-[0.14em] text-white/60">
                      Completed
                    </span>
                  </div>
                </div>

                <div
                  className="relative mt-4 h-2.5 w-full overflow-hidden rounded-full bg-white/15"
                  role="progressbar"
                  aria-valuenow={offer.percent}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label={`Overall progress towards ${offer.title}`}
                >
                  <div
                    className="h-full rounded-full transition-[width] duration-500 ease-out"
                    style={{
                      width: `${offer.percent}%`,
                      background: "linear-gradient(90deg,#3ddc72,#ffffff)",
                    }}
                  />
                </div>
              </div>

              {/* One row per target, with the real numbers beside the bar. */}
              <ul className="flex flex-col divide-y divide-[var(--color-border)]">
                {offer.criteria.map((c) => (
                  <li key={c.metric + c.label} className="flex flex-col gap-2 p-5">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <span className="flex items-center gap-2 text-[14.5px] font-semibold text-[var(--brand-ink)]">
                        {c.met && (
                          <CheckCircle2
                            className="size-4 text-[var(--brand-green)]"
                            strokeWidth={2.2}
                            aria-hidden="true"
                          />
                        )}
                        {c.label}
                      </span>
                      <span className="tabular text-[14px] text-[var(--color-muted-foreground)]">
                        <strong className="text-[16px] font-bold text-[var(--brand-ink)]">
                          {value(c.metric, c.current)}
                        </strong>{" "}
                        / {value(c.metric, c.target)}
                      </span>
                    </div>
                    <div
                      className="h-2 w-full overflow-hidden rounded-full bg-[var(--color-muted)]"
                      role="progressbar"
                      aria-valuenow={c.percent}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-label={c.label}
                    >
                      <div
                        className="h-full rounded-full transition-[width] duration-500 ease-out"
                        style={{
                          width: `${c.percent}%`,
                          background: c.met
                            ? "linear-gradient(90deg,#12a150,#3ddc72)"
                            : "linear-gradient(90deg,#1b3fa0,#3b82f6)",
                        }}
                      />
                    </div>
                    <span className="text-[12.5px] text-[var(--color-muted-foreground)]">
                      {c.met
                        ? "Target reached."
                        : `${value(c.metric, Math.max(0, c.target - c.current))} to go.`}
                    </span>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
