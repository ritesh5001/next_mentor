import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { BookOpen, CheckCircle2, Clock, Lock, PlayCircle } from "lucide-react";

import { getCourseBySlug } from "@/backend/services/courses";
import { getSessionUser, isEnrolled } from "@/backend/lib/permissions";
import {
  createCheckoutAction,
  previewCouponAction,
  pollOwnershipAction,
} from "@/backend/actions/checkout";
import { Badge } from "@/frontend/components/ui/badge";
import { buttonClasses } from "@/frontend/components/ui/button";
import { BuyButton } from "@/frontend/components/marketing/buy-button";
import {
  assetUrl,
  discountPercent,
  formatDuration,
  formatPrice,
  formatTimestamp,
} from "@/frontend/lib/format";

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const course = await getCourseBySlug(slug);
  if (!course || course.status !== "published") return { title: "Course not found" };

  return {
    title: course.title,
    description: course.subtitle ?? course.description?.slice(0, 155) ?? undefined,
    alternates: { canonical: `/courses/${course.slug}` },
    openGraph: {
      title: course.title,
      description: course.subtitle ?? undefined,
      type: "website",
    },
  };
}

export default async function CourseDetailPage({ params }: Params) {
  const { slug } = await params;
  const course = await getCourseBySlug(slug);

  // A draft or archived course 404s for everyone except staff, who need to
  // preview before publishing.
  const user = await getSessionUser();
  const isStaff = user?.role === "admin" || user?.role === "instructor";
  if (!course || (course.status !== "published" && !isStaff)) notFound();

  const enrolled = user ? await isEnrolled(user.id, course.id) : false;
  const thumb = assetUrl(course.thumbnailKey);
  const off = discountPercent(course.priceInPaise, course.mrpInPaise);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      {/* JSON-LD so the course is eligible for rich results. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Course",
            name: course.title,
            description: course.subtitle ?? course.description ?? undefined,
            provider: { "@type": "Organization", name: "NextMentor" },
          }),
        }}
      />

      {course.status !== "published" && (
        <div className="mb-6">
          <Badge tone="warning">Preview — this course is {course.status}</Badge>
        </div>
      )}

      <div className="grid gap-10 lg:grid-cols-[1fr_360px]">
        {/* ---------------------------------------------------------- main */}
        <div className="flex flex-col gap-8">
          <header className="flex flex-col gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <Badge tone="primary" className="capitalize">
                {course.level}
              </Badge>
              <span className="text-xs uppercase tracking-wide text-[var(--color-muted-foreground)]">
                {course.language}
              </span>
            </div>

            <h1 className="text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
              {course.title}
            </h1>

            {course.subtitle && (
              <p className="max-w-2xl text-lg leading-relaxed text-[var(--color-muted-foreground)]">
                {course.subtitle}
              </p>
            )}

            <dl className="flex flex-wrap items-center gap-x-4 gap-y-2 pt-1 text-sm text-[var(--color-muted-foreground)]">
              <div className="flex items-center gap-1.5">
                <BookOpen className="size-4" strokeWidth={1.5} aria-hidden="true" />
                <dt className="sr-only">Lessons</dt>
                <dd className="tabular">{course.lessonCount} lessons</dd>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="size-4" strokeWidth={1.5} aria-hidden="true" />
                <dt className="sr-only">Total length</dt>
                <dd className="tabular">{formatDuration(course.durationSeconds)}</dd>
              </div>
              {course.instructorName && (
                <div>
                  <dt className="sr-only">Instructor</dt>
                  <dd>by {course.instructorName}</dd>
                </div>
              )}
            </dl>
          </header>

          {course.description && (
            <section className="flex flex-col gap-3">
              <h2 className="text-xl font-bold tracking-tight">About this course</h2>
              <div className="max-w-2xl whitespace-pre-line text-[15px] leading-relaxed text-[var(--color-foreground)]/90">
                {course.description}
              </div>
            </section>
          )}

          <section className="flex flex-col gap-3">
            <h2 className="text-xl font-bold tracking-tight">Curriculum</h2>

            {course.modules.length === 0 ? (
              <p className="text-sm text-[var(--color-muted-foreground)]">
                The curriculum is being finalised.
              </p>
            ) : (
              <ol className="flex flex-col gap-3">
                {course.modules.map((mod, i) => (
                  <li
                    key={mod.id}
                    className="overflow-hidden rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-card)]"
                  >
                    <div className="flex items-baseline justify-between gap-3 border-b border-[var(--color-border)] px-4 py-3">
                      <h3 className="text-sm font-bold">
                        <span className="tabular text-[var(--color-muted-foreground)]">
                          {String(i + 1).padStart(2, "0")}
                        </span>{" "}
                        {mod.title}
                      </h3>
                      <span className="tabular shrink-0 text-xs text-[var(--color-muted-foreground)]">
                        {mod.lessons.length} lessons
                      </span>
                    </div>

                    <ul className="divide-y divide-[var(--color-border)]">
                      {mod.lessons.map((lesson) => (
                        <li
                          key={lesson.id}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm"
                        >
                          {enrolled || lesson.isFreePreview ? (
                            <PlayCircle
                              className="size-4 shrink-0 text-[var(--color-primary)]"
                              strokeWidth={1.5}
                              aria-hidden="true"
                            />
                          ) : (
                            <Lock
                              className="size-4 shrink-0 text-[var(--color-muted-foreground)]"
                              strokeWidth={1.5}
                              aria-hidden="true"
                            />
                          )}

                          <span className="flex-1 truncate">{lesson.title}</span>

                          {lesson.isFreePreview && !enrolled && (
                            <Badge tone="success">Free preview</Badge>
                          )}

                          {lesson.durationSeconds > 0 && (
                            <span className="tabular shrink-0 text-xs text-[var(--color-muted-foreground)]">
                              {formatTimestamp(lesson.durationSeconds)}
                            </span>
                          )}
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ol>
            )}
          </section>
        </div>

        {/* -------------------------------------------------------- sidebar */}
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="flex flex-col gap-4 overflow-hidden rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-card)] p-4 shadow-[var(--shadow-card)]">
            <div className="relative aspect-video overflow-hidden rounded-[var(--radius-control)] bg-[var(--color-muted)]">
              {thumb ? (
                <Image
                  src={thumb}
                  alt=""
                  fill
                  sizes="360px"
                  priority
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

            <div className="flex items-baseline gap-2">
              <span className="tabular text-3xl font-extrabold">
                {course.priceInPaise === 0 ? "Free" : formatPrice(course.priceInPaise)}
              </span>
              {off !== null && course.mrpInPaise && (
                <>
                  <span className="tabular text-base text-[var(--color-muted-foreground)] line-through">
                    {formatPrice(course.mrpInPaise)}
                  </span>
                  <Badge tone="money">{off}% off</Badge>
                </>
              )}
            </div>

            {enrolled ? (
              <Link
                href={`/learn/${course.slug}`}
                className={buttonClasses({ size: "lg", className: "w-full" })}
              >
                <CheckCircle2 className="size-4" strokeWidth={1.5} aria-hidden="true" />
                Continue learning
              </Link>
            ) : user ? (
              <BuyButton
                itemType="course"
                slug={course.slug}
                priceInPaise={course.priceInPaise}
                razorpayKeyId={process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID ?? ""}
                successPath={`/learn/${course.slug}`}
                createCheckout={createCheckoutAction}
                previewCoupon={previewCouponAction}
                pollOwnership={pollOwnershipAction}
              />
            ) : (
              <div className="flex flex-col gap-2">
                <Link
                  href={`/login?callbackUrl=${encodeURIComponent(`/courses/${course.slug}`)}`}
                  className={buttonClasses({ size: "lg", className: "w-full" })}
                >
                  Sign in to enrol
                </Link>
                <p className="text-center text-xs text-[var(--color-muted-foreground)]">
                  New here?{" "}
                  <Link href="/register" className="font-semibold text-[var(--color-primary)]">
                    Create an account
                  </Link>
                </p>
              </div>
            )}

            <ul className="flex flex-col gap-2 border-t border-[var(--color-border)] pt-3 text-sm text-[var(--color-muted-foreground)]">
              {[
                "Lifetime access",
                `${course.lessonCount} video lessons`,
                "Learn on any device",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <CheckCircle2
                    className="size-4 shrink-0 text-[var(--color-success)]"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}
