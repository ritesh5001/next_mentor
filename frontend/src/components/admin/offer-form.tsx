"use client";

import { useActionState, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Plus, Trash2 } from "lucide-react";

import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import {
  createOfferAction,
  deleteOfferAction,
  setOfferPublishedAction,
  updateOfferAction,
} from "@/actions/admin";
import type { ActionState } from "@/actions/admin";
import type { AdminOffer, OfferCriterion, OfferMetric } from "@/lib/queries";

const METRICS: Array<{ value: OfferMetric; label: string; unit: string }> = [
  { value: "referrals", label: "New members joined under them", unit: "people" },
  { value: "sales", label: "Packages sold through their link", unit: "sales" },
  { value: "earnings", label: "Commission earned", unit: "₹" },
];

const EMPTY: ActionState = {};

/** `datetime-local` wants "YYYY-MM-DDTHH:mm" in local time, not an ISO string. */
function forInput(iso: string | null | undefined): string {
  if (!iso) return "";
  const d = new Date(iso);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

/**
 * Create or edit an offer.
 *
 * The targets are the substance: each row is a metric the ledger already
 * tracks, so a member's progress can be worked out without anyone filling in a
 * spreadsheet. They post as one JSON field rather than as indexed inputs,
 * which keeps adding and removing rows from renumbering the whole form.
 */
export function OfferForm({ offer }: { offer?: AdminOffer }) {
  const router = useRouter();
  const [state, action, pending] = useActionState(
    offer ? updateOfferAction.bind(null, offer.id) : createOfferAction,
    EMPTY,
  );
  const [criteria, setCriteria] = useState<OfferCriterion[]>(
    offer?.criteria?.length ? offer.criteria : [{ metric: "referrals", target: 10 }],
  );

  function update(i: number, patch: Partial<OfferCriterion>) {
    setCriteria((rows) => rows.map((r, n) => (n === i ? { ...r, ...patch } : r)));
  }

  return (
    <form
      action={(fd) => {
        // Earnings targets are typed in rupees and stored in paise, like
        // every other amount in the system.
        fd.set(
          "criteria",
          JSON.stringify(
            criteria
              .filter((c) => c.target > 0)
              .map((c) => ({
                metric: c.metric,
                target: c.metric === "earnings" ? Math.round(c.target * 100) : Math.round(c.target),
                ...(c.label?.trim() ? { label: c.label.trim() } : {}),
              })),
          ),
        );
        action(fd);
        router.refresh();
      }}
      className="flex flex-col gap-4"
    >
      {state?.error && <Alert tone="error">{state.error}</Alert>}
      {state?.success && <Alert tone="success">{state.success}</Alert>}

      <Field label="Title" name="title" required defaultValue={offer?.title} placeholder="Diwali referral contest" />
      <Field
        label="Reward"
        name="reward"
        required
        defaultValue={offer?.reward}
        placeholder="Goa trip for two"
        hint="What they win. Shown as the badge on the member's card."
      />
      <Field
        label="Description (optional)"
        name="description"
        defaultValue={offer?.description ?? ""}
        placeholder="Open to all active members."
      />
      <Field
        label="Image URL (optional)"
        name="imageUrl"
        type="url"
        defaultValue={offer?.imageUrl ?? ""}
        placeholder="https://…"
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <Field
          label="Starts"
          name="startsAt"
          type="datetime-local"
          required
          defaultValue={forInput(offer?.startsAt) || forInput(new Date().toISOString())}
          hint="Only activity after this counts."
        />
        <Field
          label="Ends (optional)"
          name="endsAt"
          type="datetime-local"
          defaultValue={forInput(offer?.endsAt)}
          hint="Leave blank to run it open-ended."
        />
      </div>

      {/* Targets */}
      <fieldset className="flex min-w-0 flex-col gap-3 rounded-[var(--radius-card)] border border-[var(--color-border)] p-4">
        <legend className="px-1 text-sm font-semibold">Targets to qualify</legend>
        <p className="text-xs text-[var(--color-muted-foreground)]">
          A member qualifies once every target is met. Their dashboard shows a live bar per target.
        </p>

        {criteria.map((c, i) => (
          <div key={i} className="flex flex-wrap items-end gap-2">
            <label className="flex min-w-[12rem] flex-1 flex-col gap-1 text-xs font-medium">
              Measure
              <select
                value={c.metric}
                onChange={(e) => update(i, { metric: e.target.value as OfferMetric })}
                className="min-h-10 rounded-[var(--radius-control)] border border-[var(--color-border)] bg-[var(--color-card)] px-2 text-sm"
              >
                {METRICS.map((m) => (
                  <option key={m.value} value={m.value}>
                    {m.label}
                  </option>
                ))}
              </select>
            </label>
            <label className="flex w-28 flex-col gap-1 text-xs font-medium">
              Target {METRICS.find((m) => m.value === c.metric)?.unit}
              <input
                type="number"
                min={1}
                value={c.metric === "earnings" && offer ? c.target / 100 : c.target}
                onChange={(e) => update(i, { target: Number(e.target.value) })}
                className="min-h-10 rounded-[var(--radius-control)] border border-[var(--color-border)] bg-[var(--color-card)] px-2 text-sm"
              />
            </label>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              aria-label="Remove this target"
              onClick={() => setCriteria((rows) => rows.filter((_, n) => n !== i))}
              disabled={criteria.length === 1}
            >
              <Trash2 className="size-4" strokeWidth={1.8} aria-hidden="true" />
            </Button>
          </div>
        ))}

        <Button
          type="button"
          variant="secondary"
          size="sm"
          className="self-start"
          onClick={() => setCriteria((rows) => [...rows, { metric: "sales", target: 5 }])}
        >
          <Plus className="size-4" strokeWidth={2} aria-hidden="true" />
          Add a target
        </Button>
      </fieldset>

      <label className="flex cursor-pointer items-center gap-2.5 text-sm">
        <input
          type="checkbox"
          name="isPublished"
          defaultChecked={offer?.isPublished ?? false}
          className="size-4 accent-[var(--brand-blue)]"
        />
        Release to members now
      </label>

      <input type="hidden" name="position" value={offer?.position ?? 0} readOnly />

      <Button type="submit" loading={pending}>
        {offer ? "Save changes" : "Create offer"}
      </Button>
    </form>
  );
}

/** Release / withdraw / delete, without opening the whole editor. */
export function OfferControls({ offer }: { offer: AdminOffer }) {
  const router = useRouter();
  const [pending, start] = useTransition();
  const [message, setMessage] = useState<{ tone: "error" | "success"; text: string } | null>(null);
  const [confirming, setConfirming] = useState(false);

  const act = (fn: () => Promise<ActionState>) =>
    start(async () => {
      const res = await fn();
      if (res?.error) setMessage({ tone: "error", text: res.error });
      else if (res?.success) setMessage({ tone: "success", text: res.success });
      router.refresh();
    });

  return (
    <div className="flex flex-col gap-2">
      {message && <Alert tone={message.tone}>{message.text}</Alert>}
      <div className="flex flex-wrap gap-2">
        <Button
          size="sm"
          variant={offer.isPublished ? "secondary" : "primary"}
          loading={pending}
          onClick={() => act(() => setOfferPublishedAction(offer.id, !offer.isPublished))}
        >
          {offer.isPublished ? "Withdraw" : "Release to members"}
        </Button>
        {confirming ? (
          <>
            <Button size="sm" variant="danger" loading={pending} onClick={() => act(() => deleteOfferAction(offer.id))}>
              Delete for good
            </Button>
            <Button size="sm" variant="ghost" onClick={() => setConfirming(false)}>
              Cancel
            </Button>
          </>
        ) : (
          <Button size="sm" variant="ghost" onClick={() => setConfirming(true)}>
            Delete
          </Button>
        )}
      </div>
    </div>
  );
}
