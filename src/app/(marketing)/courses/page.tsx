import type { Metadata } from "next";
import { Suspense } from "react";
import { BookOpen } from "lucide-react";

import { getCatalog } from "@/backend/services/courses";
import { CourseCard } from "@/frontend/components/marketing/course-card";

export const metadata: Metadata = {
  title: "All courses",
  description:
    "Practical, project-led courses in digital marketing, AI, design and automation — taught by working practitioners.",
};

function CatalogSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className="overflow-hidden rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-card)]"
        >
          {/* Same aspect ratio as the real card, so nothing shifts on swap. */}
          <div className="aspect-video animate-pulse bg-[var(--color-muted)]" />
          <div className="flex flex-col gap-2 p-4">
            <div className="h-4 w-3/4 animate-pulse rounded bg-[var(--color-muted)]" />
            <div className="h-3 w-full animate-pulse rounded bg-[var(--color-muted)]" />
            <div className="mt-2 h-5 w-20 animate-pulse rounded bg-[var(--color-muted)]" />
          </div>
        </div>
      ))}
    </div>
  );
}

async function CatalogGrid() {
  const courses = await getCatalog();

  if (courses.length === 0) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-[var(--radius-card)] border border-dashed border-[var(--color-border)] px-6 py-16 text-center">
        <BookOpen
          className="size-8 text-[var(--color-muted-foreground)]"
          strokeWidth={1.5}
          aria-hidden="true"
        />
        <h2 className="text-lg font-bold">No courses published yet</h2>
        <p className="max-w-sm text-sm text-[var(--color-muted-foreground)]">
          New courses are on the way. Check back shortly.
        </p>
      </div>
    );
  }

  return (
    <div className="stagger-in grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {courses.map((course) => (
        <CourseCard key={course.id} course={course} />
      ))}
    </div>
  );
}

export default function CoursesPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <header className="mb-8 flex flex-col gap-2">
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">All courses</h1>
        <p className="max-w-2xl text-base leading-relaxed text-[var(--color-muted-foreground)]">
          Practical, project-led courses taught by people who do the work. Buy once, keep access.
        </p>
      </header>

      {/* Streamed so the heading paints immediately instead of waiting on the
          catalog query. */}
      <Suspense fallback={<CatalogSkeleton />}>
        <CatalogGrid />
      </Suspense>
    </div>
  );
}
