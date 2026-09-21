import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, BookOpen, Play, PlayCircle } from "lucide-react";

import { buttonClasses } from "@/components/ui/button";
import { Avatar } from "@/components/dashboard/panels";
import { cn } from "@/lib/cn";
import { assetUrl } from "@/lib/format";
import { getActiveSubscription, getEnrolledCourses, getProfile } from "@/lib/queries";

export const metadata: Metadata = {
  title: "My courses",
  robots: { index: false, follow: false },
};

export default async function DashboardPage() {
  const [profile, courses, subscription] = await Promise.all([
    getProfile(),
    getEnrolledCourses(),
    getActiveSubscription(),
  ]);

  // Greet by first name, or by the part before the @ when no name is on file.
  const firstName = profile.name?.trim().split(" ")[0] || profile.email.split("@")[0];
  const withPct = courses.map((c) => ({
    ...c,
    pct: c.lessonCount > 0 ? Math.round((c.completedCount / c.lessonCount) * 100) : 0,
  }));
  const done = withPct.filter((c) => c.pct === 100).length;
  const lessonsDone = withPct.reduce((n, c) => n + c.completedCount, 0);
  // Resume the course already under way; otherwise the first not finished.
  const resume =
    withPct.find((c) => c.pct > 0 && c.pct < 100) ?? withPct.find((c) => c.pct < 100) ?? null;

  return (
    <div className="flex flex-col gap-8">
      {/* Welcome banner — the same navy-to-green stage as the homepage. */}
      <section className="relative overflow-hidden rounded-[26px] bg-[linear-gradient(135deg,#101a47_0%,#132a6b_55%,#0b4a34_100%)] p-6 text-white sm:p-8">
        <span
          aria-hidden="true"
          className="absolute -right-20 -top-24 size-72 rounded-full bg-[radial-gradient(circle,rgb(61_220_114/0.3),transparent_65%)]"
        />
        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[var(--brand-green-bright)]">
              {subscription ? `${subscription.planName} member` : "My courses"}
            </p>
            <h1 className="mt-2 text-[28px] font-bold leading-tight tracking-[-0.8px] sm:text-[34px]">
              Welcome back, <span className="text-[var(--brand-green-bright)]">{firstName}</span>
            </h1>
            <p className="mt-2 max-w-md text-[15px] text-white/70">
              {resume
                ? `Pick up where you left off in ${resume.title}.`
                : courses.length
                  ? "You have finished every course in your library. Nice work."
                  : "Your library is empty — browse the catalogue to add your first course."}
            </p>
            {resume && (
              <Link
                href={`/learn/${resume.slug}`}
                className="group mt-5 inline-flex min-h-12 items-center gap-3 rounded-full bg-white py-1.5 pl-1.5 pr-5 text-[15px] font-semibold text-[var(--brand-ink)] transition-colors hover:bg-white/90"
              >
                <span className="flex size-9 items-center justify-center rounded-full bg-[linear-gradient(145deg,#12a150,#0b4a34)] text-white">
                  <Play className="ml-0.5 size-4 fill-white" strokeWidth={2} aria-hidden="true" />
                </span>
                {resume.pct > 0 ? "Continue learning" : "Start learning"}
              </Link>
            )}
          </div>

          <dl className="grid grid-cols-3 gap-3 sm:min-w-[380px]">
            {[
              { label: "Courses", value: courses.length },
              { label: "Completed", value: done },
              { label: "Lessons done", value: lessonsDone },
            ].map((s) => (
              <div key={s.label} className="rounded-[16px] bg-white/[0.08] px-4 py-3 ring-1 ring-white/12">
                <dt className="text-[11px] font-medium uppercase tracking-[0.12em] text-white/55">{s.label}</dt>
                <dd className="tabular mt-1 text-[24px] font-semibold leading-none">{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-[20px] font-semibold tracking-[-0.4px] text-[var(--brand-ink)]">Your courses</h2>
          <Link href="/courses" className="text-[14px] font-semibold text-[var(--brand-blue)] hover:underline">
            Browse catalogue
          </Link>
        </div>

        {courses.length === 0 ? (
          <div className="flex flex-col items-center gap-3 rounded-[22px] border border-dashed border-[rgb(16_26_71/0.14)] bg-white px-6 py-16 text-center">
            <span className="flex size-14 items-center justify-center rounded-[16px] bg-[var(--brand-hero-wash)] text-[var(--brand-blue)]">
              <BookOpen className="size-7" strokeWidth={1.6} aria-hidden="true" />
            </span>
            <h3 className="text-lg font-semibold text-[var(--brand-ink)]">Nothing here yet</h3>
            <p className="max-w-sm text-sm text-[var(--color-muted-foreground)]">
              Browse the catalogue and enrol in your first course to get started.
            </p>
            <Link href="/courses" className={buttonClasses({ className: "mt-2" })}>
              Browse courses
            </Link>
          </div>
        ) : (
          <ul className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {withPct.map((course, i) => {
              const thumb = assetUrl(course.thumbnailKey, { width: 640 });
              const status =
                course.pct === 100 ? "Completed" : course.pct > 0 ? "In progress" : "Not started";
              const cta = course.pct === 100 ? "Review" : course.pct > 0 ? "Continue" : "Start";

              return (
                <li key={course.id}>
                  <Link
                    href={`/learn/${course.slug}`}
                    className="group flex h-full flex-col overflow-hidden rounded-[22px] bg-white shadow-[0_18px_40px_-32px_rgb(16_26_71/0.45)] ring-1 ring-[rgb(16_26_71/0.07)] transition-transform duration-200 ease-out hover:-translate-y-1"
                  >
                    {/* Fixed 16:9 box so a missing thumbnail cannot change the
                        card's height and reflow the whole grid. */}
                    <div className="relative aspect-video w-full overflow-hidden bg-[var(--brand-hero-wash)]">
                      {thumb ? (
                        <Image
                          src={thumb}
                          alt=""
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                          // The first thumbnail is the page's largest paint.
                          loading={i === 0 ? "eager" : "lazy"}
                          className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.04]"
                        />
                      ) : (
                        <span className="flex h-full items-center justify-center">
                          <PlayCircle className="size-10 text-[var(--brand-blue)]/40" strokeWidth={1.2} aria-hidden="true" />
                        </span>
                      )}
                      <span
                        className={cn(
                          "pill absolute left-3 top-3 px-2.5 py-1 text-[11px] font-semibold backdrop-blur-sm",
                          course.pct === 100
                            ? "bg-[var(--brand-green-bright)] text-[var(--brand-ink)]"
                            : "bg-white/90 text-[var(--brand-ink)]",
                        )}
                      >
                        {status}
                      </span>
                    </div>

                    <div className="flex flex-1 flex-col gap-3 p-5">
                      <h3 className="line-clamp-2 text-[16px] font-semibold leading-snug text-[var(--brand-ink)]">
                        {course.title}
                      </h3>
                      <div>
                        <div className="h-2 rounded-full bg-[var(--brand-hero-wash)]">
                          <div
                            className="h-full rounded-full bg-[linear-gradient(90deg,#12a150,#3ddc72)]"
                            style={{ width: `${Math.max(course.pct, course.pct > 0 ? 4 : 0)}%` }}
                          />
                        </div>
                        <p className="tabular mt-2 text-[12.5px] text-[var(--color-muted-foreground)]">
                          {course.completedCount} of {course.lessonCount} lessons · {course.pct}%
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-2 border-t border-[rgb(16_26_71/0.06)] px-5 py-3.5">
                      <span className="flex min-w-0 items-center gap-2">
                        <Avatar name={course.instructorName ?? "NextMentor"} size={28} />
                        <span className="truncate text-[12.5px] text-[var(--color-muted-foreground)]">
                          {course.instructorName ?? "NextMentor"}
                        </span>
                      </span>
                      <span className="inline-flex shrink-0 items-center gap-1 text-[13.5px] font-semibold text-[var(--brand-blue)]">
                        {cta}
                        <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
                      </span>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </div>
  );
}
