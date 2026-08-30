"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Rocket } from "lucide-react";

import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import type { ActionState } from "@nextmentor/shared";

type Status = "draft" | "published" | "archived";

export function PublishControls({
  courseId,
  status,
  readyLessonCount,
  setStatus,
}: {
  courseId: string;
  status: Status;
  readyLessonCount: number;
  setStatus: (courseId: string, status: Status) => Promise<ActionState>;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [message, setMessage] = useState<{ tone: "error" | "success"; text: string } | null>(null);

  function change(next: Status) {
    startTransition(async () => {
      const res = await setStatus(courseId, next);
      if (res?.error) setMessage({ tone: "error", text: res.error });
      else if (res?.success) setMessage({ tone: "success", text: res.success });
      router.refresh();
    });
  }

  // Surfacing the reason up front beats letting someone click Publish and be
  // told no by the server.
  const blocked = status !== "published" && readyLessonCount === 0;

  return (
    <div className="flex flex-col items-end gap-2">
      <div className="flex gap-2">
        {status === "published" ? (
          <Button variant="secondary" loading={pending} onClick={() => change("draft")}>
            <EyeOff className="size-4" strokeWidth={1.5} aria-hidden="true" />
            Unpublish
          </Button>
        ) : (
          <Button loading={pending} disabled={blocked} onClick={() => change("published")}>
            <Rocket className="size-4" strokeWidth={1.5} aria-hidden="true" />
            Publish
          </Button>
        )}

        {status !== "archived" && (
          <Button variant="ghost" loading={pending} onClick={() => change("archived")}>
            <Eye className="size-4" strokeWidth={1.5} aria-hidden="true" />
            Archive
          </Button>
        )}
      </div>

      {blocked && (
        <p className="max-w-xs text-right text-xs text-[var(--color-muted-foreground)]">
          Add at least one lesson with a processed video before publishing.
        </p>
      )}

      {message && (
        <Alert tone={message.tone} className="max-w-xs">
          {message.text}
        </Alert>
      )}
    </div>
  );
}
