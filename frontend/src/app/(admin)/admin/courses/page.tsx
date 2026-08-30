import type { Metadata } from "next";
import Link from "next/link";
import { Plus, Users } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { buttonClasses } from "@/components/ui/button";
import { formatPrice } from "@/lib/format";
import { listCoursesForAdmin } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Courses",
  robots: { index: false, follow: false },
};

const STATUS_TONE = {
  published: "success",
  draft: "neutral",
  archived: "warning",
} as const;

export default async function AdminCoursesPage() {
  const courses = await listCoursesForAdmin();

  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-extrabold tracking-tight">Courses</h1>
          <p className="text-sm text-[var(--color-muted-foreground)]">
            {courses.length} total
          </p>
        </div>

        <Link href="/admin/courses/new" className={buttonClasses()}>
          <Plus className="size-4" strokeWidth={1.5} aria-hidden="true" />
          New course
        </Link>
      </header>

      {courses.length === 0 ? (
        <div className="flex flex-col items-center gap-3 rounded-[var(--radius-card)] border border-dashed border-[var(--color-border)] px-6 py-16 text-center">
          <h2 className="text-lg font-bold">No courses yet</h2>
          <p className="max-w-sm text-sm text-[var(--color-muted-foreground)]">
            Create your first course, add lessons, upload the videos, then publish.
          </p>
          <Link href="/admin/courses/new" className={buttonClasses({ className: "mt-2" })}>
            Create a course
          </Link>
        </div>
      ) : (
        // Wide table scrolls inside its own container so the page body never
        // scrolls horizontally on mobile.
        <div className="overflow-x-auto rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-card)]">
          <table className="w-full min-w-[640px] text-sm">
            <thead>
              <tr className="border-b border-[var(--color-border)] text-left text-xs uppercase tracking-wide text-[var(--color-muted-foreground)]">
                <th scope="col" className="px-4 py-3 font-semibold">Course</th>
                <th scope="col" className="px-4 py-3 font-semibold">Status</th>
                <th scope="col" className="px-4 py-3 text-right font-semibold">Price</th>
                <th scope="col" className="px-4 py-3 text-right font-semibold">Students</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border)]">
              {courses.map((c) => (
                <tr key={c.id} className="transition-colors hover:bg-[var(--color-muted)]">
                  <td className="px-4 py-3">
                    <Link
                      href={`/admin/courses/${c.id}`}
                      className="font-semibold hover:text-[var(--color-primary)]"
                    >
                      {c.title}
                    </Link>
                    <div className="text-xs text-[var(--color-muted-foreground)]">/{c.slug}</div>
                  </td>
                  <td className="px-4 py-3">
                    <Badge tone={STATUS_TONE[c.status]} className="capitalize">
                      {c.status}
                    </Badge>
                  </td>
                  <td className="tabular px-4 py-3 text-right font-medium">
                    {c.priceInPaise === 0 ? "Free" : formatPrice(c.priceInPaise)}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <span className="tabular inline-flex items-center gap-1.5 text-[var(--color-muted-foreground)]">
                      <Users className="size-3.5" strokeWidth={1.5} aria-hidden="true" />
                      {c.enrollmentCount}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
