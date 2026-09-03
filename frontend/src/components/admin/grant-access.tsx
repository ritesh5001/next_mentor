"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";

import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import type { ActionState } from "@nextmentor/shared";

/**
 * Gives a user a course or a plan without a payment.
 *
 * One control rather than two: the thing being granted is a single choice, so
 * splitting it into separate course and plan forms would ask the operator to
 * decide twice. The option group says which is which.
 */
export function GrantAccess({
  userId,
  courses,
  plans,
  grant,
}: {
  userId: string;
  courses: Array<{ id: string; title: string }>;
  plans: Array<{ id: string; name: string }>;
  grant: (
    userId: string,
    itemType: "course" | "plan",
    itemId: string,
  ) => Promise<ActionState>;
}) {
  const router = useRouter();
  const [pending, start] = useTransition();
  const [value, setValue] = useState("");
  const [state, setState] = useState<ActionState>(null);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!value) return;

    // "course:<id>" / "plan:<id>" — one <select>, two kinds of thing.
    const [itemType, itemId] = value.split(":") as ["course" | "plan", string];

    start(async () => {
      const result = await grant(userId, itemType, itemId);
      setState(result);
      if (!result?.error) {
        setValue("");
        router.refresh();
      }
    });
  }

  return (
    <form onSubmit={submit} className="flex flex-col gap-3">
      {state?.error && <Alert tone="error">{state.error}</Alert>}
      {state?.success && <Alert tone="success">{state.success}</Alert>}

      <div className="flex flex-wrap items-end gap-3">
        <label className="flex min-w-0 flex-1 flex-col gap-1.5">
          <span className="text-sm font-medium">Give access to</span>
          <select
            value={value}
            onChange={(e) => setValue(e.target.value)}
            required
            className="min-h-11 rounded-[var(--radius-control)] border border-[var(--color-border)] bg-[var(--color-card)] px-3 text-sm"
          >
            <option value="">Choose a course or plan…</option>
            {plans.length > 0 && (
              <optgroup label="Plans">
                {plans.map((p) => (
                  <option key={p.id} value={`plan:${p.id}`}>
                    {p.name}
                  </option>
                ))}
              </optgroup>
            )}
            {courses.length > 0 && (
              <optgroup label="Courses">
                {courses.map((c) => (
                  <option key={c.id} value={`course:${c.id}`}>
                    {c.title}
                  </option>
                ))}
              </optgroup>
            )}
          </select>
        </label>

        <Button type="submit" loading={pending} disabled={!value}>
          <Plus className="size-4" strokeWidth={2} aria-hidden="true" />
          Grant
        </Button>
      </div>

      <p className="text-xs leading-relaxed text-[var(--color-muted-foreground)]">
        No payment is recorded and no referral commission is paid. A granted
        plan replaces any membership already running, and expires on the plan&apos;s
        own schedule.
      </p>
    </form>
  );
}
