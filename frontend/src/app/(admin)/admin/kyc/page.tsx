import type { Metadata } from "next";
import { formatDate, formatDateTime } from "@/lib/format";
import Link from "next/link";

import { ReviewControls } from "@/components/admin/review-actions";
import { Badge } from "@/components/ui/badge";
import { reviewKycAction } from "@/actions/admin";
import { listKycForAdmin, requireAdmin } from "@/lib/queries";

export const metadata: Metadata = {
  title: "KYC review",
  robots: { index: false, follow: false },
};

const TONE = { pending: "warning", approved: "success", rejected: "danger" } as const;

export default async function AdminKycPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: "pending" | "approved" | "rejected" }>;
}) {
  await requireAdmin();
  const { status } = await searchParams;
  const submissions = await listKycForAdmin(status ?? "pending");

  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-col gap-1">
        <h1 className="text-2xl font-extrabold tracking-tight">KYC review</h1>
        <p className="text-sm text-[var(--color-muted-foreground)]">
          {submissions.length} {status ?? "pending"} submission(s)
        </p>
      </header>

      <nav aria-label="Filter by status" className="flex gap-1">
        {(["pending", "approved", "rejected"] as const).map((s) => (
          <Link
            key={s}
            href={`/admin/kyc?status=${s}`}
            aria-current={(status ?? "pending") === s ? "page" : undefined}
            className={
              (status ?? "pending") === s
                ? "rounded-[var(--radius-control)] bg-[var(--color-primary)] px-3 py-2 text-sm font-semibold capitalize text-[var(--color-on-primary)]"
                : "rounded-[var(--radius-control)] px-3 py-2 text-sm font-medium capitalize text-[var(--color-muted-foreground)] hover:bg-[var(--color-muted)]"
            }
          >
            {s}
          </Link>
        ))}
      </nav>

      {submissions.length === 0 ? (
        <p className="rounded-[var(--radius-card)] border border-dashed border-[var(--color-border)] px-6 py-12 text-center text-sm text-[var(--color-muted-foreground)]">
          Nothing to review here.
        </p>
      ) : (
        <ul className="flex flex-col gap-4">
          {submissions.map((k) => (
            <li
              key={k.id}
              className="flex flex-col gap-4 rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-card)] p-5 sm:flex-row sm:items-start sm:justify-between"
            >
              <div className="flex min-w-0 flex-col gap-3">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-bold">{k.fullName}</span>
                  <Badge tone={TONE[k.status]} className="capitalize">
                    {k.status}
                  </Badge>
                </div>

                <dl className="grid grid-cols-1 gap-x-6 gap-y-1 text-sm sm:grid-cols-2">
                  {[
                    ["Account email", k.userEmail],
                    ["PAN", k.panNumber],
                    ["Aadhaar", k.aadhaarLast4 ? `•••• ${k.aadhaarLast4}` : "—"],
                    ["Account holder", k.bankAccountName],
                    // Only the last 4 is ever rendered. The full number is
                    // encrypted and is not decrypted for a review screen.
                    ["Account number", `•••• ${k.accountNumberLast4}`],
                    ["IFSC", k.ifsc],
                  ].map(([label, value]) => (
                    <div key={label} className="flex gap-2">
                      <dt className="text-[var(--color-muted-foreground)]">{label}:</dt>
                      <dd className="font-medium">{value}</dd>
                    </div>
                  ))}
                </dl>

                <span className="text-xs text-[var(--color-muted-foreground)]">
                  Submitted{" "}
                  {formatDate(k.createdAt, {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              </div>

              {k.status === "pending" && (
                <div className="sm:w-64 sm:shrink-0">
                  <ReviewControls
                    approveLabel="Approve"
                    rejectLabel="Reject"
                    reasonLabel="Why is this being rejected?"
                    onApprove={async () => {
                      "use server";
                      return reviewKycAction(k.id, "approved");
                    }}
                    onReject={async (reason: string) => {
                      "use server";
                      return reviewKycAction(k.id, "rejected", reason);
                    }}
                  />
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
