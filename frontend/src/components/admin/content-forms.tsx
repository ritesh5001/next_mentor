"use client";

import { useActionState, useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import { useRouter } from "next/navigation";
import { Upload } from "lucide-react";

import { Alert } from "@/frontend/components/ui/alert";
import { Button } from "@/frontend/components/ui/button";
import { Field } from "@/frontend/components/ui/field";
import type { ActionState, FormAction } from "@/shared/action-state";

export type PlanOption = { id: string; name: string };

function Submit({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" loading={pending}>
      {pending ? "Saving…" : label}
    </Button>
  );
}

function PlanSelect({ plans, id = "planRequiredId" }: { plans: PlanOption[]; id?: string }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium">
        Requires plan
      </label>
      <select
        id={id}
        name="planRequiredId"
        defaultValue=""
        className="min-h-11 rounded-[var(--radius-control)] border border-[var(--color-border)] bg-[var(--color-card)] px-3 text-[16px]"
      >
        <option value="">Available to everyone</option>
        {plans.map((p) => (
          <option key={p.id} value={p.id}>
            {p.name} and above
          </option>
        ))}
      </select>
    </div>
  );
}

/**
 * Uploads a file to R2 and reports the resulting key back to the parent form,
 * which submits it in a hidden input.
 */
function FileUpload({
  requestUpload,
  onUploaded,
  accept,
  label,
}: {
  requestUpload: (input: {
    contentType: string;
    contentLength: number;
  }) => Promise<{ uploadUrl: string; key: string } | { error: string }>;
  onUploaded: (key: string, name: string) => void;
  accept: string;
  label: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handle(file: File) {
    setError(null);
    setBusy(true);

    const target = await requestUpload({
      contentType: file.type,
      contentLength: file.size,
    });

    if ("error" in target) {
      setError(target.error);
      setBusy(false);
      return;
    }

    try {
      // Content-Type must match what was signed, or R2 rejects the PUT.
      const res = await fetch(target.uploadUrl, {
        method: "PUT",
        body: file,
        headers: { "Content-Type": file.type },
      });
      if (!res.ok) throw new Error(String(res.status));
      onUploaded(target.key, file.name);
    } catch {
      setError("Upload failed. Check your connection and try again.");
    }

    setBusy(false);
  }

  return (
    <div className="flex flex-col gap-1.5">
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="sr-only"
        aria-label={label}
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) void handle(f);
          e.target.value = "";
        }}
      />
      <Button
        type="button"
        variant="secondary"
        size="sm"
        loading={busy}
        onClick={() => inputRef.current?.click()}
      >
        <Upload className="size-3.5" strokeWidth={1.5} aria-hidden="true" />
        {label}
      </Button>
      {error && (
        <p role="alert" className="text-xs font-medium text-[var(--color-destructive)]">
          {error}
        </p>
      )}
    </div>
  );
}

export function PromoAssetForm({
  action,
  plans,
  requestUpload,
}: {
  action: FormAction;
  plans: PlanOption[];
  requestUpload: (input: {
    contentType: string;
    contentLength: number;
  }) => Promise<{ uploadUrl: string; key: string } | { error: string }>;
}) {
  const [state, formAction] = useActionState<ActionState, FormData>(action, null);
  const [type, setType] = useState<"banner" | "video" | "script" | "pdf">("banner");
  const [uploaded, setUploaded] = useState<{ key: string; name: string } | null>(null);

  return (
    <form action={formAction} className="flex flex-col gap-4" noValidate>
      {state?.error && <Alert tone="error">{state.error}</Alert>}
      {state?.success && <Alert tone="success">{state.success}</Alert>}

      {uploaded && <input type="hidden" name="r2Key" value={uploaded.key} />}

      <Field label="Title" name="title" required maxLength={120} placeholder="Instagram story — 9:16" />
      <Field label="Description" name="description" maxLength={500} placeholder="Drop your link in the sticker" />

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="promo-type" className="text-sm font-medium">
            Type
          </label>
          <select
            id="promo-type"
            name="type"
            value={type}
            onChange={(e) => setType(e.target.value as typeof type)}
            className="min-h-11 rounded-[var(--radius-control)] border border-[var(--color-border)] bg-[var(--color-card)] px-3 text-[16px]"
          >
            <option value="banner">Banner image</option>
            <option value="video">Video</option>
            <option value="pdf">PDF</option>
            <option value="script">Script / copy</option>
          </select>
        </div>

        <Field label="Sort position" name="position" type="number" inputMode="numeric" min={0} defaultValue={0} />
      </div>

      {type === "script" ? (
        <div className="flex flex-col gap-1.5">
          <label htmlFor="promo-body" className="text-sm font-medium">
            The copy
          </label>
          <textarea
            id="promo-body"
            name="bodyText"
            rows={5}
            maxLength={5000}
            className="w-full rounded-[var(--radius-control)] border border-[var(--color-border)] bg-[var(--color-card)] px-3 py-2 text-[16px] leading-relaxed"
            placeholder="Ready-to-paste text affiliates can share."
          />
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          <Field label="Dimensions" name="dimensions" maxLength={40} placeholder="1080 × 1920" />
          <FileUpload
            requestUpload={requestUpload}
            onUploaded={(key, name) => setUploaded({ key, name })}
            accept="image/*,application/pdf,video/*"
            label={uploaded ? "Replace file" : "Upload file"}
          />
          {uploaded && (
            <p className="text-xs text-[var(--color-success)]">Uploaded {uploaded.name}</p>
          )}
        </div>
      )}

      <PlanSelect plans={plans} />

      <div className="pt-1">
        <Submit label="Add asset" />
      </div>
    </form>
  );
}

export function TrainingModuleForm({
  action,
  plans,
}: {
  action: FormAction;
  plans: PlanOption[];
}) {
  const [state, formAction] = useActionState<ActionState, FormData>(action, null);

  return (
    <form action={formAction} className="flex flex-col gap-4" noValidate>
      {state?.error && <Alert tone="error">{state.error}</Alert>}
      {state?.success && <Alert tone="success">{state.success}</Alert>}

      <Field label="Title" name="title" required maxLength={120} placeholder="How to write a hook that stops the scroll" />
      <Field label="Description" name="description" maxLength={500} />

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Sort position" name="position" type="number" inputMode="numeric" min={0} defaultValue={0} />
        <PlanSelect plans={plans} id="training-plan" />
      </div>

      <div className="pt-1">
        <Submit label="Add module" />
      </div>
    </form>
  );
}

export function MentorshipSlotForm({
  action,
  plans,
}: {
  action: FormAction;
  plans: PlanOption[];
}) {
  const [state, formAction] = useActionState<ActionState, FormData>(action, null);

  return (
    <form action={formAction} className="flex flex-col gap-4" noValidate>
      {state?.error && <Alert tone="error">{state.error}</Alert>}
      {state?.success && <Alert tone="success">{state.success}</Alert>}

      <Field label="Session title" name="title" required maxLength={120} placeholder="Campaign teardown — live" />
      <Field label="Description" name="description" maxLength={500} />
      <Field label="Mentor name" name="mentorName" required maxLength={80} placeholder="Aishwarya Sharma" />

      <div className="grid gap-4 sm:grid-cols-3">
        <Field
          label="Starts at"
          name="startsAt"
          type="datetime-local"
          required
          hint="Your local time."
        />
        <Field
          label="Duration (min)"
          name="durationMinutes"
          type="number"
          inputMode="numeric"
          min={15}
          max={480}
          defaultValue={60}
        />
        <Field
          label="Seats"
          name="capacity"
          type="number"
          inputMode="numeric"
          min={1}
          defaultValue={10}
        />
      </div>

      <Field
        label="Meeting link"
        name="meetingUrl"
        type="url"
        placeholder="https://meet.google.com/abc-defg-hij"
        hint="Only shown to people who have booked a seat."
      />

      <PlanSelect plans={plans} id="slot-plan" />

      <div className="pt-1">
        <Submit label="Schedule session" />
      </div>
    </form>
  );
}

/** Uploads a video to an existing training module. */
export function TrainingUploadButton({
  moduleId,
  hasVideo,
  requestUpload,
}: {
  moduleId: string;
  hasVideo: boolean;
  requestUpload: (
    moduleId: string,
  ) => Promise<{ uploadUrl: string; videoId: string } | { error: string }>;
}) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [progress, setProgress] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handle(file: File) {
    setError(null);
    setProgress(0);

    const target = await requestUpload(moduleId);
    if ("error" in target) {
      setError(target.error);
      setProgress(null);
      return;
    }

    await new Promise<void>((resolve) => {
      // XHR rather than fetch: fetch still has no upload progress events, and a
      // large video with no progress bar looks like a hang.
      const xhr = new XMLHttpRequest();
      xhr.open("POST", target.uploadUrl, true);
      xhr.upload.onprogress = (e) => {
        if (e.lengthComputable) setProgress(Math.round((e.loaded / e.total) * 100));
      };
      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          setProgress(100);
          router.refresh();
        } else {
          setError(`Upload failed (${xhr.status}).`);
          setProgress(null);
        }
        resolve();
      };
      xhr.onerror = () => {
        setError("Upload failed. Check your connection.");
        setProgress(null);
        resolve();
      };
      const form = new FormData();
      form.append("file", file);
      xhr.send(form);
    });
  }

  return (
    <div className="flex flex-col gap-1">
      <input
        ref={inputRef}
        type="file"
        accept="video/*"
        className="sr-only"
        aria-label="Training video"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) void handle(f);
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
            {hasVideo ? "Replace video" : "Upload video"}
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
