import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { BookOpen, PlayCircle } from "lucide-react";

import { buttonClasses } from "@/components/ui/button";
import { Avatar, PageHeader } from "@/components/dashboard/panels";
import { assetUrl } from "@/lib/format";
import { getActiveSubscription, getEnrolledCourses, requireUser } from "@/lib/queries";

export const metadata: Metadata = {
  title: "My courses",
  robots: { index: false, follow: false },
};

export default async function DashboardPage() {
  const [user, courses, subscription] = await Promise.all([
    requireUser(),
    getEnrolledCourses(),
    getActiveSubscription(),
  ]);

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title={
          <>
            Welcome{" "}
            <span className="brand-gradient-text">
              {user.name ? user.name.split(" ")[0] : "back"}
            </span>
          </>
        }
        subtitle={
          courses.length === 0
            ? "You have not enrolled in anything yet."
            : `${courses.length} course${courses.length === 1 ? "" : "s"} in your library.`
        }
        // The plan sits opposite the greeting, as on the reference: it is the
        // one piece of account state worth seeing on every visit.
        aside={
          <span className="pill inline-flex items-center gap-2 border border-[var(--color-border)] bg-[var(--color-card)] px-4 py-2 text-sm font-bold text-[var(--brand-blue)] shadow-[var(--shadow-card)]">
            {subscription?.planName ?? "No plan"}
          </span>
        }
      />

      {courses.length === 0 ? (
        <div className="flex flex-col items-center gap-3 rounded-[var(--radius-card)] border border-dashed border-[var(--color-border)] bg-[var(--color-card)] px-6 py-16 text-center">
          <BookOpen
            className="size-8 text-[var(--color-muted-foreground)]"
            strokeWidth={1.5}
            aria-hidden="true"
          />
          <h2 className="text-lg font-bold">Nothing here yet</h2>
          <p className="max-w-sm text-sm text-[var(--color-muted-foreground)]">
            Browse the catalogue and enrol in your first course to get started.
          </p>
          <Link href="/courses" className={buttonClasses({ className: "mt-2" })}>
            Browse courses
          </Link>
        </div>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {courses.map((course) => {
            const thumb = assetUrl(course.thumbnailKey, { width: 640 });
            const pct =
              course.lessonCount > 0
                ? Math.round((course.completedCount / course.lessonCount) * 100)
                : 0;

            return (
              <li key={course.id}>
                <Link
                  href={`/learn/${course.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-card)] shadow-[var(--shadow-card)] transition-transform duration-200 ease-out hover:-translate-y-1 hover:shadow-[var(--shadow-raised)]"
                >
                  {/* Fixed 16:9 box so a missing thumbnail cannot change the
                      card's height and reflow the whole grid. */}
                  <div className="relative aspect-video w-full overflow-hidden bg-[var(--color-muted)]">
                    {thumb ? (
                      <Image
                        src={thumb}
                        alt=""
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
                        className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
                      />
                    ) : (
                      <span className="flex h-full items-center justify-center">
                        <PlayCircle
                          className="size-10 text-[var(--color-muted-foreground)]"
                          strokeWidth={1.2}
                          aria-hidden="true"
                        />
                      </span>
                    )}

                    <span className="absolute inset-x-0 bottom-0 h-1 bg-black/10">
                      <span
                        className="block h-full"
                        style={{ width: `${pct}%`, background: "var(--brand-gradient)" }}
                      />
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col gap-1 p-4">
                    <h2 className="line-clamp-2 text-[15px] font-bold leading-snug text-[var(--color-foreground)]">
                      {course.title}
                    </h2>
                    <p className="tabular text-xs text-[var(--color-muted-foreground)]">
                      {course.completedCount} of {course.lessonCount} lessons · {pct}%
                    </p>
                  </div>

                  {/* Instructor row, split off by a rule, as on the reference. */}
                  <div className="flex items-center gap-2 border-t border-[var(--color-border)] px-4 py-3">
                    <Avatar name={course.instructorName ?? "NextMentor"} size={28} />
                    <span className="truncate text-xs text-[var(--color-muted-foreground)]">
                      by {course.instructorName ?? "NextMentor"}
                    </span>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
