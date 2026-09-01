"use client";

import { useState } from "react";
import { Download, FileText, Loader2 } from "lucide-react";

import { formatBytes, type LessonResource } from "@nextmentor/shared";

/**
 * Downloadable files for the current lesson.
 *
 * The link is fetched on click rather than rendered into the page. These are
 * paid materials behind short-lived signed URLs — putting one in the HTML
 * would mean every URL leaks into the page source, browser history and any
 * "view source" a student shares, whether or not they ever download it.
 */
export function LessonResources({
  resources,
  getDownloadUrl,
}: {
  resources: LessonResource[];
  getDownloadUrl: (resourceId: string) => Promise<{ url?: string; error?: string }>;
}) {
  const [busy, setBusy] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  if (resources.length === 0) return null;

  async function download(r: LessonResource) {
    setError(null);
    setBusy(r.id);

    const result = await getDownloadUrl(r.id);

    if (result.error || !result.url) {
      setError(result.error ?? "Could not prepare that download.");
    } else {
      // A new tab rather than a same-tab navigation, so the player keeps
      // playing and the student does not lose their position.
      window.open(result.url, "_blank", "noopener,noreferrer");
    }
    setBusy(null);
  }

  return (
    <section className="flex flex-col gap-3 rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-card)] p-4">
      <h2 className="text-sm font-bold">
        Lesson materials
        <span className="ml-2 font-normal text-[var(--color-muted-foreground)]">
          {resources.length}
        </span>
      </h2>

      {error && (
        <p role="alert" className="text-xs font-medium text-[var(--color-destructive)]">
          {error}
        </p>
      )}

      <ul className="flex flex-col gap-2">
        {resources.map((r) => (
          <li key={r.id}>
            <button
              type="button"
              onClick={() => void download(r)}
              disabled={busy === r.id}
              className="flex min-h-11 w-full items-center gap-3 rounded-[var(--radius-control)] border border-[var(--color-border)] px-3 text-left transition-colors hover:border-[var(--color-primary)] disabled:opacity-60"
            >
              <FileText
                className="size-4 shrink-0 text-[var(--color-primary)]"
                strokeWidth={1.5}
                aria-hidden="true"
              />
              <span className="min-w-0 flex-1 truncate text-sm font-medium">{r.title}</span>
              {r.sizeBytes > 0 && (
                <span className="tabular shrink-0 text-xs text-[var(--color-muted-foreground)]">
                  {formatBytes(r.sizeBytes)}
                </span>
              )}
              {busy === r.id ? (
                <Loader2 className="size-4 shrink-0 animate-spin" aria-hidden="true" />
              ) : (
                <Download
                  className="size-4 shrink-0 text-[var(--color-muted-foreground)]"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
              )}
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
