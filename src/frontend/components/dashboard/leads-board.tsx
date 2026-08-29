"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { Mail, Phone, Plus, Trash2 } from "lucide-react";

import { Alert } from "@/frontend/components/ui/alert";
import { Button } from "@/frontend/components/ui/button";
import { Field } from "@/frontend/components/ui/field";
import { cn } from "@/frontend/lib/cn";
import type { ActionState, FormAction } from "@/shared/action-state";

export type LeadStatus = "new" | "contacted" | "qualified" | "converted" | "lost";

export type LeadRow = {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  source: string | null;
  status: LeadStatus;
  notes: string | null;
  createdAt: Date;
};

const COLUMNS: { status: LeadStatus; label: string; accent: string }[] = [
  { status: "new", label: "New", accent: "border-t-[var(--color-muted-foreground)]" },
  { status: "contacted", label: "Contacted", accent: "border-t-[var(--color-primary)]" },
  { status: "qualified", label: "Qualified", accent: "border-t-[var(--color-accent)]" },
  { status: "converted", label: "Converted", accent: "border-t-[var(--color-success)]" },
  { status: "lost", label: "Lost", accent: "border-t-[var(--color-destructive)]" },
];

function AddButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" loading={pending}>
      {pending ? "Adding…" : "Add lead"}
    </Button>
  );
}

export function LeadsBoard({
  leads,
  createLead,
  updateStatus,
  deleteLead,
}: {
  leads: LeadRow[];
  createLead: FormAction;
  updateStatus: (leadId: string, status: LeadStatus) => Promise<ActionState>;
  deleteLead: (leadId: string) => Promise<ActionState>;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [showForm, setShowForm] = useState(false);
  const [state, formAction] = useActionState<ActionState, FormData>(createLead, null);
  const [message, setMessage] = useState<string | null>(null);

  function run(fn: () => Promise<ActionState>) {
    startTransition(async () => {
      const res = await fn();
      setMessage(res?.error ?? null);
      router.refresh();
    });
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-3">
        <Button onClick={() => setShowForm((v) => !v)} variant={showForm ? "secondary" : "primary"}>
          <Plus className="size-4" strokeWidth={1.5} aria-hidden="true" />
          {showForm ? "Cancel" : "Add a lead"}
        </Button>
      </div>

      {message && <Alert tone="error">{message}</Alert>}

      {showForm && (
        <form
          action={formAction}
          className="flex flex-col gap-4 rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-card)] p-5"
          noValidate
        >
          {state?.error && <Alert tone="error">{state.error}</Alert>}
          {state?.success && <Alert tone="success">{state.success}</Alert>}

          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Name" name="name" required placeholder="Rahul Sharma" />
            <Field label="Source" name="source" placeholder="Instagram DM" />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Email" name="email" type="email" inputMode="email" placeholder="rahul@example.com" />
            <Field label="Phone" name="phone" type="tel" inputMode="tel" placeholder="9876543210" />
          </div>
          <Field label="Notes" name="notes" placeholder="Interested in Meta Ads, follow up Friday" />

          <div>
            <AddButton />
          </div>
        </form>
      )}

      {/* Horizontal scroll is contained here so the page body never scrolls
          sideways on mobile. */}
      <div className="overflow-x-auto pb-2">
        <div className="flex min-w-[900px] gap-3">
          {COLUMNS.map((col) => {
            const items = leads.filter((l) => l.status === col.status);

            return (
              <section
                key={col.status}
                className={cn(
                  "flex w-full flex-col gap-2 rounded-[var(--radius-card)] border border-t-2 border-[var(--color-border)] bg-[var(--color-muted)]/40 p-2",
                  col.accent,
                )}
              >
                <h2 className="flex items-center justify-between px-1 py-1 text-xs font-bold uppercase tracking-wide text-[var(--color-muted-foreground)]">
                  {col.label}
                  <span className="tabular rounded-full bg-[var(--color-card)] px-1.5 py-0.5">
                    {items.length}
                  </span>
                </h2>

                {items.length === 0 ? (
                  <p className="px-1 py-4 text-center text-xs text-[var(--color-muted-foreground)]">
                    Nothing here
                  </p>
                ) : (
                  <ul className="flex flex-col gap-2">
                    {items.map((lead) => (
                      <li
                        key={lead.id}
                        className="flex flex-col gap-2 rounded-[var(--radius-control)] border border-[var(--color-border)] bg-[var(--color-card)] p-3"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <span className="text-sm font-semibold leading-snug">{lead.name}</span>
                          <button
                            type="button"
                            disabled={pending}
                            onClick={() => {
                              if (confirm(`Remove ${lead.name} from your leads?`)) {
                                run(() => deleteLead(lead.id));
                              }
                            }}
                            aria-label={`Delete lead ${lead.name}`}
                            className="flex size-7 shrink-0 items-center justify-center rounded text-[var(--color-muted-foreground)] transition-colors hover:bg-[var(--color-destructive-subtle)] hover:text-[var(--color-destructive)]"
                          >
                            <Trash2 className="size-3.5" strokeWidth={1.5} aria-hidden="true" />
                          </button>
                        </div>

                        {lead.email && (
                          <a
                            href={`mailto:${lead.email}`}
                            className="flex items-center gap-1.5 truncate text-xs text-[var(--color-muted-foreground)] hover:text-[var(--color-primary)]"
                          >
                            <Mail className="size-3 shrink-0" strokeWidth={1.5} aria-hidden="true" />
                            {lead.email}
                          </a>
                        )}
                        {lead.phone && (
                          <a
                            href={`tel:${lead.phone}`}
                            className="flex items-center gap-1.5 text-xs text-[var(--color-muted-foreground)] hover:text-[var(--color-primary)]"
                          >
                            <Phone className="size-3 shrink-0" strokeWidth={1.5} aria-hidden="true" />
                            {lead.phone}
                          </a>
                        )}
                        {lead.notes && (
                          <p className="line-clamp-2 text-xs leading-relaxed text-[var(--color-muted-foreground)]">
                            {lead.notes}
                          </p>
                        )}

                        {/* A <select> rather than drag-and-drop: dragging needs
                            a keyboard alternative anyway, and this one works
                            on a phone. */}
                        <label className="sr-only" htmlFor={`status-${lead.id}`}>
                          Status for {lead.name}
                        </label>
                        <select
                          id={`status-${lead.id}`}
                          value={lead.status}
                          disabled={pending}
                          onChange={(e) =>
                            run(() => updateStatus(lead.id, e.target.value as LeadStatus))
                          }
                          className="min-h-9 rounded-[var(--radius-control)] border border-[var(--color-border)] bg-[var(--color-card)] px-2 text-xs font-medium"
                        >
                          {COLUMNS.map((c) => (
                            <option key={c.status} value={c.status}>
                              {c.label}
                            </option>
                          ))}
                        </select>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
}
