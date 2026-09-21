"use client";

import { Download } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { EarningsRow } from "@/lib/queries";

const rupees = (paise: number) => (paise / 100).toFixed(2);

/** Quoted so names with commas cannot shift the columns. */
const cell = (v: string | number | null) => `"${String(v ?? "").replace(/"/g, '""')}"`;

/**
 * Downloads the payout sheet as CSV — for Excel, or for preparing bank
 * transfers. Built in the browser from rows already on the page, so there is
 * no second copy of the numbers to drift out of step.
 */
export function EarningsCsvButton({ rows }: { rows: EarningsRow[] }) {
  function download() {
    const header = [
      "Name", "Email", "Phone", "Member ID", "Plan", "Referrals", "Sales",
      "Total earned (Rs)", "Maturing (Rs)", "Ready (Rs)", "Payout in process (Rs)",
      "Paid out (Rs)", "To pay now (Rs)", "KYC", "Account name", "Account last 4", "IFSC",
    ];
    const lines = rows.map((r) =>
      [
        r.name, r.email, r.phone, r.memberId, r.planName, r.referrals, r.sales,
        rupees(r.lifetimeEarnedInPaise), rupees(r.pendingInPaise), rupees(r.availableInPaise),
        rupees(r.inProcessInPaise), rupees(r.withdrawnInPaise), rupees(r.toPayInPaise),
        r.kycStatus ?? "not submitted", r.bankAccountName, r.accountNumberLast4, r.ifsc,
      ].map(cell).join(","),
    );
    const csv = [header.map(cell).join(","), ...lines].join("\n");
    const url = URL.createObjectURL(new Blob(["﻿" + csv], { type: "text/csv;charset=utf-8" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = `nextmentor-payouts-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <Button variant="secondary" onClick={download} disabled={rows.length === 0}>
      <Download className="size-4" strokeWidth={1.8} aria-hidden="true" />
      Download CSV
    </Button>
  );
}
