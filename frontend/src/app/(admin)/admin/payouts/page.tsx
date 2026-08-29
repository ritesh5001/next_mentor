import type { Metadata } from "next";
import Link from "next/link";
import { AlertTriangle } from "lucide-react";

import { requireAdmin } from "@/backend/lib/permissions";
import { listPayoutsForAdmin } from "@/backend/services/affiliate";
import {
  approvePayoutAction,
  rejectPayoutAction,
  markPayoutPaidAction,
} from "@/backend/actions/affiliate";
import { ReviewControls, MarkPaidControl } from "@/frontend/components/admin/review-actions";
import { Badge } from "@/frontend/components/ui/badge";
import { formatPrice } from "@/frontend/lib/format";

export const metadata: Metadata = {
  title: "Payouts",
  robots: { index: false, follow: false },
};

const TONE = {
  requested: "warning",
  approved: "primary",
  paid: "success",
  rejected: "danger",
} as const;

export default async function AdminPayoutsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: "requested" | "approved" | "paid" | "rejected" }>;
}) {
  await requireAdmin();
  const { status } = await searchParams;
  const payouts = await listPayoutsForAdmin(status ?? "requested");

  const totalOwed = payouts
    .filter((p) => p.status === "requested" || p.status === "approved")
    .reduce((n, p) => n + p.amountInPaise, 0);

  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-extrabold tracking-tight">Payouts</h1>
          <p className="text-sm text-[var(--color-muted-foreground)]">
            {payouts.length} {status ?? "requested"} request(s)
          </p>
        </div>

        {totalOwed > 0 && (
          <div className="rounded-[var(--radius-card)] bg-[var(--color-accent-subtle)] px-4 py-2">
            <span className="text-xs font-semibold uppercase tracking-wide text-[var(--color-accent)]">
              Outstanding
            </span>
            <div className="tabular text-xl font-extrabold text-[var(--color-accent)]">
              {formatPrice(totalOwed)}
            </div>
          </div>
        )}
      </header>

      <nav aria-label="Filter by status" className="flex flex-wrap gap-1">
        {(["requested", "approved", "paid", "rejected"] as const).map((s) => (
          <Link
            key={s}
            href={`/admin/payouts?status=${s}`}
            aria-current={(status ?? "requested") === s ? "page" : undefined}
            className={
              (status ?? "requested") === s
                ? "rounded-[var(--radius-control)] bg-[var(--color-primary)] px-3 py-2 text-sm font-semibold capitalize text-[var(--color-on-primary)]"
                : "rounded-[var(--radius-control)] px-3 py-2 text-sm font-medium capitalize text-[var(--color-muted-foreground)] hover:bg-[var(--color-muted)]"
            }
          >
            {s}
          </Link>
        ))}
      </nav>

      {payouts.length === 0 ? (
        <p className="rounded-[var(--radius-card)] border border-dashed border-[var(--color-border)] px-6 py-12 text-center text-sm text-[var(--color-muted-foreground)]">
          Nothing here.
        </p>
      ) : (
        <ul className="flex flex-col gap-4">
          {payouts.map((p) => (
            <li
              key={p.id}
              className="flex flex-col gap-4 rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-card)] p-5 lg:flex-row lg:items-start lg:justify-between"
            >
              <div className="flex min-w-0 flex-col gap-3">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="tabular text-xl font-extrabold text-[var(--color-accent)]">
                    {formatPrice(p.amountInPaise)}
                  </span>
                  <Badge tone={TONE[p.status]} className="capitalize">
                    {p.status}
                  </Badge>
                  {p.kycStatus !== "approved" && (
                    <Badge tone="danger">
                      <AlertTriangle className="size-3" strokeWidth={2} aria-hidden="true" />
                      KYC not approved
                    </Badge>
                  )}
                </div>

                <dl className="grid grid-cols-1 gap-x-6 gap-y-1 text-sm sm:grid-cols-2">
                  {[
                    ["Requested by", `${p.userName ?? "—"} · ${p.userEmail}`],
                    ["Account holder", p.bankAccountName ?? "—"],
                    ["Account", p.accountNumberLast4 ? `•••• ${p.accountNumberLast4}` : "—"],
                    ["IFSC", p.ifsc ?? "—"],
                  ].map(([label, value]) => (
                    <div key={label} className="flex gap-2">
                      <dt className="shrink-0 text-[var(--color-muted-foreground)]">{label}:</dt>
                      <dd className="truncate font-medium">{value}</dd>
                    </div>
                  ))}
                </dl>

                <span className="text-xs text-[var(--color-muted-foreground)]">
                  Requested{" "}
                  {p.createdAt.toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                  {p.utrNumber && ` · UTR ${p.utrNumber}`}
                </span>
              </div>

              <div className="lg:w-72 lg:shrink-0">
                {p.status === "requested" && (
                  <ReviewControls
                    approveLabel="Approve"
                    rejectLabel="Reject"
                    reasonLabel="Why is this being rejected? Funds return to the wallet."
                    onApprove={async () => {
                      "use server";
                      return approvePayoutAction(p.id);
                    }}
                    onReject={async (reason: string) => {
                      "use server";
                      return rejectPayoutAction(p.id, reason);
                    }}
                  />
                )}

                {p.status === "approved" && (
                  <div className="flex flex-col gap-2">
                    <p className="text-xs text-[var(--color-muted-foreground)]">
                      Transfer the funds from your bank, then record the UTR here.
                    </p>
                    <MarkPaidControl
                      onMarkPaid={async (utr: string) => {
                        "use server";
                        return markPayoutPaidAction(p.id, utr);
                      }}
                    />
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
