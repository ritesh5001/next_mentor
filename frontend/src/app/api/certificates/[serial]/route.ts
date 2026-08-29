import { eq } from "drizzle-orm";

import { db } from "@/backend/db";
import { certificates } from "@/backend/db/schema";
import { getSessionUser } from "@/backend/lib/permissions";
import { renderCertificatePdf } from "@/backend/services/certificates";

/**
 * Serves the certificate PDF.
 *
 * Rendered on demand rather than stored: pdf-lib is fast, the document is tiny,
 * and generating it fresh means a name correction is reflected without a
 * re-issue. Anyone holding the serial may download it — that is the point of a
 * verifiable credential — but the serial is unguessable.
 */
export const runtime = "nodejs";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ serial: string }> },
) {
  const { serial } = await params;

  const [cert] = await db
    .select()
    .from(certificates)
    .where(eq(certificates.serial, serial.trim().toUpperCase()))
    .limit(1);

  if (!cert) {
    return new Response("Certificate not found", { status: 404 });
  }

  if (cert.revokedAt) {
    // A revoked certificate must not keep producing a valid-looking PDF.
    return new Response("This certificate has been revoked", { status: 410 });
  }

  const pdf = await renderCertificatePdf({
    serial: cert.serial,
    recipientName: cert.recipientName,
    courseTitle: cert.courseTitle,
    issuedAt: cert.issuedAt,
  });

  // The owner gets a download; anyone else verifying gets an inline preview.
  const viewer = await getSessionUser();
  const disposition = viewer?.id === cert.userId ? "attachment" : "inline";

  return new Response(pdf as BodyInit, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `${disposition}; filename="NextMentor-${cert.serial}.pdf"`,
      "Cache-Control": "private, max-age=3600",
    },
  });
}
