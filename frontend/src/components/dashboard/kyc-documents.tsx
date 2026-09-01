"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Check, FileText, Upload } from "lucide-react";

import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { KYC_DOC_SLOTS, KYC_DOC_LABELS, type KycDocSlot } from "@nextmentor/shared";
import { cn } from "@/lib/cn";

/**
 * The five identity documents required before KYC can be reviewed.
 *
 * These post to our own API rather than straight to ImageKit, unlike every
 * other upload in the app. ImageKit's upload signature covers only
 * `token + expire`, so a modified client could drop the `isPrivateFile` flag
 * and publish somebody's Aadhaar card to a public URL. Routing a few megabytes
 * through the server is what makes that flag non-negotiable.
 */
export function KycDocuments({
  uploaded,
  locked,
  uploadDocument,
}: {
  /** Which slots already have a file. Booleans, never storage paths. */
  uploaded: Record<KycDocSlot, boolean>;
  /** Approved submissions are frozen. */
  locked: boolean;
  uploadDocument: (
    slot: KycDocSlot,
    formData: FormData,
  ) => Promise<{ error?: string; success?: string } | null>;
}) {
  return (
    <fieldset className="flex flex-col gap-4" disabled={locked}>
      <legend className="mb-1 text-sm font-bold">Identity documents</legend>

      <p className="text-xs leading-relaxed text-[var(--color-muted-foreground)]">
        Clear photos or scans, under 10MB each. JPEG, PNG or PDF. These are
        stored privately — only our review team can open them, through links
        that expire after a few minutes.
      </p>

      <ul className="flex flex-col gap-3">
        {KYC_DOC_SLOTS.map((slot) => (
          <li key={slot}>
            <DocumentSlot
              slot={slot}
              done={uploaded[slot]}
              locked={locked}
              uploadDocument={uploadDocument}
            />
          </li>
        ))}
      </ul>
    </fieldset>
  );
}

function DocumentSlot({
  slot,
  done,
  locked,
  uploadDocument,
}: {
  slot: KycDocSlot;
  done: boolean;
  locked: boolean;
  uploadDocument: (
    slot: KycDocSlot,
    formData: FormData,
  ) => Promise<{ error?: string; success?: string } | null>;
}) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [justDone, setJustDone] = useState(false);

  const complete = done || justDone;

  async function handle(file: File) {
    setError(null);
    setBusy(true);

    const form = new FormData();
    form.append("slot", slot);
    form.append("file", file);

    const result = await uploadDocument(slot, form);

    if (result?.error) {
      setError(result.error);
    } else {
      setJustDone(true);
      router.refresh();
    }
    setBusy(false);
  }

  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-3 rounded-[var(--radius-control)] border p-3",
        complete
          ? "border-[var(--color-success)] bg-[var(--color-success-subtle)]/40"
          : "border-[var(--color-border)]",
      )}
    >
      <div
        className={cn(
          "flex size-9 shrink-0 items-center justify-center rounded-full",
          complete ? "bg-[var(--color-success)]" : "bg-[var(--color-muted)]",
        )}
      >
        {complete ? (
          <Check className="size-4 text-white" strokeWidth={2.5} aria-hidden="true" />
        ) : (
          <FileText
            className="size-4 text-[var(--color-muted-foreground)]"
            strokeWidth={1.5}
            aria-hidden="true"
          />
        )}
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
        <span className="text-sm font-medium">{KYC_DOC_LABELS[slot]}</span>
        <span className="text-xs text-[var(--color-muted-foreground)]">
          {complete ? "Uploaded" : "Required"}
        </span>
        {error && (
          <span role="alert" className="text-xs font-medium text-[var(--color-destructive)]">
            {error}
          </span>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/avif,application/pdf"
        className="sr-only"
        aria-label={KYC_DOC_LABELS[slot]}
        disabled={locked}
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
        disabled={locked}
        onClick={() => inputRef.current?.click()}
      >
        <Upload className="size-3.5" strokeWidth={1.5} aria-hidden="true" />
        {complete ? "Replace" : "Upload"}
      </Button>
    </div>
  );
}

/** Shown above the form when documents are still missing. */
export function MissingDocumentsNotice({
  uploaded,
}: {
  uploaded: Record<KycDocSlot, boolean>;
}) {
  const missing = KYC_DOC_SLOTS.filter((s) => !uploaded[s]);
  if (missing.length === 0) return null;

  return (
    <Alert tone="info">
      {missing.length === KYC_DOC_SLOTS.length
        ? "Upload all five documents below before submitting."
        : `Still needed: ${missing.map((s) => KYC_DOC_LABELS[s]).join(", ")}.`}
    </Alert>
  );
}
