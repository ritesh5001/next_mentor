"use client";

import { useState, useTransition, useRef } from "react";
import { useRouter } from "next/navigation";
import { Paperclip, Plus, Trash2, Upload } from "lucide-react";

import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatTimestamp } from "@/lib/format";
import type { ActionState, FormAction } from "@nextmentor/shared";

export type EditorLesson = {
  id: string;
  title: string;
  durationSeconds: number;
  isFreePreview: boolean;
  videoStatus: string;
  streamVideoId: string | null;
  /** How many PDFs/handouts are attached. */
  resourceCount?: number;
};

export type EditorModule = {
  id: string;
  title: string;
  lessons: EditorLesson[];
};

type Actions = {
  addModule: FormAction;
  deleteModule: (moduleId: string) => Promise<ActionState>;
  addLesson: FormAction;
  deleteLesson: (lessonId: string) => Promise<ActionState>;
  uploadResource: (lessonId: string, formData: FormData) => Promise<ActionState>;
  requestUpload: (
    lessonId: string,
    contentType: string,
  ) => Promise<{ uploadUrl: string; videoId: string } | { error: string }>;
  confirmUpload: (
    lessonId: string,
    key: string,
    durationSeconds: number,
  ) => Promise<ActionState>;
};

/**
 * Formats a browser will play without a transcode step.
 *
 * R2 is object storage: it returns exactly the bytes it was handed. An .mkv
 * would upload, store and bill perfectly happily, then fail in every player.
 */
const PLAYABLE = new Set(["video/mp4", "video/webm", "video/quicktime"]);

/**
 * Reads a video's duration in the browser.
 *
 * Cloudflare used to measure this during transcoding. Nothing does now, so the
 * file is loaded into a detached <video> just far enough for metadata. It is
 * display data only: the runtime label and the progress percentage. Nothing
 * about entitlement depends on it, so a wrong number is cosmetic.
 */
function readDuration(file: File): Promise<number> {
  return new Promise((resolve) => {
    const url = URL.createObjectURL(file);
    const video = document.createElement("video");
    video.preload = "metadata";

    const done = (value: number) => {
      URL.revokeObjectURL(url);
      resolve(Number.isFinite(value) && value > 0 ? Math.round(value) : 0);
    };

    video.onloadedmetadata = () => done(video.duration);
    video.onerror = () => done(0);
    video.src = url;
  });
}

const STATUS: Record<string, { tone: "success" | "warning" | "danger" | "neutral"; label: string }> = {
  ready: { tone: "success", label: "Ready" },
  processing: { tone: "warning", label: "Processing" },
  uploading: { tone: "warning", label: "Uploading" },
  pending: { tone: "neutral", label: "No video" },
  errored: { tone: "danger", label: "Failed" },
};

function UploadButton({
  lessonId,
  requestUpload,
  confirmUpload,
}: {
  lessonId: string;
  requestUpload: Actions["requestUpload"];
  confirmUpload: Actions["confirmUpload"];
}) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [progress, setProgress] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleFile(file: File) {
    setError(null);
    setProgress(0);

    // R2 stores the file exactly as given, so the browser has to be able to
    // play it back. Checked here as well as on the server so the admin is told
    // before a 2GB upload rather than after.
    if (!PLAYABLE.has(file.type)) {
      setError("Upload an MP4 (H.264) or WebM. Other formats will not play in the browser.");
      setProgress(null);
      return;
    }

    // There is no transcode step to measure the video for us any more, so the
    // duration is read off a throwaway <video> element before uploading.
    const durationSeconds = await readDuration(file);

    const result = await requestUpload(lessonId, file.type);
    if ("error" in result) {
      setError(result.error);
      setProgress(null);
      return;
    }

    // Straight from the browser to R2. A presigned PUT takes the raw file as
    // the body, not multipart form-data: the signature covers the exact bytes
    // and content type, so wrapping it in a FormData envelope would upload the
    // envelope. XHR rather than fetch() purely because fetch still has no
    // upload progress events, and a 2GB upload with no bar looks like a hang.
    const uploaded = await new Promise<boolean>((resolve) => {
      const xhr = new XMLHttpRequest();
      xhr.open("PUT", result.uploadUrl, true);
      xhr.setRequestHeader("Content-Type", file.type);

      xhr.upload.onprogress = (e) => {
        if (e.lengthComputable) setProgress(Math.round((e.loaded / e.total) * 100));
      };
      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve(true);
        } else {
          setError(`Upload failed (${xhr.status}). Try again.`);
          setProgress(null);
          resolve(false);
        }
      };
      xhr.onerror = () => {
        setError("Upload failed. Check your connection.");
        setProgress(null);
        resolve(false);
      };

      xhr.send(file);
    });

    if (!uploaded) return;

    const confirmed = await confirmUpload(lessonId, result.videoId, durationSeconds);
    if (confirmed?.error) {
      setError(confirmed.error);
      setProgress(null);
      return;
    }

    setProgress(100);
    router.refresh();
  }

  return (
    <div className="flex flex-col gap-1.5">
      <input
        ref={inputRef}
        type="file"
        accept="video/*"
        className="sr-only"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) void handleFile(file);
          e.target.value = "";
        }}
      />

      <Button
        type="button"
        variant="secondary"
        size="sm"
        loading={progress !== null && progress < 100}
        onClick={() => inputRef.current?.click()}
      >
        {progress === null ? (
          <>
            <Upload className="size-3.5" strokeWidth={1.5} aria-hidden="true" />
            Upload video
          </>
        ) : progress < 100 ? (
          <span className="tabular">{progress}%</span>
        ) : (
          "Processing…"
        )}
      </Button>

      {error && (
        <p role="alert" className="text-xs font-medium text-[var(--color-destructive)]">
          {error}
        </p>
      )}
    </div>
  );
}

export function CurriculumEditor({
  courseId,
  modules,
  actions,
}: {
  courseId: string;
  modules: EditorModule[];
  actions: Actions;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [message, setMessage] = useState<{ tone: "error" | "success"; text: string } | null>(null);

  function run(fn: () => Promise<ActionState>) {
    startTransition(async () => {
      const res = await fn();
      if (res?.error) setMessage({ tone: "error", text: res.error });
      else if (res?.success) setMessage({ tone: "success", text: res.success });
      router.refresh();
    });
  }

  return (
    <div className="flex flex-col gap-4">
      {message && <Alert tone={message.tone}>{message.text}</Alert>}

      {modules.length === 0 && (
        <p className="rounded-[var(--radius-card)] border border-dashed border-[var(--color-border)] px-4 py-8 text-center text-sm text-[var(--color-muted-foreground)]">
          No sections yet. Add one to start building the curriculum.
        </p>
      )}

      <ol className="flex flex-col gap-3">
        {modules.map((mod, i) => (
          <li
            key={mod.id}
            className="overflow-hidden rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-card)]"
          >
            <div className="flex items-center justify-between gap-3 border-b border-[var(--color-border)] px-4 py-3">
              <h3 className="text-sm font-bold">
                <span className="tabular text-[var(--color-muted-foreground)]">
                  {String(i + 1).padStart(2, "0")}
                </span>{" "}
                {mod.title}
              </h3>

              <button
                type="button"
                disabled={pending}
                onClick={() => {
                  // Deleting a section takes its lessons and their videos with
                  // it, so confirm before doing it.
                  if (
                    confirm(
                      `Delete "${mod.title}" and its ${mod.lessons.length} lesson(s)? The uploaded videos are deleted too. This cannot be undone.`,
                    )
                  ) {
                    run(() => actions.deleteModule(mod.id));
                  }
                }}
                aria-label={`Delete section ${mod.title}`}
                className="flex size-9 items-center justify-center rounded-[var(--radius-control)] text-[var(--color-muted-foreground)] transition-colors hover:bg-[var(--color-destructive-subtle)] hover:text-[var(--color-destructive)]"
              >
                <Trash2 className="size-4" strokeWidth={1.5} aria-hidden="true" />
              </button>
            </div>

            <ul className="divide-y divide-[var(--color-border)]">
              {mod.lessons.map((lesson) => {
                const status = STATUS[lesson.videoStatus] ?? STATUS.pending;
                return (
                  <li
                    key={lesson.id}
                    className="flex flex-wrap items-center gap-3 px-4 py-3 text-sm"
                  >
                    <span className="min-w-0 flex-1 truncate font-medium">{lesson.title}</span>

                    {lesson.isFreePreview && <Badge tone="primary">Free preview</Badge>}
                    <Badge tone={status.tone}>{status.label}</Badge>

                    {lesson.durationSeconds > 0 && (
                      <span className="tabular text-xs text-[var(--color-muted-foreground)]">
                        {formatTimestamp(lesson.durationSeconds)}
                      </span>
                    )}

                    <UploadButton
                      lessonId={lesson.id}
                      requestUpload={actions.requestUpload}
                      confirmUpload={actions.confirmUpload}
                    />

                    <ResourceButton
                      lessonId={lesson.id}
                      count={lesson.resourceCount ?? 0}
                      uploadResource={actions.uploadResource}
                    />

                    <button
                      type="button"
                      disabled={pending}
                      onClick={() => {
                        if (confirm(`Delete lesson "${lesson.title}"? This cannot be undone.`)) {
                          run(() => actions.deleteLesson(lesson.id));
                        }
                      }}
                      aria-label={`Delete lesson ${lesson.title}`}
                      className="flex size-9 items-center justify-center rounded-[var(--radius-control)] text-[var(--color-muted-foreground)] transition-colors hover:bg-[var(--color-destructive-subtle)] hover:text-[var(--color-destructive)]"
                    >
                      <Trash2 className="size-4" strokeWidth={1.5} aria-hidden="true" />
                    </button>
                  </li>
                );
              })}
            </ul>

            <form
              action={async (fd) => {
                fd.append("moduleId", mod.id);
                const res = await actions.addLesson(null, fd);
                if (res?.error) setMessage({ tone: "error", text: res.error });
                router.refresh();
              }}
              className="flex gap-2 border-t border-[var(--color-border)] bg-[var(--color-muted)]/40 p-3"
            >
              <label htmlFor={`lesson-${mod.id}`} className="sr-only">
                New lesson title
              </label>
              <input
                id={`lesson-${mod.id}`}
                name="title"
                required
                minLength={2}
                placeholder="New lesson title"
                className="min-h-10 flex-1 rounded-[var(--radius-control)] border border-[var(--color-border)] bg-[var(--color-card)] px-3 text-sm"
              />
              <Button type="submit" size="sm" variant="secondary">
                <Plus className="size-3.5" strokeWidth={1.5} aria-hidden="true" />
                Add lesson
              </Button>
            </form>
          </li>
        ))}
      </ol>

      <form
        action={async (fd) => {
          fd.append("courseId", courseId);
          const res = await actions.addModule(null, fd);
          if (res?.error) setMessage({ tone: "error", text: res.error });
          router.refresh();
        }}
        className="flex gap-2"
      >
        <label htmlFor="new-module" className="sr-only">
          New section title
        </label>
        <input
          id="new-module"
          name="title"
          required
          minLength={2}
          placeholder="New section title"
          className="min-h-11 flex-1 rounded-[var(--radius-control)] border border-[var(--color-border)] bg-[var(--color-card)] px-3 text-[16px]"
        />
        <Button type="submit">
          <Plus className="size-4" strokeWidth={1.5} aria-hidden="true" />
          Add section
        </Button>
      </form>
    </div>
  );
}

/**
 * Attaches a PDF or handout to a lesson.
 *
 * Posts to our own API rather than straight to ImageKit: course material is
 * paid content and must be stored as a private file, and ImageKit's upload
 * signature does not cover that flag.
 */
function ResourceButton({
  lessonId,
  count,
  uploadResource,
}: {
  lessonId: string;
  count: number;
  uploadResource: (lessonId: string, formData: FormData) => Promise<ActionState>;
}) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handle(file: File) {
    setError(null);
    setBusy(true);

    const form = new FormData();
    form.append("file", file);
    form.append("title", file.name.replace(/\.[^.]+$/, ""));

    const result = await uploadResource(lessonId, form);
    if (result?.error) setError(result.error);
    else router.refresh();

    setBusy(false);
  }

  return (
    <div className="flex flex-col gap-1">
      <input
        ref={inputRef}
        type="file"
        accept="application/pdf,image/*"
        className="sr-only"
        aria-label="Attach a PDF or handout"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) void handle(f);
          e.target.value = "";
        }}
      />
      <Button
        type="button"
        variant="ghost"
        size="sm"
        loading={busy}
        onClick={() => inputRef.current?.click()}
      >
        <Paperclip className="size-3.5" strokeWidth={1.5} aria-hidden="true" />
        {count > 0 ? `${count} file${count === 1 ? "" : "s"}` : "Attach PDF"}
      </Button>
      {error && (
        <p role="alert" className="text-xs font-medium text-[var(--color-destructive)]">
          {error}
        </p>
      )}
    </div>
  );
}
