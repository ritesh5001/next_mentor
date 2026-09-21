"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { Award } from "lucide-react";

import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { issueCertificateAction, type ActionState } from "@/actions/admin";

function Submit() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" size="lg" loading={pending} className="w-full sm:w-auto">
      {pending ? "Issuing…" : "Issue certificate"}
    </Button>
  );
}

/**
 * Issue a certificate by hand. Everything except the two names is optional:
 * linking a member makes it appear in their dashboard, and picking a course
 * ties it to the catalogue, but neither is needed to award one.
 */
export function CertificateForm({ courses }: { courses: { id: string; title: string }[] }) {
  const [state, action] = useActionState<ActionState, FormData>(issueCertificateAction, null);

  return (
    <section className="rounded-[22px] bg-white p-5 shadow-[0_18px_40px_-32px_rgb(16_26_71/0.45)] ring-1 ring-[rgb(16_26_71/0.07)] sm:p-6">
      <div className="flex items-start gap-3">
        <span className="flex size-11 shrink-0 items-center justify-center rounded-[14px] bg-[linear-gradient(145deg,#1b3fa0,#101a47)] text-white">
          <Award className="size-5" strokeWidth={1.8} aria-hidden="true" />
        </span>
        <div>
          <h2 className="text-[17px] font-semibold text-[var(--brand-ink)]">Issue a certificate</h2>
          <p className="mt-0.5 text-sm text-[var(--color-muted-foreground)]">
            For anyone — an offline batch, a workshop, or a member whose progress was lost. The PDF
            and its public verification page work exactly like an earned one.
          </p>
        </div>
      </div>

      <form action={action} className="mt-5 grid gap-4 sm:grid-cols-2">
        {state?.error && <Alert tone="error" className="sm:col-span-2">{state.error}</Alert>}
        {state?.success && <Alert tone="success" className="sm:col-span-2">{state.success}</Alert>}

        <Field
          label="Recipient name"
          name="recipientName"
          required
          autoComplete="off"
          placeholder="Printed on the certificate"
        />
        <Field
          label="Course name"
          name="courseTitle"
          required
          autoComplete="off"
          placeholder="e.g. Meta Ads"
          hint="Typed as it should appear."
        />

        <Field
          label="Member (optional)"
          name="memberRef"
          autoComplete="off"
          placeholder="email or member ID"
          hint="Links it to an account so it shows in their dashboard."
        />

        <div className="flex flex-col gap-1.5">
          <label htmlFor="cert-course" className="text-sm font-medium">
            Catalogue course (optional)
          </label>
          <select
            id="cert-course"
            name="courseId"
            defaultValue=""
            className="min-h-11 rounded-[var(--radius-control)] border border-[var(--color-border)] bg-[var(--color-card)] px-3 text-[16px]"
          >
            <option value="">Not linked to a course</option>
            {courses.map((c) => (
              <option key={c.id} value={c.id}>
                {c.title}
              </option>
            ))}
          </select>
          <p className="text-xs text-[var(--color-muted-foreground)]">
            Only needed to stop a duplicate for a member who already earned it.
          </p>
        </div>

        <Field
          label="Issue date (optional)"
          name="issuedOn"
          type="date"
          hint="Leave blank for today."
          containerClassName="sm:col-span-2"
        />

        <div className="sm:col-span-2">
          <Submit />
        </div>
      </form>
    </section>
  );
}
