"use client";

import { useId, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Download } from "lucide-react";

import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { recordPayoutRunAction, settleBalanceAction } from "@/actions/admin";
import type { PayoutRunRow } from "@/lib/queries";

const rupees = (paise: number) => (paise / 100).toFixed(2);
const cell = (v: string | number | null) => `"${String(v ?? "").replace(/"/g, '""')}"`;

/**
 * The bank sheet for this Monday: one row per transfer, with the full account
 * number, so it can be typed into net banking or uploaded as a bulk file.
 */
export function PayoutRunCsvButton({ rows, runDate }: { rows: PayoutRunRow[]; runDate: string }) {
  function download() {
    const header = [
      "Beneficiary name", "Account number", "IFSC", "Amount (Rs)",
      "Member", "Member ID", "Email", "Phone",
    ];
    const lines = rows.map((r) =>
      [
        r.bankAccountName, r.accountNumber ?? `xxxx${r.accountNumberLast4 ?? ""}`, r.ifsc,
        rupees(r.amountInPaise), r.name, r.memberId, r.email, r.phone,
      ].map(cell).join(","),
    );
    const csv = [header.map(cell).join(","), ...lines].join("\n");
    const url = URL.createObjectURL(new Blob(["﻿" + csv], { type: "text/csv;charset=utf-8" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = `nextmentor-payout-${runDate.slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <Button variant="secondary" onClick={download} disabled={rows.length === 0}>
      <Download className="size-4" strokeWidth={1.8} aria-hidden="true" />
      Download bank sheet
    </Button>
  );
}

/**
 * Records a transfer that has already left the bank. The UTR is required —
 * without a reference there is no way to prove the payment months later — and
 * recording it debits the member's wallet, so their dashboard stays honest.
 */
export function RecordPayoutControl({
  userId,
  amountInPaise,
}: {
  userId: string;
  amountInPaise: number;
}) {
  const router = useRouter();
  const id = useId();
  const [pending, startTransition] = useTransition();
  const [utr, setUtr] = useState("");
  const [message, setMessage] = useState<{ tone: "error" | "success"; text: string } | null>(null);

  return (
    <div className="flex flex-col gap-2">
      {message && <Alert tone={message.tone}>{message.text}</Alert>}
      <div className="flex gap-2">
        <label htmlFor={id} className="sr-only">
          Bank UTR / reference number
        </label>
        <input
          id={id}
          value={utr}
          onChange={(e) => setUtr(e.target.value)}
          placeholder="Bank UTR / reference"
          className="min-h-10 min-w-0 flex-1 rounded-[var(--radius-control)] border border-[var(--color-border)] bg-[var(--color-card)] px-3 text-[13px]"
        />
        <Button
          size="sm"
          variant="money"
          loading={pending}
          disabled={utr.trim().length < 6}
          onClick={() =>
            startTransition(async () => {
              const res = await recordPayoutRunAction(userId, amountInPaise, utr.trim());
              if (res?.error) setMessage({ tone: "error", text: res.error });
              else if (res?.success) setMessage({ tone: "success", text: res.success });
              setUtr("");
              router.refresh();
            })
          }
        >
          Mark paid
        </Button>
      </div>
    </div>
  );
}

/**
 * Records that a member was paid everything they are owed — ready and still
 * maturing — and sets their balance to ₹0. For transfers made from the bank
 * outside this run, without leaving the page to find the member.
 */
export function SettleBalanceButton({ userId, name }: { userId: string; name: string }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [message, setMessage] = useState<{ tone: "error" | "success"; text: string } | null>(null);

  function settle() {
    const utr = window.prompt(`Bank UTR / reference for ${name} (optional):`, "");
    if (utr === null) return; // cancelled
    if (!window.confirm(`Mark ${name} as paid and set their whole balance to ₹0?\nThey will get a payout settlement email.`)) {
      return;
    }
    startTransition(async () => {
      const fd = new FormData();
      fd.set("utrNumber", utr.trim());
      const res = await settleBalanceAction(userId, null, fd);
      if (res?.error) setMessage({ tone: "error", text: res.error });
      else if (res?.success) setMessage({ tone: "success", text: res.success });
      router.refresh();
    });
  }

  return (
    <div className="flex flex-col items-end gap-1.5">
      <Button size="sm" variant="secondary" loading={pending} onClick={settle}>
        Paid · set ₹0
      </Button>
      {message && (
        <span
          className={
            message.tone === "error"
              ? "text-[12px] text-[var(--color-destructive)]"
              : "text-[12px] text-[var(--color-success)]"
          }
        >
          {message.text}
        </span>
      )}
    </div>
  );
}
