import type { Metadata } from "next";
import { CheckCircle2, Clock } from "lucide-react";

import { requireUser } from "@/backend/lib/permissions";
import { getMyKyc } from "@/backend/services/affiliate";
import { submitKycAction } from "@/backend/actions/affiliate";
import { KycForm } from "@/frontend/components/dashboard/kyc-form";
import { Alert } from "@/frontend/components/ui/alert";
import { Badge } from "@/frontend/components/ui/badge";

export const metadata: Metadata = {
  title: "KYC verification",
  robots: { index: false, follow: false },
};

export default async function KycPage() {
  const user = await requireUser();
  const kyc = await getMyKyc(user.id);

  return (
    <div className="flex max-w-2xl flex-col gap-6">
      <header className="flex flex-col gap-1">
        <h1 className="text-2xl font-extrabold tracking-tight">KYC verification</h1>
        <p className="text-sm text-[var(--color-muted-foreground)]">
          Required before you can withdraw earnings.
        </p>
      </header>

      {kyc?.status === "approved" ? (
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2.5 rounded-[var(--radius-card)] border border-[var(--color-success)] bg-[var(--color-success-subtle)] px-4 py-3">
            <CheckCircle2
              className="size-5 shrink-0 text-[var(--color-success)]"
              strokeWidth={1.5}
              aria-hidden="true"
            />
            <div className="flex flex-col">
              <span className="text-sm font-bold text-[var(--color-success)]">Verified</span>
              <span className="text-xs text-[var(--color-muted-foreground)]">
                You can withdraw earnings to the account below.
              </span>
            </div>
          </div>

          <dl className="flex flex-col gap-3 rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-card)] p-5 text-sm">
            {[
              ["Name", kyc.fullName],
              ["Account holder", kyc.bankAccountName],
              ["Account number", `•••• ${kyc.accountNumberLast4}`],
              ["IFSC", kyc.ifsc],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between gap-4">
                <dt className="text-[var(--color-muted-foreground)]">{k}</dt>
                <dd className="font-medium">{v}</dd>
              </div>
            ))}
          </dl>

          <p className="text-xs text-[var(--color-muted-foreground)]">
            To change these details, contact support. Bank details cannot be edited after
            approval — that restriction is what stops a stolen session redirecting your payouts.
          </p>
        </div>
      ) : (
        <>
          {kyc?.status === "pending" && (
            <div className="flex items-center gap-2.5 rounded-[var(--radius-card)] border border-[var(--color-warning)] bg-[var(--color-warning-subtle)] px-4 py-3">
              <Clock
                className="size-5 shrink-0 text-[var(--color-warning)]"
                strokeWidth={1.5}
                aria-hidden="true"
              />
              <div className="flex flex-col">
                <span className="text-sm font-bold text-[var(--color-warning)]">
                  Under review
                </span>
                <span className="text-xs text-[var(--color-muted-foreground)]">
                  Submitted{" "}
                  {kyc.createdAt.toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                  . This usually takes 1–2 working days.
                </span>
              </div>
            </div>
          )}

          {kyc?.status === "rejected" && (
            <Alert tone="error">
              <span className="flex flex-col gap-1">
                <span className="font-bold">Verification was rejected</span>
                <span>{kyc.rejectionReason ?? "Please check your details and resubmit."}</span>
              </span>
            </Alert>
          )}

          {kyc?.status !== "pending" && (
            <section className="rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-card)] p-5">
              <KycForm
                action={submitKycAction}
                isResubmission={kyc?.status === "rejected"}
                defaults={{
                  fullName: kyc?.fullName,
                  bankAccountName: kyc?.bankAccountName,
                  ifsc: kyc?.ifsc,
                }}
              />
            </section>
          )}

          {kyc?.status === "pending" && (
            <dl className="flex flex-col gap-3 rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-card)] p-5 text-sm">
              {[
                ["Name", kyc.fullName],
                ["Account", `•••• ${kyc.accountNumberLast4}`],
                ["IFSC", kyc.ifsc],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between gap-4">
                  <dt className="text-[var(--color-muted-foreground)]">{k}</dt>
                  <dd className="font-medium">{v}</dd>
                </div>
              ))}
              <div className="flex justify-between gap-4">
                <dt className="text-[var(--color-muted-foreground)]">Status</dt>
                <dd>
                  <Badge tone="warning">Pending review</Badge>
                </dd>
              </div>
            </dl>
          )}
        </>
      )}
    </div>
  );
}
