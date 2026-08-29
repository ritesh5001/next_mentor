import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { BookOpen, PlayCircle } from "lucide-react";

import { requireUser } from "@/backend/lib/permissions";
import { getEnrolledCourses } from "@/backend/services/courses";
import { buttonClasses } from "@/frontend/components/ui/button";
import { assetUrl } from "@/frontend/lib/format";

export const metadata: Metadata = {
  title: "My courses",
  robots: { index: false, follow: false },
};

export default async function DashboardPage() {
  const user = await requireUser();
  const courses = await getEnrolledCourses(user.id);

  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-col gap-1">
        <h1 className="text-2xl font-extrabold tracking-tight">
          Welcome{user.name ? `, ${user.name.split(" ")[0]}` : ""}
        </h1>
        <p className="text-sm text-[var(--color-muted-foreground)]">
          {courses.length === 0
            ? "You have not enrolled in anything yet."
            : `You have ${courses.length} course${courses.length === 1 ? "" : "s"}.`}
        </p>
      </header>

      {courses.length === 0 ? (
        <div className="flex flex-col items-center gap-3 rounded-[var(--radius-card)] border border-dashed border-[var(--color-border)] bg-[var(--color-card)] px-6 py-16 text-center">
          <BookOpen
            className="size-8 text-[var(--color-muted-foreground)]"
            strokeWidth={1.5}
            aria-hidden="true"
          />
          <h2 className="text-lg font-bold">Nothing here yet</h2>
          <p className="max-w-sm text-sm text-[var(--color-muted-foreground)]">
            Browse the catalog and enrol in your first course to get started.
          </p>
          <Link href="/courses" className={buttonClasses({ className: "mt-2" })}>
            Browse courses
          </Link>
        </div>
      ) : (
        <div className="stagger-in grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {courses.map((course) => {
            const thumb = assetUrl(course.thumbnailKey);
            const pct =
              course.lessonCount > 0
                ? Math.round((course.completedCount / course.lessonCount) * 100)
                : 0;

            return (
              <article
                key={course.id}
                className="group relative flex flex-col overflow-hidden rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-card)] shadow-[var(--shadow-card)] transition-shadow duration-200 hover:shadow-[var(--shadow-raised)]"
              >
                <div className="relative aspect-video bg-[var(--color-muted)]">
                  {thumb ? (
                    <Image
                      src={thumb}
                      alt=""
                      fill
                      sizes="(max-width: 640px) 100vw, 33vw"
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <PlayCircle
                        className="size-10 text-[var(--color-muted-foreground)]"
                        strokeWidth={1.5}
                        aria-hidden="true"
                      />
                    </div>
                  )}
                </div>

                <div className="flex flex-1 flex-col gap-3 p-4">
                  <h2 className="text-base font-bold leading-snug tracking-tight">
                    <Link
                      href={`/learn/${course.slug}`}
                      className="after:absolute after:inset-0"
                    >
                      {course.title}
                    </Link>
                  </h2>

                  <div className="mt-auto flex flex-col gap-1.5">
                    <div className="flex items-baseline justify-between text-xs">
                      <span className="font-medium text-[var(--color-muted-foreground)]">
                        {course.completedCount} of {course.lessonCount} lessons
                      </span>
                      <span className="tabular font-bold">{pct}%</span>
                    </div>

                    {/* Progress is conveyed by the number as well as the bar —
                        never by fill width alone. */}
                    <div
                      role="progressbar"
                      aria-valuenow={pct}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-label={`${course.title} progress`}
                      className="h-1.5 overflow-hidden rounded-full bg-[var(--color-muted)]"
                    >
                      <div
                        className="h-full rounded-full bg-[var(--color-primary)] transition-[width] duration-300"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
