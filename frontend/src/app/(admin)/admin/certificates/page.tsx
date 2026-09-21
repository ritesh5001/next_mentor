import type { Metadata } from "next";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

import { ActionButton } from "@/components/admin/row-actions";
import { Badge } from "@/components/ui/badge";
import { CertificateForm } from "@/components/admin/certificate-form";
import { setCertificateRevokedAction } from "@/actions/admin";
import { formatDate } from "@/lib/format";
import { listCertificatesForAdmin, listCoursesForAdmin, requireAdmin } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Certificates",
  robots: { index: false, follow: false },
};

/** Issued certificates, and the form for awarding one by hand. */
export default async function AdminCertificatesPage() {
  await requireAdmin();
  const [certificates, courses] = await Promise.all([
    listCertificatesForAdmin(),
    listCoursesForAdmin(),
  ]);

  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold tracking-tight">Certificates</h1>
        <p className="text-sm text-[var(--color-muted-foreground)]">
          {certificates.length} issued. Students earn one automatically on finishing a course; you
          can also award one here.
        </p>
      </header>

      <CertificateForm courses={courses.map((c) => ({ id: c.id, title: c.title }))} />

      {certificates.length === 0 ? (
        <p className="rounded-[18px] border border-dashed border-[rgb(16_26_71/0.14)] bg-white px-6 py-12 text-center text-sm text-[var(--color-muted-foreground)]">
          No certificates issued yet.
        </p>
      ) : (
        <div className="overflow-x-auto rounded-[18px] bg-white ring-1 ring-[rgb(16_26_71/0.07)]">
          <table className="w-full text-sm" style={{ minWidth: 820 }}>
            <thead>
              <tr className="bg-[var(--brand-hero-wash)] text-left">
                <th scope="col" className="px-4 py-3 font-semibold">Recipient</th>
                <th scope="col" className="px-4 py-3 font-semibold">Course</th>
                <th scope="col" className="px-4 py-3 font-semibold">Issued</th>
                <th scope="col" className="px-4 py-3 font-semibold">Serial</th>
                <th scope="col" className="px-4 py-3 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {certificates.map((c) => (
                <tr key={c.serial} className="border-t border-[rgb(16_26_71/0.06)]">
                  <td className="px-4 py-3">
                    <span className="block font-medium text-[var(--brand-ink)]">{c.recipientName}</span>
                    {c.email && (
                      <span className="block text-xs text-[var(--color-muted-foreground)]">{c.email}</span>
                    )}
                    {c.issuedById && (
                      <span className="mt-1 block text-[11px] text-[var(--color-muted-foreground)]">
                        issued by admin
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3">{c.courseTitle}</td>
                  <td className="px-4 py-3 text-[var(--color-muted-foreground)]">
                    {formatDate(c.issuedAt)}
                  </td>
                  <td className="px-4 py-3">
                    <Link
                      href={`/verify/${c.serial}`}
                      target="_blank"
                      className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-[var(--brand-blue)] hover:underline"
                    >
                      {c.serial}
                      <ExternalLink className="size-3" strokeWidth={1.8} aria-hidden="true" />
                    </Link>
                    {c.revokedAt && (
                      <Badge tone="danger" className="ml-2">Revoked</Badge>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end">
                      <ActionButton
                        run={setCertificateRevokedAction.bind(null, c.serial, !c.revokedAt)}
                        label={c.revokedAt ? "Restore" : "Revoke"}
                        variant={c.revokedAt ? "secondary" : "danger"}
                        confirm={
                          c.revokedAt
                            ? undefined
                            : `Revoke ${c.serial}? Its verification page will report it as revoked.`
                        }
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
