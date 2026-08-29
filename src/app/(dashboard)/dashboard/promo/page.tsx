import type { Metadata } from "next";
import Link from "next/link";
import { Download, FileText, Image as ImageIcon, Lock, Megaphone, Video } from "lucide-react";

import { requireUser } from "@/backend/lib/permissions";
import { getPromoAssets } from "@/backend/services/engagement";
import { publicUrl } from "@/backend/lib/r2";
import { CopyButton } from "@/frontend/components/ui/copy-button";
import { Badge } from "@/frontend/components/ui/badge";
import { buttonClasses } from "@/frontend/components/ui/button";

export const metadata: Metadata = {
  title: "Promotional material",
  robots: { index: false, follow: false },
};

const TYPE_ICON = {
  banner: ImageIcon,
  video: Video,
  script: FileText,
  pdf: FileText,
} as const;

export default async function PromoPage() {
  const user = await requireUser();
  const assets = await getPromoAssets(user.id);

  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-col gap-1">
        <h1 className="text-2xl font-extrabold tracking-tight">Promotional material</h1>
        <p className="text-sm text-[var(--color-muted-foreground)]">
          Ready-made banners, videos and copy for sharing your affiliate link.
        </p>
      </header>

      {assets.length === 0 ? (
        <div className="flex flex-col items-center gap-3 rounded-[var(--radius-card)] border border-dashed border-[var(--color-border)] bg-[var(--color-card)] px-6 py-16 text-center">
          <Megaphone
            className="size-8 text-[var(--color-muted-foreground)]"
            strokeWidth={1.5}
            aria-hidden="true"
          />
          <h2 className="text-lg font-bold">Nothing here yet</h2>
          <p className="max-w-sm text-sm text-[var(--color-muted-foreground)]">
            Promotional assets will appear here as they are published.
          </p>
        </div>
      ) : (
        <ul className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {assets.map((a) => {
            const Icon = TYPE_ICON[a.type];
            const href = publicUrl(a.r2Key);

            return (
              <li
                key={a.id}
                className="flex flex-col gap-3 rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-card)] p-4"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <Icon
                      className="size-5 shrink-0 text-[var(--color-primary)]"
                      strokeWidth={1.5}
                      aria-hidden="true"
                    />
                    <h2 className="font-bold leading-snug">{a.title}</h2>
                  </div>
                  {a.locked && (
                    <Badge tone="neutral">
                      <Lock className="size-3" strokeWidth={2} aria-hidden="true" />
                      {a.planRequiredName ?? "Locked"}
                    </Badge>
                  )}
                </div>

                {a.description && (
                  <p className="text-sm leading-relaxed text-[var(--color-muted-foreground)]">
                    {a.description}
                  </p>
                )}

                {a.dimensions && (
                  <span className="text-xs text-[var(--color-muted-foreground)]">
                    {a.dimensions}
                  </span>
                )}

                {a.locked ? (
                  <Link
                    href="/dashboard/plan"
                    className={buttonClasses({
                      variant: "secondary",
                      size: "sm",
                      className: "mt-auto w-fit",
                    })}
                  >
                    Upgrade to unlock
                  </Link>
                ) : a.type === "script" && a.bodyText ? (
                  <div className="mt-auto flex flex-col gap-2">
                    <p className="whitespace-pre-line rounded-[var(--radius-control)] bg-[var(--color-muted)] p-3 text-sm leading-relaxed">
                      {a.bodyText}
                    </p>
                    <div className="w-fit">
                      <CopyButton text={a.bodyText} label="Copy this copy" />
                    </div>
                  </div>
                ) : href ? (
                  <a
                    href={href}
                    download
                    className={buttonClasses({ size: "sm", className: "mt-auto w-fit" })}
                  >
                    <Download className="size-3.5" strokeWidth={1.5} aria-hidden="true" />
                    Download
                  </a>
                ) : (
                  <span className="mt-auto text-xs text-[var(--color-muted-foreground)]">
                    File not available
                  </span>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
