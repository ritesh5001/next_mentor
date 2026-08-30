import type { Metadata } from "next";
import { formatDate, formatDateTime } from "@/lib/format";
import Link from "next/link";
import { CalendarClock, ExternalLink, Users, Video } from "lucide-react";

import { ActionButton } from "@/components/admin/row-actions";
import { Badge } from "@/components/ui/badge";
import { buttonClasses } from "@/components/ui/button";
import { getMentorshipSlots, requireUser } from "@/lib/queries";
import { bookSlotAction, cancelBookingAction } from "@/actions";

export const metadata: Metadata = {
  title: "Premium mentorship",
  robots: { index: false, follow: false },
};

/** Slot times arrive as ISO strings over JSON, not Date objects. */
function formatSlot(startsAt: string, endsAt: string) {
  const date = formatDate(startsAt, { weekday: "short", day: "numeric", month: "short" });
  const clock = (iso: string) =>
    new Date(iso).toLocaleTimeString("en-IN", { hour: "numeric", minute: "2-digit" });
  return { date, time: `${clock(startsAt)} – ${clock(endsAt)}` };
}

export default async function MentorshipPage() {
  const user = await requireUser();
  const slots = await getMentorshipSlots();

  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-col gap-1">
        <h1 className="text-2xl font-extrabold tracking-tight">Premium mentorship</h1>
        <p className="text-sm text-[var(--color-muted-foreground)]">
          Live sessions with practitioners. Book a seat and the joining link appears here.
        </p>
      </header>

      {slots.length === 0 ? (
        <div className="flex flex-col items-center gap-3 rounded-[var(--radius-card)] border border-dashed border-[var(--color-border)] bg-[var(--color-card)] px-6 py-16 text-center">
          <CalendarClock
            className="size-8 text-[var(--color-muted-foreground)]"
            strokeWidth={1.5}
            aria-hidden="true"
          />
          <h2 className="text-lg font-bold">No sessions scheduled</h2>
          <p className="max-w-sm text-sm text-[var(--color-muted-foreground)]">
            New mentorship sessions are announced here. Check back soon.
          </p>
        </div>
      ) : (
        <ul className="flex flex-col gap-4">
          {slots.map((s) => {
            const { date, time } = formatSlot(s.startsAt, s.endsAt);
            const full = s.seatsLeft === 0 && !s.isBooked;

            return (
              <li
                key={s.id}
                className="flex flex-col gap-4 rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-card)] p-5 lg:flex-row lg:items-center lg:justify-between"
              >
                <div className="flex min-w-0 flex-col gap-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="font-bold leading-snug">{s.title}</h2>
                    {s.isBooked && <Badge tone="success">Booked</Badge>}
                    {s.planRequiredName && (
                      <Badge tone="primary">{s.planRequiredName} only</Badge>
                    )}
                    {full && <Badge tone="neutral">Full</Badge>}
                  </div>

                  {s.description && (
                    <p className="text-sm leading-relaxed text-[var(--color-muted-foreground)]">
                      {s.description}
                    </p>
                  )}

                  <dl className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[var(--color-muted-foreground)]">
                    <div className="flex items-center gap-1.5">
                      <CalendarClock className="size-3.5" strokeWidth={1.5} aria-hidden="true" />
                      <dt className="sr-only">When</dt>
                      <dd>
                        {date} · {time}
                      </dd>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Users className="size-3.5" strokeWidth={1.5} aria-hidden="true" />
                      <dt className="sr-only">Seats</dt>
                      <dd className="tabular">
                        {s.seatsLeft} of {s.capacity} left
                      </dd>
                    </div>
                    <div>
                      <dt className="sr-only">Mentor</dt>
                      <dd>with {s.mentorName}</dd>
                    </div>
                  </dl>

                  {/* The link only exists in the payload when a booking is
                      held — the server strips it otherwise. */}
                  {s.isBooked && s.meetingUrl && (
                    <a
                      href={s.meetingUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={buttonClasses({ size: "sm", className: "mt-1 w-fit" })}
                    >
                      <Video className="size-3.5" strokeWidth={1.5} aria-hidden="true" />
                      Join the session
                      <ExternalLink className="size-3" strokeWidth={1.5} aria-hidden="true" />
                    </a>
                  )}
                </div>

                <div className="lg:shrink-0">
                  {s.isBooked ? (
                    <ActionButton
                      label="Cancel booking"
                      variant="secondary"
                      confirm="Cancel your seat? Someone else may take it."
                      run={async () => {
                        "use server";
                        return cancelBookingAction(s.id);
                      }}
                    />
                  ) : full ? (
                    <span className="text-xs text-[var(--color-muted-foreground)]">
                      No seats left
                    </span>
                  ) : (
                    <ActionButton
                      label="Book a seat"
                      busyLabel="Booking…"
                      variant="primary"
                      run={async () => {
                        "use server";
                        return bookSlotAction(s.id);
                      }}
                    />
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      )}

      <p className="text-xs text-[var(--color-muted-foreground)]">
        Some sessions are limited to higher plans.{" "}
        <Link href="/dashboard/plan" className="font-semibold text-[var(--color-primary)] hover:underline">
          See what your plan includes
        </Link>
        .
      </p>
    </div>
  );
}
