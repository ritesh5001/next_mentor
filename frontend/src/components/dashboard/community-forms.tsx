"use client";

import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";
import { Plus } from "lucide-react";

import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import type { ActionState, FormAction } from "@nextmentor/shared";

function Submit({ label, busy }: { label: string; busy: string }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" loading={pending}>
      {pending ? busy : label}
    </Button>
  );
}

export function NewPostForm({ action }: { action: FormAction }) {
  const [open, setOpen] = useState(false);
  const [state, formAction] = useActionState<ActionState, FormData>(action, null);

  if (!open) {
    return (
      <div>
        <Button onClick={() => setOpen(true)}>
          <Plus className="size-4" strokeWidth={1.5} aria-hidden="true" />
          Start a post
        </Button>
      </div>
    );
  }

  return (
    <form
      action={formAction}
      className="flex flex-col gap-4 rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-card)] p-5"
      noValidate
    >
      {state?.error && <Alert tone="error">{state.error}</Alert>}
      {state?.success && <Alert tone="success">{state.success}</Alert>}

      <Field label="Title" name="title" required maxLength={140} placeholder="What's on your mind?" />

      <div className="flex flex-col gap-1.5">
        <label htmlFor="post-body" className="text-sm font-medium">
          Your post
        </label>
        <textarea
          id="post-body"
          name="body"
          rows={5}
          required
          maxLength={10000}
          className="w-full rounded-[var(--radius-control)] border border-[var(--color-border)] bg-[var(--color-card)] px-3 py-2 text-[16px] leading-relaxed"
          placeholder="Share the detail — what you tried, what happened, what you need."
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="post-category" className="text-sm font-medium">
          Category
        </label>
        <select
          id="post-category"
          name="category"
          defaultValue="general"
          className="min-h-11 rounded-[var(--radius-control)] border border-[var(--color-border)] bg-[var(--color-card)] px-3 text-[16px] sm:max-w-xs"
        >
          <option value="general">General</option>
          <option value="wins">Wins</option>
          <option value="questions">Questions</option>
          <option value="resources">Resources</option>
        </select>
      </div>

      <div className="flex gap-2">
        <Submit label="Post" busy="Posting…" />
        <Button type="button" variant="ghost" onClick={() => setOpen(false)}>
          Cancel
        </Button>
      </div>
    </form>
  );
}

export function ReplyForm({ action, postId }: { action: FormAction; postId: string }) {
  const [state, formAction] = useActionState<ActionState, FormData>(action, null);

  return (
    <form action={formAction} className="flex flex-col gap-3" noValidate>
      <input type="hidden" name="postId" value={postId} />

      {state?.error && <Alert tone="error">{state.error}</Alert>}

      <div className="flex flex-col gap-1.5">
        <label htmlFor="reply-body" className="text-sm font-medium">
          Add a reply
        </label>
        <textarea
          id="reply-body"
          name="body"
          rows={3}
          required
          maxLength={5000}
          className="w-full rounded-[var(--radius-control)] border border-[var(--color-border)] bg-[var(--color-card)] px-3 py-2 text-[16px] leading-relaxed"
          placeholder="Write a reply…"
        />
      </div>

      <div>
        <Submit label="Reply" busy="Posting…" />
      </div>
    </form>
  );
}
