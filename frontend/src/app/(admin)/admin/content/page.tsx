import type { Metadata } from "next";
import { CalendarClock, FileText, GraduationCap, Lock } from "lucide-react";

import {
  PromoAssetForm,
  TrainingModuleForm,
  MentorshipSlotForm,
  TrainingUploadButton,
} from "@/components/admin/content-forms";
import { ActionButton } from "@/components/admin/row-actions";
import { Badge } from "@/components/ui/badge";
import { formatDuration, formatDate, formatDateTime, isPast } from "@/lib/format";
import { cancelMentorshipSlotAction, createMentorshipSlotAction, createPromoAssetAction, createTrainingModuleAction, deletePromoAssetAction, deleteTrainingModuleAction, requestPromoUploadAction, requestTrainingUploadAction, setPromoAssetActiveAction } from "@/actions/admin";
import { requireAdmin, getAdminContent } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Content",
  robots: { index: false, follow: false },
};

export default async function AdminContentPage() {
  await requireAdmin();

  const { plans: planList, assets, modules, slots } = await getAdminContent();

  return (
    <div className="flex flex-col gap-10">
      <header className="flex flex-col gap-1">
        <h1 className="text-2xl font-extrabold tracking-tight">Content</h1>
        <p className="text-sm text-[var(--color-muted-foreground)]">
          Promotional material, affiliate training and mentorship sessions.
        </p>
      </header>

      {/* ------------------------------------------------------ promo assets */}
      <section className="flex flex-col gap-4">
        <div className="flex items-baseline justify-between gap-2">
          <h2 className="text-lg font-bold tracking-tight">Promotional material</h2>
          <span className="text-xs text-[var(--color-muted-foreground)]">
            {assets.length} asset(s)
          </span>
        </div>

        {assets.length > 0 && (
          <ul className="flex flex-col gap-2">
            {assets.map((a) => (
              <li
                key={a.id}
                className="flex flex-wrap items-center justify-between gap-3 rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-card)] p-4"
              >
                <div className="flex min-w-0 flex-col gap-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-semibold">{a.title}</span>
                    <Badge tone="neutral" className="capitalize">
                      {a.type}
                    </Badge>
                    {!a.isActive && <Badge tone="warning">Hidden</Badge>}
                    {a.planRequiredId && (
                      <Badge tone="primary">
                        <Lock className="size-3" strokeWidth={2} aria-hidden="true" />
                        Gated
                      </Badge>
                    )}
                  </div>
                  {a.description && (
                    <span className="text-xs text-[var(--color-muted-foreground)]">
                      {a.description}
                    </span>
                  )}
                </div>

                <div className="flex items-start gap-2">
                  <ActionButton
                    label={a.isActive ? "Hide" : "Publish"}
                    run={async () => {
                      "use server";
                      return setPromoAssetActiveAction(a.id, !a.isActive);
                    }}
                  />
                  <ActionButton
                    label="Delete"
                    variant="danger"
                    confirm={`Delete "${a.title}"? The uploaded file goes too.`}
                    run={async () => {
                      "use server";
                      return deletePromoAssetAction(a.id);
                    }}
                  />
                </div>
              </li>
            ))}
          </ul>
        )}

        <div className="max-w-2xl rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-card)] p-5">
          <h3 className="mb-4 flex items-center gap-2 font-bold">
            <FileText className="size-4 text-[var(--color-primary)]" strokeWidth={1.5} aria-hidden="true" />
            New asset
          </h3>
          <PromoAssetForm
            action={createPromoAssetAction}
            plans={planList}
            requestUpload={requestPromoUploadAction}
          />
        </div>
      </section>

      {/* --------------------------------------------------- training modules */}
      <section className="flex flex-col gap-4 border-t border-[var(--color-border)] pt-8">
        <div className="flex items-baseline justify-between gap-2">
          <h2 className="text-lg font-bold tracking-tight">Affiliate training</h2>
          <span className="text-xs text-[var(--color-muted-foreground)]">
            {modules.length} module(s)
          </span>
        </div>

        {modules.length > 0 && (
          <ul className="flex flex-col gap-2">
            {modules.map((m) => (
              <li
                key={m.id}
                className="flex flex-wrap items-center justify-between gap-3 rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-card)] p-4"
              >
                <div className="flex min-w-0 flex-col gap-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-semibold">{m.title}</span>
                    <Badge tone={m.streamVideoId ? "success" : "warning"}>
                      {m.streamVideoId ? "Has video" : "No video"}
                    </Badge>
                    {m.planRequiredId && <Badge tone="primary">Gated</Badge>}
                  </div>
                  {m.durationSeconds > 0 && (
                    <span className="tabular text-xs text-[var(--color-muted-foreground)]">
                      {formatDuration(m.durationSeconds)}
                    </span>
                  )}
                </div>

                <div className="flex items-start gap-2">
                  <TrainingUploadButton
                    moduleId={m.id}
                    hasVideo={Boolean(m.streamVideoId)}
                    requestUpload={requestTrainingUploadAction}
                  />
                  <ActionButton
                    label="Delete"
                    variant="danger"
                    confirm={`Delete "${m.title}"? The video goes too.`}
                    run={async () => {
                      "use server";
                      return deleteTrainingModuleAction(m.id);
                    }}
                  />
                </div>
              </li>
            ))}
          </ul>
        )}

        <div className="max-w-2xl rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-card)] p-5">
          <h3 className="mb-4 flex items-center gap-2 font-bold">
            <GraduationCap className="size-4 text-[var(--color-primary)]" strokeWidth={1.5} aria-hidden="true" />
            New module
          </h3>
          <TrainingModuleForm action={createTrainingModuleAction} plans={planList} />
        </div>
      </section>

      {/* ------------------------------------------------------- mentorship */}
      <section className="flex flex-col gap-4 border-t border-[var(--color-border)] pt-8">
        <div className="flex items-baseline justify-between gap-2">
          <h2 className="text-lg font-bold tracking-tight">Mentorship sessions</h2>
          <span className="text-xs text-[var(--color-muted-foreground)]">
            {slots.length} session(s)
          </span>
        </div>

        {slots.length > 0 && (
          <ul className="flex flex-col gap-2">
            {slots.map((s) => {
              const past = isPast(s.startsAt);
              return (
                <li
                  key={s.id}
                  className="flex flex-wrap items-center justify-between gap-3 rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-card)] p-4"
                >
                  <div className="flex min-w-0 flex-col gap-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-semibold">{s.title}</span>
                      {s.isCancelled && <Badge tone="danger">Cancelled</Badge>}
                      {past && !s.isCancelled && <Badge tone="neutral">Past</Badge>}
                      {s.planRequiredId && <Badge tone="primary">Gated</Badge>}
                    </div>
                    <span className="text-xs text-[var(--color-muted-foreground)]">
                      {formatDateTime(s.startsAt)}
                      {" · "}
                      <span className="tabular">
                        {s.bookedCount}/{s.capacity} booked
                      </span>
                      {" · with "}
                      {s.mentorName}
                    </span>
                  </div>

                  {!s.isCancelled && !past && (
                    <ActionButton
                      label="Cancel session"
                      variant="danger"
                      confirm={`Cancel "${s.title}"? Booked attendees keep their record.`}
                      run={async () => {
                        "use server";
                        return cancelMentorshipSlotAction(s.id);
                      }}
                    />
                  )}
                </li>
              );
            })}
          </ul>
        )}

        <div className="max-w-2xl rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-card)] p-5">
          <h3 className="mb-4 flex items-center gap-2 font-bold">
            <CalendarClock className="size-4 text-[var(--color-primary)]" strokeWidth={1.5} aria-hidden="true" />
            Schedule a session
          </h3>
          <MentorshipSlotForm action={createMentorshipSlotAction} plans={planList} />
        </div>
      </section>
    </div>
  );
}
