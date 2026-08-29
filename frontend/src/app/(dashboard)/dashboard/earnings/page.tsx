import type { Metadata } from "next";
import { Coins, Clock, Wallet as WalletIcon, TrendingUp } from "lucide-react";

import { requireUser } from "@/backend/lib/permissions";
import {
  getWalletSummary,
  getCommissionHistory,
  getLedger,
  getMyKyc,
  getMyPayouts,
  MIN_PAYOUT_IN_PAISE,
} from "@/backend/services/affiliate";
import { requestPayoutAction } from "@/backend/actions/affiliate";
import { PayoutForm } from "@/frontend/components/dashboard/payout-form";
import { Badge } from "@/frontend/components/ui/badge";
import { Alert } from "@/frontend/components/ui/alert";
import { formatPrice } from "@/frontend/lib/format";

export const metadata: Metadata = {
  title: "Associates & earnings",
  robots: { index: false, follow: false },
};

const COMMISSION_TONE = {
  pending: "warning",
  approved: "success",
  paid: "primary",
  reversed: "danger",
} as const;

const PAYOUT_TONE = {
  requested: "warning",
  approved: "primary",
  paid: "success",
  rejected: "danger",
} as const;

export default async function EarningsPage() {
  const user = await requireUser();

  const [wallet, commissions, ledger, kyc, payouts] = await Promise.all([
    getWalletSummary(user.id),
    getCommissionHistory(user.id, 25),
    getLedger(user.id, 25),
    getMyKyc(user.id),
    getMyPayouts(user.id),
  ]);

  const hasPendingRequest = payouts.some(
    (p) => p.status === "requested" || p.status === "approved",
  );

  const tiles = [
    {
      label: "Available",
      value: formatPrice(wallet.availableInPaise),
      sub: "ready to withdraw",
      icon: WalletIcon,
      money: true,
    },
    {
      label: "Pending",
      value: formatPrice(wallet.pendingInPaise),
      sub: "clears after the refund window",
      icon: Clock,
      money: false,
    },
    {
      label: "Lifetime earned",
      value: formatPrice(wallet.lifetimeEarnedInPaise),
      sub: "gross commission",
      icon: TrendingUp,
      money: false,
    },
    {
      label: "Withdrawn",
      value: formatPrice(wallet.withdrawnInPaise),
      sub: "paid out to date",
      icon: Coins,
      money: false,
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-col gap-1">
        <h1 className="text-2xl font-extrabold tracking-tight">Associates &amp; earnings</h1>
        <p className="text-sm text-[var(--color-muted-foreground)]">
          What you have earned, and what is ready to withdraw.
        </p>
      </header>

      {/* A negative balance is a real debt from a refunded sale. Say so plainly
          rather than showing a confusing minus sign with no explanation. */}
      {wallet.availableInPaise < 0 && (
        <Alert tone="error">
          Your balance is negative because a sale you earned on was refunded. New
          commission will clear this before becoming withdrawable.
        </Alert>
      )}

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
                className={
                  t.money
                    ? "size-4 text-[var(--color-accent)]"
                    : "size-4 text-[var(--color-muted-foreground)]"
                }
                strokeWidth={1.5}
                aria-hidden="true"
              />
            </div>
            <span
              className={
                t.money
                  ? "tabular text-2xl font-extrabold text-[var(--color-accent)]"
                  : "tabular text-2xl font-extrabold"
              }
            >
              {t.value}
            </span>
            <span className="text-xs text-[var(--color-muted-foreground)]">{t.sub}</span>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
        <div className="flex min-w-0 flex-col gap-6">
          <section className="flex flex-col gap-3">
            <h2 className="text-lg font-bold tracking-tight">Commission history</h2>

            {commissions.length === 0 ? (
              <p className="rounded-[var(--radius-card)] border border-dashed border-[var(--color-border)] bg-[var(--color-card)] px-6 py-12 text-center text-sm text-[var(--color-muted-foreground)]">
                No commission yet. Share your affiliate link to get started.
              </p>
            ) : (
              <div className="overflow-x-auto rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-card)]">
                <table className="w-full min-w-[520px] text-sm">
                  <thead>
                    <tr className="border-b border-[var(--color-border)] text-left text-xs uppercase tracking-wide text-[var(--color-muted-foreground)]">
                      <th scope="col" className="px-4 py-3 font-semibold">From</th>
                      <th scope="col" className="px-4 py-3 text-right font-semibold">Rate</th>
                      <th scope="col" className="px-4 py-3 text-right font-semibold">Earned</th>
                      <th scope="col" className="px-4 py-3 font-semibold">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--color-border)]">
                    {commissions.map((c) => (
                      <tr key={c.id} className="transition-colors hover:bg-[var(--color-muted)]">
                        <td className="px-4 py-3">
                          <div className="font-medium">{c.sourceName ?? "—"}</div>
                          <div className="text-xs text-[var(--color-muted-foreground)]">
                            {c.createdAt.toLocaleDateString("en-IN", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            })}
                            {" · on "}
                            {formatPrice(c.baseAmountInPaise)}
                          </div>
                        </td>
                        <td className="tabular px-4 py-3 text-right">{c.rateBps / 100}%</td>
                        <td className="tabular px-4 py-3 text-right font-bold text-[var(--color-accent)]">
                          {formatPrice(c.amountInPaise)}
                        </td>
                        <td className="px-4 py-3">
                          <Badge tone={COMMISSION_TONE[c.status]} className="capitalize">
                            {c.status}
                          </Badge>
                          {c.status === "pending" && (
                            <div className="mt-0.5 text-xs text-[var(--color-muted-foreground)]">
                              clears{" "}
                              {c.maturesAt.toLocaleDateString("en-IN", {
                                day: "numeric",
                                month: "short",
                              })}
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>

          {ledger.length > 0 && (
            <section className="flex flex-col gap-3">
              <h2 className="text-lg font-bold tracking-tight">Wallet statement</h2>
              <ul className="divide-y divide-[var(--color-border)] rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-card)]">
                {ledger.map((e) => (
                  <li key={e.id} className="flex items-center justify-between gap-3 px-4 py-3">
                    <div className="min-w-0">
                      <div className="truncate text-sm font-medium">{e.note ?? e.referenceType}</div>
                      <div className="text-xs text-[var(--color-muted-foreground)]">
                        {e.createdAt.toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </div>
                    </div>
                    <span
                      className={
                        e.direction === "credit"
                          ? "tabular shrink-0 font-bold text-[var(--color-success)]"
                          : e.direction === "debit"
                            ? "tabular shrink-0 font-bold text-[var(--color-destructive)]"
                            : "tabular shrink-0 font-medium text-[var(--color-muted-foreground)]"
                      }
                    >
                      {e.direction === "credit" ? "+" : e.direction === "debit" ? "−" : "↔"}
                      {formatPrice(e.amountInPaise)}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>

        <aside className="flex flex-col gap-6 lg:sticky lg:top-24 lg:self-start">
          <section className="flex flex-col gap-4 rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-card)] p-5">
            <h2 className="text-lg font-bold tracking-tight">Withdraw</h2>
            <PayoutForm
              action={requestPayoutAction}
              availableInPaise={wallet.availableInPaise}
              minimumInPaise={MIN_PAYOUT_IN_PAISE}
              kycApproved={kyc?.status === "approved"}
              hasPendingRequest={hasPendingRequest}
            />
          </section>

          {payouts.length > 0 && (
            <section className="flex flex-col gap-3 rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-card)] p-5">
              <h2 className="text-sm font-bold uppercase tracking-wide text-[var(--color-muted-foreground)]">
                Withdrawal history
              </h2>
              <ul className="flex flex-col gap-3">
                {payouts.map((p) => (
                  <li key={p.id} className="flex flex-col gap-1 text-sm">
                    <div className="flex items-center justify-between gap-2">
                      <span className="tabular font-bold">{formatPrice(p.amountInPaise)}</span>
                      <Badge tone={PAYOUT_TONE[p.status]} className="capitalize">
                        {p.status}
                      </Badge>
                    </div>
                    <span className="text-xs text-[var(--color-muted-foreground)]">
                      {p.createdAt.toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                      {p.utrNumber && ` · UTR ${p.utrNumber}`}
                    </span>
                    {p.adminNote && (
                      <span className="text-xs text-[var(--color-destructive)]">
                        {p.adminNote}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </section>
          )}
        </aside>
      </div>
    </div>
  );
}
