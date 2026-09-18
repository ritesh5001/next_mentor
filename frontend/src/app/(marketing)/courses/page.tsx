import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { BookOpen, Search } from "lucide-react";

import { CourseCard } from "@/components/marketing/course-card";
import { getCatalog } from "@/lib/queries";

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

async function CatalogGrid({ query }: { query: string }) {
  const all = await getCatalog();

  // Filtered here rather than in the API: the catalogue is a handful of
  // courses, already cached, and this keeps search a frontend-only change.
  const needle = query.toLowerCase();
  const courses = needle
    ? all.filter((c) =>
        [c.title, c.subtitle, c.instructorName].some((f) => f?.toLowerCase().includes(needle)),
      )
    : all;

  if (needle && courses.length === 0) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-[var(--radius-card)] border border-dashed border-[var(--color-border)] px-6 py-16 text-center">
        <Search
          className="size-8 text-[var(--color-muted-foreground)]"
          strokeWidth={1.5}
          aria-hidden="true"
        />
        <h2 className="text-lg font-bold">No courses match &ldquo;{query}&rdquo;</h2>
        <p className="max-w-sm text-sm text-[var(--color-muted-foreground)]">
          Try a broader word, or{" "}
          <Link href="/courses" className="font-semibold text-[var(--brand-blue)] hover:underline">
            see every course
          </Link>
          .
        </p>
      </div>
    );
  }

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

export default async function CoursesPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const raw = (await searchParams).q;
  const query = (Array.isArray(raw) ? raw[0] : raw ?? "").trim().slice(0, 80);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <header className="mb-8 flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">All courses</h1>
        <p className="max-w-2xl text-base leading-relaxed text-[var(--color-muted-foreground)]">
          Practical, project-led courses taught by people who do the work. Buy once, keep access.
        </p>

        <form action="/courses" method="get" role="search" className="mt-4 flex w-full max-w-md items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-card)] p-1 pl-4 focus-within:ring-2 focus-within:ring-[var(--brand-blue)]/40">
          <Search className="size-4 shrink-0 text-[var(--color-muted-foreground)]" strokeWidth={1.8} aria-hidden="true" />
          <label htmlFor="catalog-search" className="sr-only">
            Search courses
          </label>
          <input
            id="catalog-search"
            name="q"
            type="search"
            defaultValue={query}
            placeholder="Search your course…"
            autoComplete="off"
            className="min-w-0 flex-1 bg-transparent py-2 text-[15px] outline-none placeholder:text-[var(--color-muted-foreground)]"
          />
          <button type="submit" className="btn-liquid min-h-10 px-5 text-sm font-semibold">
            Search
          </button>
        </form>

        {query && (
          <p className="text-sm text-[var(--color-muted-foreground)]">
            Showing results for &ldquo;{query}&rdquo; ·{" "}
            <Link href="/courses" className="font-semibold text-[var(--brand-blue)] hover:underline">
              Clear
            </Link>
          </p>
        )}
      </header>

      {/* Streamed so the heading paints immediately instead of waiting on the
          catalog query. */}
      <Suspense key={query} fallback={<CatalogSkeleton />}>
        <CatalogGrid query={query} />
      </Suspense>
    </div>
  );
}
