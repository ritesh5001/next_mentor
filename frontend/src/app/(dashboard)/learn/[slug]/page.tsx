import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckCircle2, ChevronLeft, PlayCircle } from "lucide-react";

import { VideoPlayer } from "@/components/player/video-player";
import { Badge } from "@/components/ui/badge";
import { buttonClasses } from "@/components/ui/button";
import { formatTimestamp } from "@/lib/format";
import { cn } from "@/lib/cn";
import { getLearnView, requireUser } from "@/lib/queries";
import { saveProgressAction } from "@/actions";

export const metadata: Metadata = {
  title: "Learn",
  robots: { index: false, follow: false },
};

type Params = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ lesson?: string }>;
};

export default async function LearnPage({ params, searchParams }: Params) {
  const { slug } = await params;
  const { lesson: lessonParam } = await searchParams;

  const user = await requireUser();

  // Entitlement, curriculum and a signed playback URL all come from one API
  // call. The backend checks access before it mints the token — a check here
  // would be advisory only.
  const view = await getLearnView(slug, lessonParam);

  // Null covers both "not enrolled" and "no playable lessons yet". The API
  // returns 403 and 404 respectively, but to the visitor both mean the same
  // thing: there is nothing here to watch, go look at the course page.
  if (!view) {
    return (
      <div className="mx-auto flex max-w-md flex-col items-center gap-4 py-20 text-center">
        <h1 className="text-2xl font-extrabold tracking-tight">Nothing to watch yet</h1>
        <p className="text-sm leading-relaxed text-[var(--color-muted-foreground)]">
          Either you are not enrolled in this course, or its lessons are still
          being prepared.
        </p>
        <Link href={`/courses/${slug}`} className={buttonClasses({ size: "lg" })}>
          View the course
        </Link>
      </div>
    );
  }

  // Token is minted only after everything above passed.
  const playback = view.playback;
  const pct =
    view.totalLessons > 0
      ? Math.round((view.completedLessons / view.totalLessons) * 100)
      : 0;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-1 text-sm font-medium text-[var(--color-muted-foreground)] transition-colors hover:text-[var(--color-foreground)]"
        >
          <ChevronLeft className="size-4" strokeWidth={1.5} aria-hidden="true" />
          My courses
        </Link>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
        {/* --------------------------------------------------------- player */}
        <div className="flex min-w-0 flex-col gap-4">
          {playback ? (
            <VideoPlayer
              key={view.active.id}
              manifestUrl={playback.manifestUrl}
              lessonId={view.active.id}
              startAtSeconds={view.active.lastPositionSeconds}
              onProgress={saveProgressAction}
            />
          ) : (
            <div className="flex aspect-video items-center justify-center rounded-[var(--radius-card)] bg-[var(--color-muted)] text-center">
              <p className="max-w-sm px-6 text-sm text-[var(--color-muted-foreground)]">
                {view.playbackError === "forbidden"
                  ? "You do not have access to this lesson."
                  : "This lesson's video is still processing. Check back shortly."}
              </p>
            </div>
          )}

          <header className="flex flex-col gap-1">
            <h1 className="text-xl font-extrabold tracking-tight sm:text-2xl">
              {view.active.title}
            </h1>
            <p className="text-sm text-[var(--color-muted-foreground)]">
              {view.course.title}
            </p>
          </header>
        </div>

        {/* ----------------------------------------------------- curriculum */}
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="flex flex-col overflow-hidden rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-card)]">
            <div className="flex flex-col gap-2 border-b border-[var(--color-border)] p-4">
              <div className="flex items-baseline justify-between text-sm">
                <span className="font-bold">Course content</span>
                <span className="tabular text-xs text-[var(--color-muted-foreground)]">
                  {view.completedLessons}/{view.totalLessons} · {pct}%
                </span>
              </div>
              <div
                role="progressbar"
                aria-valuenow={pct}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label="Course progress"
                className="h-1.5 overflow-hidden rounded-full bg-[var(--color-muted)]"
              >
                <div
                  className="h-full rounded-full bg-[var(--color-primary)] transition-[width] duration-300"
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>

            <nav aria-label="Course content" className="max-h-[60vh] overflow-y-auto">
              {view.curriculum.map((mod) => (
                <section key={mod.id}>
                  <h2 className="sticky top-0 bg-[var(--color-muted)] px-4 py-2 text-xs font-bold uppercase tracking-wide text-[var(--color-muted-foreground)]">
                    {mod.title}
                  </h2>
                  <ul>
                    {mod.lessons.map((l) => {
                      const active = l.id === view.active.id;
                      return (
                        <li key={l.id}>
                          <Link
                            href={`/learn/${slug}?lesson=${l.id}`}
                            aria-current={active ? "true" : undefined}
                            className={cn(
                              "flex min-h-11 items-center gap-2.5 border-l-2 px-4 py-2.5 text-sm transition-colors",
                              active
                                ? "border-[var(--color-primary)] bg-[var(--color-primary-subtle)] font-semibold"
                                : "border-transparent hover:bg-[var(--color-muted)]",
                              !l.isReady && "pointer-events-none opacity-50",
                            )}
                          >
                            {l.isCompleted ? (
                              <CheckCircle2
                                className="size-4 shrink-0 text-[var(--color-success)]"
                                strokeWidth={1.5}
                                aria-label="Completed"
                              />
                            ) : (
                              <PlayCircle
                                className="size-4 shrink-0 text-[var(--color-muted-foreground)]"
                                strokeWidth={1.5}
                                aria-hidden="true"
                              />
                            )}

                            <span className="flex-1 truncate">{l.title}</span>

                            {!l.isReady ? (
                              <Badge tone="warning">Soon</Badge>
                            ) : l.durationSeconds > 0 ? (
                              <span className="tabular shrink-0 text-xs text-[var(--color-muted-foreground)]">
                                {formatTimestamp(l.durationSeconds)}
                              </span>
                            ) : null}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </section>
              ))}
            </nav>
          </div>
        </aside>
      </div>
    </div>
  );
}
