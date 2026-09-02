import type { Metadata } from "next";
import { Coins, Clock, Wallet as WalletIcon, TrendingUp } from "lucide-react";

import { PayoutForm } from "@/components/dashboard/payout-form";
import {
  Cell, DataTable, PageHeader, Panel, Row, StatRow, StatTile,
} from "@/components/dashboard/panels";
import { Badge } from "@/components/ui/badge";
import { Alert } from "@/components/ui/alert";
import { formatPrice, formatDate, formatDateTime } from "@/lib/format";
import { requireUser, getEarnings } from "@/lib/queries";
import { requestPayoutAction } from "@/actions";


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

  const { wallet, commissions, ledger, kyc, payouts, minPayoutInPaise } =
    await getEarnings();

  const hasPendingRequest = payouts.some(
    (p) => p.status === "requested" || p.status === "approved",
  );

  const tiles = [
    {
      label: "Available",
      value: formatPrice(wallet.availableInPaise),
      sub: "ready to withdraw",
      icon: WalletIcon,
      tone: "money" as const,
    },
    {
      label: "Pending",
      value: formatPrice(wallet.pendingInPaise),
      sub: "clears after the refund window",
      icon: Clock,
      tone: "info" as const,
    },
    {
      label: "Lifetime earned",
      value: formatPrice(wallet.lifetimeEarnedInPaise),
      sub: "gross commission",
      icon: TrendingUp,
      tone: "success" as const,
    },
    {
      label: "Withdrawn",
      value: formatPrice(wallet.withdrawnInPaise),
      sub: "paid out to date",
      icon: Coins,
      tone: "neutral" as const,
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Associates &amp; earnings"
        subtitle="What you have earned, and what is ready to withdraw."
      />

      {/* A negative balance is a real debt from a refunded sale. Say so plainly
          rather than showing a confusing minus sign with no explanation. */}
      {wallet.availableInPaise < 0 && (
        <Alert tone="error">
          Your balance is negative because a sale you earned on was refunded. New
          commission will clear this before becoming withdrawable.
        </Alert>
      )}

      <StatRow>
        {tiles.map((t) => (
          <StatTile
            key={t.label}
            label={t.label}
            value={t.value}
            hint={t.sub}
            tone={t.tone}
            icon={<t.icon className="size-7" strokeWidth={1.4} aria-hidden="true" />}
          />
        ))}
      </StatRow>

      <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
        <div className="flex min-w-0 flex-col gap-6">
          <Panel title="Direct commission">
            <DataTable
              head={["From", "Rate", "Earned", "Status"]}
              minWidth={520}
              empty={
                commissions.length === 0
                  ? "No commission yet. Share your affiliate link to get started."
                  : undefined
              }
            >
                    {commissions.map((c, i) => (
                      <Row key={c.id} i={i}>
                        <Cell>
                          <div className="font-medium">{c.sourceName ?? "—"}</div>
                          <div className="text-xs text-[var(--color-muted-foreground)]">
                            {formatDate(c.createdAt, {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            })}
                            {" · on "}
                            {formatPrice(c.baseAmountInPaise)}
                          </div>
                        </Cell>
                        <Cell align="right" className="tabular">{c.rateBps / 100}%</Cell>
                        <Cell align="right" className="tabular font-bold text-[var(--color-accent)]">
                          {formatPrice(c.amountInPaise)}
                        </Cell>
                        <Cell>
                          <Badge tone={COMMISSION_TONE[c.status]} className="capitalize">
                            {c.status}
                          </Badge>
                          {c.status === "pending" && (
                            <div className="mt-0.5 text-xs text-[var(--color-muted-foreground)]">
                              clears{" "}
                              {formatDate(c.maturesAt, {
                                day: "numeric",
                                month: "short",
                              })}
                            </div>
                          )}
                        </Cell>
                      </Row>
                    ))}
            </DataTable>
          </Panel>

          {ledger.length > 0 && (
            <section className="flex flex-col gap-3">
              <h2 className="text-lg font-bold tracking-tight">Wallet statement</h2>
              <ul className="divide-y divide-[var(--color-border)] rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-card)]">
                {ledger.map((e) => (
                  <li key={e.id} className="flex items-center justify-between gap-3 px-4 py-3">
                    <div className="min-w-0">
                      <div className="truncate text-sm font-medium">{e.note ?? e.referenceType}</div>
                      <div className="text-xs text-[var(--color-muted-foreground)]">
                        {formatDate(e.createdAt, {
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
              minimumInPaise={minPayoutInPaise}
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
                      {formatDate(p.createdAt, {
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
