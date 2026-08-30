"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import type { ActionState } from "@nextmentor/shared";

/**
 * Approve / reject pair where rejection requires a written reason.
 *
 * The reason is mandatory because a rejection with no explanation leaves the
 * user with nothing to correct and generates a support ticket every time.
 */
export function ReviewControls({
  approveLabel,
  rejectLabel,
  reasonLabel,
  onApprove,
  onReject,
}: {
  approveLabel: string;
  rejectLabel: string;
  reasonLabel: string;
  onApprove: () => Promise<ActionState>;
  onReject: (reason: string) => Promise<ActionState>;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [rejecting, setRejecting] = useState(false);
  const [reason, setReason] = useState("");
  const [message, setMessage] = useState<{ tone: "error" | "success"; text: string } | null>(null);

  function run(fn: () => Promise<ActionState>) {
    startTransition(async () => {
      const res = await fn();
      if (res?.error) setMessage({ tone: "error", text: res.error });
      else if (res?.success) {
        setMessage({ tone: "success", text: res.success });
        setRejecting(false);
        setReason("");
      }
      router.refresh();
    });
  }

  return (
    <div className="flex flex-col gap-2">
      {message && <Alert tone={message.tone}>{message.text}</Alert>}

      {rejecting ? (
        <div className="flex flex-col gap-2">
          <label htmlFor="reject-reason" className="text-xs font-medium">
            {reasonLabel}
          </label>
          <textarea
            id="reject-reason"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            rows={2}
            className="w-full rounded-[var(--radius-control)] border border-[var(--color-border)] bg-[var(--color-card)] px-3 py-2 text-sm"
            placeholder="What does the user need to correct?"
          />
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="danger"
              loading={pending}
              disabled={!reason.trim()}
              onClick={() => run(() => onReject(reason))}
            >
              Confirm rejection
            </Button>
            <Button size="sm" variant="ghost" onClick={() => setRejecting(false)}>
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex gap-2">
          <Button size="sm" loading={pending} onClick={() => run(onApprove)}>
            {approveLabel}
          </Button>
          <Button size="sm" variant="secondary" onClick={() => setRejecting(true)}>
            {rejectLabel}
          </Button>
        </div>
      )}
    </div>
  );
}

/** Marks a payout paid, requiring the bank UTR as proof of transfer. */
export function MarkPaidControl({
  onMarkPaid,
}: {
  onMarkPaid: (utr: string) => Promise<ActionState>;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [utr, setUtr] = useState("");
  const [message, setMessage] = useState<{ tone: "error" | "success"; text: string } | null>(null);

  return (
    <div className="flex flex-col gap-2">
      {message && <Alert tone={message.tone}>{message.text}</Alert>}

      <div className="flex gap-2">
        <label htmlFor="utr" className="sr-only">
          Bank UTR / reference number
        </label>
        <input
          id="utr"
          value={utr}
          onChange={(e) => setUtr(e.target.value)}
          placeholder="Bank UTR / reference"
          className="min-h-9 flex-1 rounded-[var(--radius-control)] border border-[var(--color-border)] bg-[var(--color-card)] px-2 text-xs"
        />
        <Button
          size="sm"
          variant="money"
          loading={pending}
          disabled={utr.trim().length < 6}
          onClick={() =>
            startTransition(async () => {
              const res = await onMarkPaid(utr);
              if (res?.error) setMessage({ tone: "error", text: res.error });
              else if (res?.success) setMessage({ tone: "success", text: res.success });
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
