import type { Metadata } from "next";
import { formatDate, formatDateTime } from "@/lib/format";
import Link from "next/link";
import { BadgeCheck, FileWarning, ShieldX } from "lucide-react";

import { buttonClasses } from "@/components/ui/button";
import { getCertificateBySerial } from "@/lib/queries";

type Params = { params: Promise<{ serial: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { serial } = await params;
  return {
    title: `Verify certificate ${serial}`,
    description: "Check whether a NextMentor certificate is genuine.",
    // Individual certificates should not be indexed — the page carries a
    // person's name and what they studied.
    robots: { index: false, follow: false },
  };
}

export default async function VerifyCertificatePage({ params }: Params) {
  const { serial } = await params;
  const cert = await getCertificateBySerial(serial);

  if (!cert) {
    return (
      <div className="mx-auto flex max-w-md flex-col items-center gap-4 px-6 py-24 text-center">
        <div className="flex size-14 items-center justify-center rounded-full bg-[var(--color-destructive-subtle)]">
          <FileWarning
            className="size-7 text-[var(--color-destructive)]"
            strokeWidth={1.5}
            aria-hidden="true"
          />
        </div>
        <h1 className="text-2xl font-extrabold tracking-tight">No such certificate</h1>
        <p className="text-sm leading-relaxed text-[var(--color-muted-foreground)]">
          We have no record of certificate{" "}
          <span className="font-mono font-semibold">{serial}</span>. Check the number and
          try again.
        </p>
        <Link href="/" className={buttonClasses({ variant: "secondary", className: "mt-2" })}>
          Go to NextMentor
        </Link>
      </div>
    );
  }

  if (cert.revokedAt) {
    return (
      <div className="mx-auto flex max-w-md flex-col items-center gap-4 px-6 py-24 text-center">
        <div className="flex size-14 items-center justify-center rounded-full bg-[var(--color-destructive-subtle)]">
          <ShieldX
            className="size-7 text-[var(--color-destructive)]"
            strokeWidth={1.5}
            aria-hidden="true"
          />
        </div>
        <h1 className="text-2xl font-extrabold tracking-tight">Certificate revoked</h1>
        <p className="text-sm leading-relaxed text-[var(--color-muted-foreground)]">
          This certificate was issued but has since been revoked and is no longer valid.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto flex max-w-lg flex-col items-center gap-6 px-6 py-20 text-center">
      <div className="flex size-16 items-center justify-center rounded-full bg-[var(--color-success-subtle)]">
        <BadgeCheck
          className="size-8 text-[var(--color-success)]"
          strokeWidth={1.5}
          aria-hidden="true"
        />
      </div>

      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-extrabold tracking-tight text-[var(--color-success)]">
          Genuine certificate
        </h1>
        <p className="text-sm text-[var(--color-muted-foreground)]">
          Issued by NextMentor and verified against our records.
        </p>
      </div>

      <dl className="flex w-full flex-col gap-4 rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-card)] p-6 text-left">
        <div className="flex flex-col gap-0.5">
          <dt className="text-xs font-semibold uppercase tracking-wide text-[var(--color-muted-foreground)]">
            Awarded to
          </dt>
          <dd className="text-lg font-bold">{cert.recipientName}</dd>
        </div>
        <div className="flex flex-col gap-0.5">
          <dt className="text-xs font-semibold uppercase tracking-wide text-[var(--color-muted-foreground)]">
            Course
          </dt>
          <dd className="font-semibold">{cert.courseTitle}</dd>
        </div>
        <div className="flex flex-col gap-0.5">
          <dt className="text-xs font-semibold uppercase tracking-wide text-[var(--color-muted-foreground)]">
            Issued
          </dt>
          <dd>
            {formatDate(cert.issuedAt, {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </dd>
        </div>
        <div className="flex flex-col gap-0.5">
          <dt className="text-xs font-semibold uppercase tracking-wide text-[var(--color-muted-foreground)]">
            Certificate number
          </dt>
          <dd className="font-mono text-sm">{cert.serial}</dd>
        </div>
      </dl>

      <div className="flex flex-wrap justify-center gap-2">
        <a
          href={`/api/certificates/${cert.serial}`}
          className={buttonClasses({ variant: "secondary" })}
        >
          View the certificate
        </a>
        <Link href="/courses" className={buttonClasses()}>
          Browse courses
        </Link>
      </div>
    </div>
  );
}
