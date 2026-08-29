import type { Metadata } from "next";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

import { createCourseAction } from "@/backend/actions/courses";
import { CourseForm } from "@/frontend/components/admin/course-form";

export const metadata: Metadata = {
  title: "New course",
  robots: { index: false, follow: false },
};

export default function NewCoursePage() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-6">
      <Link
        href="/admin/courses"
        className="inline-flex w-fit items-center gap-1 text-sm font-medium text-[var(--color-muted-foreground)] transition-colors hover:text-[var(--color-foreground)]"
      >
        <ChevronLeft className="size-4" strokeWidth={1.5} aria-hidden="true" />
        Courses
      </Link>

      <header className="flex flex-col gap-1">
        <h1 className="text-2xl font-extrabold tracking-tight">New course</h1>
        <p className="text-sm text-[var(--color-muted-foreground)]">
          It starts as a draft. Add lessons and upload videos before publishing.
        </p>
      </header>

      <CourseForm action={createCourseAction} submitLabel="Create course" />
    </div>
  );
}
