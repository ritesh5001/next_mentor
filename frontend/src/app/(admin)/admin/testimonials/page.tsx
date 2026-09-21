import type { Metadata } from "next";
import { BadgeCheck } from "lucide-react";

import { ActionButton } from "@/components/admin/row-actions";
import { Badge } from "@/components/ui/badge";
import { TestimonialForm } from "@/components/admin/testimonial-form";
import { deleteTestimonialAction, setTestimonialPublishedAction } from "@/actions/admin";
import { formatDate } from "@/lib/format";
import { listTestimonialsForAdmin, requireAdmin } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Student feedback",
  robots: { index: false, follow: false },
};

/** Where staff collect the homepage's student feedback. */
export default async function AdminTestimonialsPage() {
  await requireAdmin();
  const items = await listTestimonialsForAdmin();
  const live = items.filter((t) => t.isPublished).length;

  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold tracking-tight">Student feedback</h1>
        <p className="text-sm text-[var(--color-muted-foreground)]">
          {live} shown on the homepage{items.length !== live ? `, ${items.length - live} hidden` : ""}.
          Three or more turns the homepage section into a moving carousel.
        </p>
      </header>

      <TestimonialForm />

      {items.length === 0 ? (
        <p className="rounded-[18px] border border-dashed border-[rgb(16_26_71/0.14)] bg-white px-6 py-12 text-center text-sm text-[var(--color-muted-foreground)]">
          No feedback yet. Add the first one above.
        </p>
      ) : (
        <ul className="flex flex-col gap-3">
          {items.map((t) => (
            <li
              key={t.id}
              className="flex flex-col gap-3 rounded-[18px] bg-white p-5 ring-1 ring-[rgb(16_26_71/0.07)] sm:flex-row sm:items-start sm:justify-between"
            >
              <div className="min-w-0">
                <p className="flex flex-wrap items-center gap-2 text-[15px] font-semibold text-[var(--brand-ink)]">
                  {t.name}
                  <BadgeCheck className="size-4 fill-[#1d9bf0] text-white" strokeWidth={2.2} aria-hidden="true" />
                  {!t.isPublished && <Badge tone="neutral">Hidden</Badge>}
                </p>
                <p className="mt-0.5 text-[12.5px] text-[var(--color-muted-foreground)]">
                  {[t.who, t.course].filter(Boolean).join(" · ") || "—"} · added {formatDate(t.createdAt)}
                </p>
                <p className="mt-2 max-w-2xl text-[14.5px] leading-relaxed text-[var(--brand-ink)]/85">
                  {t.body}
                </p>
              </div>

              <div className="flex shrink-0 items-start gap-2">
                <ActionButton
                  run={setTestimonialPublishedAction.bind(null, t.id, !t.isPublished)}
                  label={t.isPublished ? "Hide" : "Show"}
                  variant="secondary"
                />
                <ActionButton
                  run={deleteTestimonialAction.bind(null, t.id)}
                  label="Delete"
                  variant="danger"
                  confirm={`Delete the feedback from ${t.name}? This cannot be undone.`}
                />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
