import type { Metadata } from "next";
import Link from "next/link";
import { MousePointerClick, ShoppingBag, UserPlus, Users } from "lucide-react";

import { AffiliateLink } from "@/components/dashboard/affiliate-link";
import { Alert } from "@/components/ui/alert";
import { formatPrice, formatDate, appUrl } from "@/lib/format";

import { getActiveSubscription, getAffiliateSummary, requireUser } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Affiliate link",
  robots: { index: false, follow: false },
};

export default async function AffiliatePage() {
  const user = await requireUser();
  const [summary, plan] = await Promise.all([
    getAffiliateSummary(),
    getActiveSubscription(),
  ]);
  const { stats, associates } = summary;

  const url = `${appUrl()}/?ref=${user.referralCode}`;

  const tiles = [
    { label: "Clicks", value: stats.clicks, sub: `${stats.clicksLast30} in 30 days`, icon: MousePointerClick },
    { label: "Visitors", value: stats.uniqueVisitors, sub: "unique", icon: Users },
    { label: "Sign-ups", value: stats.signups, sub: `${stats.signupRate}% of clicks`, icon: UserPlus },
    { label: "Buyers", value: stats.buyers, sub: "made a purchase", icon: ShoppingBag },
  ];

  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-col gap-1">
        <h1 className="text-2xl font-extrabold tracking-tight">Your affiliate link</h1>
        <p className="text-sm text-[var(--color-muted-foreground)]">
          Share it anywhere. You earn on every purchase made by someone who joins through it.
        </p>
      </header>

      {/* Earning is gated on holding a plan, so say so plainly rather than
          letting someone share a link that will never pay. */}
      {!plan || plan.commissionRateBps === 0 ? (
        <Alert tone="info">
          Your current plan does not earn commission. {" "}
          <Link href="/dashboard/plan" className="font-semibold underline">
            Upgrade to start earning
          </Link>
          .
        </Alert>
      ) : (
        <div className="rounded-[var(--radius-card)] bg-[var(--color-accent-subtle)] px-4 py-3 text-sm font-semibold text-[var(--color-accent)]">
          You earn {plan.commissionRateBps / 100}% on every purchase your referrals make.
        </div>
      )}

      <section className="flex flex-col gap-4 rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-card)] p-5">
        <AffiliateLink url={url} code={user.referralCode} />
      </section>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {tiles.map((t) => (
          <div
            key={t.label}
            className="flex flex-col gap-2 rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-card)] p-4"
          >
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-semibold uppercase tracking-wide text-[var(--color-muted-foreground)]">
                {t.label}
              </span>
              <t.icon
                className="size-4 text-[var(--color-muted-foreground)]"
                strokeWidth={1.5}
                aria-hidden="true"
              />
            </div>
            <span className="tabular text-2xl font-extrabold">{t.value}</span>
            <span className="text-xs text-[var(--color-muted-foreground)]">{t.sub}</span>
          </div>
        ))}
      </div>

      <section className="flex flex-col gap-3">
        <div className="flex items-baseline justify-between gap-2">
          <h2 className="text-lg font-bold tracking-tight">Your associates</h2>
          <Link
            href="/dashboard/earnings"
            className="text-sm font-medium text-[var(--color-primary)] hover:underline"
          >
            View earnings
          </Link>
        </div>

        {associates.length === 0 ? (
          <div className="flex flex-col items-center gap-3 rounded-[var(--radius-card)] border border-dashed border-[var(--color-border)] bg-[var(--color-card)] px-6 py-12 text-center">
            <Users
              className="size-8 text-[var(--color-muted-foreground)]"
              strokeWidth={1.5}
              aria-hidden="true"
            />
            <h3 className="font-bold">Nobody has joined yet</h3>
            <p className="max-w-sm text-sm text-[var(--color-muted-foreground)]">
              Share your link and the people who sign up through it will appear here.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-card)]">
            <table className="w-full min-w-[560px] text-sm">
              <thead>
                <tr className="border-b border-[var(--color-border)] text-left text-xs uppercase tracking-wide text-[var(--color-muted-foreground)]">
                  <th scope="col" className="px-4 py-3 font-semibold">Person</th>
                  <th scope="col" className="px-4 py-3 font-semibold">Joined</th>
                  <th scope="col" className="px-4 py-3 text-right font-semibold">Purchases</th>
                  <th scope="col" className="px-4 py-3 text-right font-semibold">You earned</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--color-border)]">
                {associates.map((a) => (
                  <tr key={a.id} className="transition-colors hover:bg-[var(--color-muted)]">
                    <td className="px-4 py-3">
                      <div className="font-semibold">{a.name ?? "—"}</div>
                      {/* Only the masked email: an affiliate does not need a
                          full contact list of the people they referred. */}
                      <div className="text-xs text-[var(--color-muted-foreground)]">
                        {a.email.replace(/^(.{2}).*(@.*)$/, "$1•••$2")}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-xs text-[var(--color-muted-foreground)]">
                      {formatDate(a.joinedAt, {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                    <td className="tabular px-4 py-3 text-right">{a.purchaseCount}</td>
                    <td className="tabular px-4 py-3 text-right font-bold text-[var(--color-accent)]">
                      {a.earnedInPaise > 0 ? formatPrice(a.earnedInPaise) : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
