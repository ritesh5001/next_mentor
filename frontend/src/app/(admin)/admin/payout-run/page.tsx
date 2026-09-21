import type { Metadata } from "next";
import Link from "next/link";
import { AlertTriangle, ChevronRight, Clock, ShieldCheck } from "lucide-react";

import { PayoutRunCsvButton, RecordPayoutControl } from "@/components/admin/payout-run";
import { Badge } from "@/components/ui/badge";
import { formatDate, formatPrice } from "@/lib/format";
import { getWeeklyPayoutRun, requireAdmin, type PayoutRunRow } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Monday payout run",
  robots: { index: false, follow: false },
};

const day = (iso: string) =>
  formatDate(iso, { weekday: "long", day: "numeric", month: "long", year: "numeric" });

/**
 * "Who do I pay this Monday, and how much?" — the one question the weekly
 * payout run has to answer. Everything on this page is a consequence of the
 * commission ledger, so nothing is added up by hand.
 */
export default async function AdminPayoutRunPage() {
  await requireAdmin();
  const run = await getWeeklyPayoutRun();
  const t = run.totals;

  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold tracking-tight">Monday payout run</h1>
          <p className="text-sm text-[var(--color-muted-foreground)]">
            Payout for {day(run.runDate)}. Transfer the amounts below, then record each UTR so the
            member&apos;s balance updates.
          </p>
        </div>
        <PayoutRunCsvButton rows={run.pay} runDate={run.runDate} />
      </header>

      {/* The single number the owner acts on. */}
      <section className="flex flex-wrap items-center justify-between gap-4 rounded-[20px] bg-[linear-gradient(135deg,#0e5a40,#0b4a34)] p-5 text-white sm:p-6">
        <div>
          <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-white/70">
            Release this Monday
          </p>
          <p className="tabular mt-1 text-[34px] font-bold leading-none">{formatPrice(t.payInPaise)}</p>
          <p className="mt-1.5 text-[13px] text-white/75">
            {run.pay.length} member{run.pay.length === 1 ? "" : "s"} · matured and KYC approved.
          </p>
        </div>
        <dl className="flex flex-wrap gap-5 text-[13px]">
          {[
            ["On hold (KYC)", t.blockedInPaise],
            ["Already committed", t.inProcessInPaise],
            ["Still maturing", t.maturingInPaise],
          ].map(([label, value]) => (
            <div key={label as string}>
              <dt className="text-white/70">{label}</dt>
              <dd className="tabular text-[18px] font-bold">{formatPrice(value as number)}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Pay list */}
      <section className="flex flex-col gap-3">
        <h2 className="text-[15px] font-bold tracking-tight">Pay now</h2>
        {run.pay.length === 0 ? (
          <Empty>
            Nobody is payable this Monday. Commission becomes payable once it clears the 7-day
            refund window and the member&apos;s KYC is approved.
          </Empty>
        ) : (
          <ul className="flex flex-col gap-3">
            {run.pay.map((m) => (
              <li
                key={m.userId}
                className="flex flex-col gap-4 rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-card)] p-5 lg:flex-row lg:items-center lg:justify-between"
              >
                <div className="flex min-w-0 flex-col gap-2">
                  <div className="flex flex-wrap items-baseline gap-2">
                    <MemberLink member={m} />
                    <Badge tone="success">
                      <ShieldCheck className="size-3" strokeWidth={2} aria-hidden="true" />
                      KYC approved
                    </Badge>
                  </div>
                  <dl className="grid grid-cols-1 gap-x-6 gap-y-1 text-[13px] sm:grid-cols-2">
                    {[
                      ["Beneficiary", m.bankAccountName ?? "—"],
                      ["Account", m.accountNumber ?? `•••• ${m.accountNumberLast4 ?? ""}`],
                      ["IFSC", m.ifsc ?? "—"],
                      [
                        "Last paid",
                        m.lastPaidAt
                          ? formatDate(m.lastPaidAt, { day: "numeric", month: "short", year: "numeric" })
                          : "never",
                      ],
                    ].map(([label, value]) => (
                      <div key={label} className="flex min-w-0 gap-2">
                        <dt className="shrink-0 text-[var(--color-muted-foreground)]">{label}:</dt>
                        <dd className="truncate font-medium">{value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>

                <div className="flex shrink-0 flex-col gap-2 lg:w-80">
                  <p className="tabular text-[26px] font-bold leading-none text-[var(--brand-green)]">
                    {formatPrice(m.amountInPaise)}
                  </p>
                  <RecordPayoutControl userId={m.userId} amountInPaise={m.amountInPaise} />
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Everything that is not payable, and exactly why. */}
      <Bucket
        title="On hold — KYC not approved"
        icon={<AlertTriangle className="size-4 text-[var(--color-warning)]" strokeWidth={2} aria-hidden="true" />}
        rows={run.blocked}
        empty="Nobody is held up by KYC."
        note={
          <>
            This money has matured but cannot be sent until the bank details are verified.{" "}
            <Link href="/admin/kyc" className="font-semibold underline underline-offset-2">
              Review KYC
            </Link>
            .
          </>
        }
      />

      <Bucket
        title="Already committed"
        icon={<Clock className="size-4 text-[var(--color-muted-foreground)]" strokeWidth={2} aria-hidden="true" />}
        rows={run.inProcess}
        empty="No withdrawal requests are open."
        note={
          <>
            These members asked to withdraw and the money has already left their balance. Finish
            them in{" "}
            <Link href="/admin/payouts" className="font-semibold underline underline-offset-2">
              Payouts
            </Link>{" "}
            so they are not paid twice.
          </>
        }
      />

      {/* What is coming, and on which Monday it can actually be sent. */}
      <section className="flex flex-col gap-3">
        <h2 className="flex items-center gap-2 text-[15px] font-bold tracking-tight">
          <Clock className="size-4 text-[var(--color-muted-foreground)]" strokeWidth={2} aria-hidden="true" />
          Coming up
        </h2>
        <p className="text-[13px] text-[var(--color-muted-foreground)]">
          Commission still inside the 7-day refund window, grouped by the Monday it can first be
          paid. A sale that clears on a Monday afternoon misses that morning&apos;s transfers, so it
          lands on the run after.
        </p>
        {run.forecast.length === 0 ? (
          <Empty>Nothing is maturing right now.</Empty>
        ) : (
          run.forecast.map((r) => (
            <div key={r.runDate} className="flex flex-col gap-2">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="text-[13.5px] font-semibold">{day(r.runDate)}</h3>
                <span className="tabular text-[15px] font-bold">{formatPrice(r.totalInPaise)}</span>
              </div>
              <ul className="flex flex-col divide-y divide-[var(--color-border)] rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-card)]">
                {r.members.map((m) => (
                  <li key={m.userId} className="flex flex-wrap items-center justify-between gap-3 px-5 py-3.5">
                    <div className="flex min-w-0 flex-col">
                      <MemberLink member={m} />
                      {m.kycStatus !== "approved" && (
                        <span className="text-[12.5px] text-[var(--color-warning)]">
                          KYC {m.kycStatus ?? "not submitted"} — cannot be paid until it is approved
                        </span>
                      )}
                    </div>
                    <span className="tabular shrink-0 text-[17px] font-bold">
                      {formatPrice(m.amountInPaise)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))
        )}
      </section>
    </div>
  );
}

function MemberLink({ member }: { member: PayoutRunRow }) {
  return (
    <Link
      href={`/admin/earnings/${member.userId}`}
      className="group inline-flex min-w-0 items-center gap-1 font-semibold hover:underline"
    >
      <span className="truncate">{member.name ?? member.email}</span>
      <span className="font-mono text-[12px] font-normal text-[var(--color-muted-foreground)]">
        {member.memberId}
      </span>
      <ChevronRight className="size-4 shrink-0 text-[var(--color-muted-foreground)]" strokeWidth={2} aria-hidden="true" />
    </Link>
  );
}

function Empty({ children }: { children: React.ReactNode }) {
  return (
    <p className="rounded-[var(--radius-card)] border border-dashed border-[var(--color-border)] px-6 py-8 text-center text-sm text-[var(--color-muted-foreground)]">
      {children}
    </p>
  );
}

function Bucket({
  title,
  icon,
  rows,
  empty,
  note,
}: {
  title: string;
  icon: React.ReactNode;
  rows: PayoutRunRow[];
  empty: string;
  note: React.ReactNode;
}) {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="flex items-center gap-2 text-[15px] font-bold tracking-tight">
        {icon}
        {title}
      </h2>
      <p className="text-[13px] text-[var(--color-muted-foreground)]">{note}</p>
      {rows.length === 0 ? (
        <Empty>{empty}</Empty>
      ) : (
        <ul className="flex flex-col divide-y divide-[var(--color-border)] rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-card)]">
          {rows.map((m) => (
            <li key={m.userId} className="flex flex-wrap items-center justify-between gap-3 px-5 py-3.5">
              <div className="flex min-w-0 flex-col">
                <MemberLink member={m} />
                <span className="truncate text-[12.5px] text-[var(--color-muted-foreground)]">
                  {m.email}
                  {m.kycStatus !== "approved" && ` · KYC ${m.kycStatus ?? "not submitted"}`}
                </span>
              </div>
              <span className="tabular shrink-0 text-[17px] font-bold">{formatPrice(m.amountInPaise)}</span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
