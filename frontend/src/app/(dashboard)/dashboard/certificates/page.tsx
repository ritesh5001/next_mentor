import type { Metadata } from "next";
import { formatDate, formatDateTime } from "@/lib/format";
import { Award, Download, ExternalLink } from "lucide-react";

import { ActionButton } from "@/components/admin/row-actions";
import { buttonClasses } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { requireUser, getMyCertificates } from "@/lib/queries";
import { issueCertificateAction } from "@/actions";


export const metadata: Metadata = {
  title: "Certificates",
  robots: { index: false, follow: false },
};

export default async function CertificatesPage() {
  const user = await requireUser();
  const { issued, candidates } = await getMyCertificates();

  const pending = candidates.filter((c) => !c.certificateSerial);

  return (
    <div className="flex flex-col gap-8">
      <header className="flex flex-col gap-1">
        <h1 className="text-2xl font-extrabold tracking-tight">Certificates</h1>
        <p className="text-sm text-[var(--color-muted-foreground)]">
          Finish every lesson in a course to earn a verifiable certificate.
        </p>
      </header>

      {issued.length > 0 && (
        <section className="flex flex-col gap-3">
          <h2 className="text-lg font-bold tracking-tight">Earned</h2>
          <ul className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {issued.map((c) => (
              <li
                key={c.serial}
                className="flex flex-col gap-3 rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-card)] p-5"
              >
                <div className="flex items-start justify-between gap-2">
                  <Award
                    className="size-6 shrink-0 text-[var(--color-accent)]"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                  {c.revokedAt && <Badge tone="danger">Revoked</Badge>}
                </div>

                <div className="flex flex-col gap-1">
                  <h3 className="font-bold leading-snug">{c.courseTitle}</h3>
                  <p className="text-xs text-[var(--color-muted-foreground)]">
                    Issued{" "}
                    {formatDate(c.issuedAt, {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                  <p className="font-mono text-xs text-[var(--color-muted-foreground)]">
                    {c.serial}
                  </p>
                </div>

                {!c.revokedAt && (
                  <div className="mt-auto flex flex-wrap gap-2 pt-1">
                    <a
                      href={`/api/certificates/${c.serial}`}
                      className={buttonClasses({ size: "sm" })}
                    >
                      <Download className="size-3.5" strokeWidth={1.5} aria-hidden="true" />
                      Download PDF
                    </a>
                    <a
                      href={`/verify/${c.serial}`}
                      className={buttonClasses({ variant: "secondary", size: "sm" })}
                    >
                      <ExternalLink className="size-3.5" strokeWidth={1.5} aria-hidden="true" />
                      Share link
                    </a>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="flex flex-col gap-3">
        <h2 className="text-lg font-bold tracking-tight">
          {issued.length > 0 ? "In progress" : "Your courses"}
        </h2>

        {pending.length === 0 ? (
          <p className="rounded-[var(--radius-card)] border border-dashed border-[var(--color-border)] bg-[var(--color-card)] px-6 py-12 text-center text-sm text-[var(--color-muted-foreground)]">
            {issued.length > 0
              ? "You have a certificate for every course you are enrolled in."
              : "Enrol in a course and finish it to earn your first certificate."}
          </p>
        ) : (
          <ul className="flex flex-col gap-3">
            {pending.map((c) => (
              <li
                key={c.courseId}
                className="flex flex-wrap items-center justify-between gap-4 rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-card)] p-4"
              >
                <div className="flex min-w-0 flex-1 flex-col gap-1.5">
                  <h3 className="font-semibold">{c.courseTitle}</h3>
                  <div className="flex items-center gap-2">
                    <div
                      role="progressbar"
                      aria-valuenow={c.percent}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-label={`${c.courseTitle} progress`}
                      className="h-1.5 w-32 overflow-hidden rounded-full bg-[var(--color-muted)]"
                    >
                      <div
                        className="h-full rounded-full bg-[var(--color-primary)]"
                        style={{ width: `${c.percent}%` }}
                      />
                    </div>
                    <span className="tabular text-xs font-medium text-[var(--color-muted-foreground)]">
                      {c.completed}/{c.total} lessons · {c.percent}%
                    </span>
                  </div>
                </div>

                {c.isComplete ? (
                  <ActionButton
                    label="Claim certificate"
                    busyLabel="Issuing…"
                    variant="money"
                    run={async () => {
                      "use server";
                      return issueCertificateAction(c.courseId);
                    }}
                  />
                ) : (
                  <span className="text-xs text-[var(--color-muted-foreground)]">
                    {c.total - c.completed} lesson(s) to go
                  </span>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
