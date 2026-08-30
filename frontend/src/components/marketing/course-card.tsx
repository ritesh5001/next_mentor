import Link from "next/link";
import Image from "next/image";
import { BookOpen, Clock, PlayCircle } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { formatDuration, formatPrice, discountPercent, assetUrl } from "@/lib/format";

export type CourseCardData = {
  slug: string;
  title: string;
  subtitle: string | null;
  thumbnailKey: string | null;
  instructorName: string | null;
  priceInPaise: number;
  mrpInPaise: number | null;
  level: "beginner" | "intermediate" | "advanced";
  lessonCount: number;
  durationSeconds: number;
};

export function CourseCard({ course }: { course: CourseCardData }) {
  const thumb = assetUrl(course.thumbnailKey);
  const off = discountPercent(course.priceInPaise, course.mrpInPaise);

  return (
    <article className="group flex flex-col overflow-hidden rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-card)] shadow-[var(--shadow-card)] transition-shadow duration-200 hover:shadow-[var(--shadow-raised)]">
      {/* aspect-video reserves the box before the image loads. Without it the
          whole grid reflows as thumbnails arrive — the main CLS risk here. */}
      <div className="relative aspect-video overflow-hidden bg-[var(--color-muted)]">
        {thumb ? (
          <Image
            src={thumb}
            alt=""
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
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

        {off !== null && (
          <div className="absolute left-3 top-3">
            <Badge tone="money">{off}% off</Badge>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex flex-col gap-1">
          <h3 className="text-base font-bold leading-snug tracking-tight">
            {/* The whole card is clickable via this stretched link, so there is
                still exactly one link in the accessibility tree. */}
            <Link href={`/courses/${course.slug}`} className="after:absolute after:inset-0">
              {course.title}
            </Link>
          </h3>
          {course.subtitle && (
            <p className="line-clamp-2 text-sm leading-relaxed text-[var(--color-muted-foreground)]">
              {course.subtitle}
            </p>
          )}
        </div>

        <dl className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[var(--color-muted-foreground)]">
          <div className="flex items-center gap-1">
            <BookOpen className="size-3.5" strokeWidth={1.5} aria-hidden="true" />
            <dt className="sr-only">Lessons</dt>
            <dd className="tabular">{course.lessonCount}</dd>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="size-3.5" strokeWidth={1.5} aria-hidden="true" />
            <dt className="sr-only">Duration</dt>
            <dd className="tabular">{formatDuration(course.durationSeconds)}</dd>
          </div>
          <div className="capitalize">
            <dt className="sr-only">Level</dt>
            <dd>{course.level}</dd>
          </div>
        </dl>

        <div className="mt-auto flex items-end justify-between gap-2 pt-1">
          <div className="flex items-baseline gap-2">
            <span className="tabular text-lg font-extrabold">
              {course.priceInPaise === 0 ? "Free" : formatPrice(course.priceInPaise)}
            </span>
            {off !== null && course.mrpInPaise && (
              <span className="tabular text-sm text-[var(--color-muted-foreground)] line-through">
                {formatPrice(course.mrpInPaise)}
              </span>
            )}
          </div>
          {course.instructorName && (
            <span className="truncate text-xs text-[var(--color-muted-foreground)]">
              {course.instructorName}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
