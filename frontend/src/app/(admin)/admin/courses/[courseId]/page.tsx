import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft, ExternalLink } from "lucide-react";

import { publicUrl } from "@/lib/queries";
import { CourseForm } from "@/components/admin/course-form";
import { ThumbnailUpload } from "@/components/admin/thumbnail-upload";
import { CurriculumEditor } from "@/components/admin/curriculum-editor";
import { PublishControls } from "@/components/admin/publish-controls";
import { Badge } from "@/components/ui/badge";
import { createLessonAction, createModuleAction, deleteLessonAction, deleteModuleAction, requestLessonUploadAction,
  uploadLessonResourceAction, requestThumbnailUploadAction, setCourseStatusAction, setCourseThumbnailAction, updateCourseAction } from "@/actions/admin";
import { getCourseForEditor } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Edit course",
  robots: { index: false, follow: false },
};

const STATUS_TONE = {
  published: "success",
  draft: "neutral",
  archived: "warning",
} as const;

export default async function EditCoursePage({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) {
  const { courseId } = await params;
  const course = await getCourseForEditor(courseId);
  if (!course) notFound();

  const readyLessons = course.modules
    .flatMap((m) => m.lessons)
    .filter((l) => l.videoStatus === "ready").length;

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <Link
          href="/admin/courses"
          className="inline-flex w-fit items-center gap-1 text-sm font-medium text-[var(--color-muted-foreground)] transition-colors hover:text-[var(--color-foreground)]"
        >
          <ChevronLeft className="size-4" strokeWidth={1.5} aria-hidden="true" />
          Courses
        </Link>

        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-extrabold tracking-tight">{course.title}</h1>
              <Badge tone={STATUS_TONE[course.status]} className="capitalize">
                {course.status}
              </Badge>
            </div>
            <Link
              href={`/courses/${course.slug}`}
              className="inline-flex w-fit items-center gap-1 text-sm text-[var(--color-muted-foreground)] hover:text-[var(--color-primary)]"
            >
              /courses/{course.slug}
              <ExternalLink className="size-3.5" strokeWidth={1.5} aria-hidden="true" />
            </Link>
          </div>

          <PublishControls
            courseId={course.id}
            status={course.status}
            readyLessonCount={readyLessons}
            setStatus={setCourseStatusAction}
          />
        </div>
      </div>

      <section className="flex flex-col gap-4">
        <h2 className="text-lg font-bold tracking-tight">Thumbnail</h2>
        <ThumbnailUpload
          courseId={course.id}
          currentUrl={publicUrl(course.thumbnailKey)}
          requestUpload={requestThumbnailUploadAction}
          setThumbnail={setCourseThumbnailAction}
        />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-lg font-bold tracking-tight">Curriculum</h2>
        <CurriculumEditor
          courseId={course.id}
          modules={course.modules}
          actions={{
            addModule: createModuleAction,
            deleteModule: deleteModuleAction,
            addLesson: createLessonAction,
            deleteLesson: deleteLessonAction,
            requestUpload: requestLessonUploadAction,
            uploadResource: uploadLessonResourceAction,
          }}
        />
      </section>

      <section className="flex max-w-2xl flex-col gap-4 border-t border-[var(--color-border)] pt-8">
        <h2 className="text-lg font-bold tracking-tight">Details</h2>
        <CourseForm action={updateCourseAction} values={course} submitLabel="Save changes" />
      </section>
    </div>
  );
}
