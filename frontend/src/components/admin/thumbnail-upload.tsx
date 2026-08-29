"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ImageIcon, Upload } from "lucide-react";

import { Button } from "@/frontend/components/ui/button";
import type { ActionState } from "@/shared/action-state";

/**
 * Course thumbnail upload.
 *
 * The action pair for this existed since Phase 2 but nothing ever called it,
 * so every course rendered the placeholder icon. Uploads go straight to R2.
 */
export function ThumbnailUpload({
  courseId,
  currentUrl,
  requestUpload,
  setThumbnail,
}: {
  courseId: string;
  currentUrl: string | null;
  requestUpload: (input: {
    contentType: string;
    contentLength: number;
  }) => Promise<{ uploadUrl: string; key: string } | { error: string }>;
  setThumbnail: (courseId: string, key: string) => Promise<ActionState>;
}) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

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
      // Content-Type must match what was signed or R2 rejects the PUT.
      const res = await fetch(target.uploadUrl, {
        method: "PUT",
        body: file,
        headers: { "Content-Type": file.type },
      });
      if (!res.ok) throw new Error(String(res.status));

      const result = await setThumbnail(courseId, target.key);
      if (result?.error) {
        setError(result.error);
      } else {
        setPreview(URL.createObjectURL(file));
        router.refresh();
      }
    } catch {
      setError("Upload failed. Check your connection and try again.");
    }

    setBusy(false);
  }

  const shown = preview ?? currentUrl;

  return (
    <div className="flex flex-col gap-3">
      {/* Same 16:9 box whether or not there is an image, so the layout does not
          jump when one arrives. */}
      <div className="relative aspect-video w-full max-w-sm overflow-hidden rounded-[var(--radius-control)] border border-[var(--color-border)] bg-[var(--color-muted)]">
        {shown ? (
          // Plain <img>: during preview the source is a blob: URL, which
          // next/image cannot optimise.
          // eslint-disable-next-line @next/next/no-img-element
          <img src={shown} alt="" className="size-full object-cover" />
        ) : (
          <div className="flex size-full flex-col items-center justify-center gap-1">
            <ImageIcon
              className="size-8 text-[var(--color-muted-foreground)]"
              strokeWidth={1.5}
              aria-hidden="true"
            />
            <span className="text-xs text-[var(--color-muted-foreground)]">No thumbnail</span>
          </div>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/avif"
        className="sr-only"
        aria-label="Course thumbnail"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) void handle(f);
          e.target.value = "";
        }}
      />

      <div className="flex flex-col gap-1.5">
        <Button
          type="button"
          variant="secondary"
          size="sm"
          loading={busy}
          onClick={() => inputRef.current?.click()}
          className="w-fit"
        >
          <Upload className="size-3.5" strokeWidth={1.5} aria-hidden="true" />
          {shown ? "Replace thumbnail" : "Upload thumbnail"}
        </Button>

        <p className="text-xs text-[var(--color-muted-foreground)]">
          16:9 works best. JPEG, PNG, WebP or AVIF, up to 5MB.
        </p>

        {error && (
          <p role="alert" className="text-xs font-medium text-[var(--color-destructive)]">
            {error}
          </p>
        )}
      </div>
    </div>
  );
}
