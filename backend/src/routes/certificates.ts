import { Hono } from "hono";
import { eq } from "drizzle-orm";

import { db } from "@/db";
import { certificates } from "@/db/schema";
import {
  getCertificateBySerial,
  getMyCertificates,
  getCertificateCandidates,
  issueCertificate,
  renderCertificatePdf,
} from "@/services/certificates";
import { evaluateAchievements } from "@/services/achievements";
import { requireUser, currentUser } from "@/middleware/auth";
import { ok, fail } from "@/middleware/respond";

export const certificateRoutes = new Hono();

/** Public verification — the whole point of a verifiable credential. */
certificateRoutes.get("/verify/:serial", async (c) => {
  const cert = await getCertificateBySerial(c.req.param("serial"));
  if (!cert) return fail(c, "No such certificate.", "not_found");
  return ok(c, cert);
});

/**
 * The PDF. Rendered on demand rather than stored — pdf-lib is fast and the
 * document is tiny. Anyone holding the serial may fetch it; the serial itself
 * is unguessable.
 */
certificateRoutes.get("/:serial/pdf", async (c) => {
  const serial = c.req.param("serial").trim().toUpperCase();

  const [cert] = await db
    .select()
    .from(certificates)
    .where(eq(certificates.serial, serial))
    .limit(1);

  if (!cert) return c.text("Certificate not found", 404);
  if (cert.revokedAt) return c.text("This certificate has been revoked", 410);

  const pdf = await renderCertificatePdf({
    serial: cert.serial,
    recipientName: cert.recipientName,
    courseTitle: cert.courseTitle,
    issuedAt: cert.issuedAt,
  });

  return c.body(pdf as unknown as ArrayBuffer, 200, {
    "Content-Type": "application/pdf",
    "Content-Disposition": `inline; filename="NextMentor-${cert.serial}.pdf"`,
    "Cache-Control": "public, max-age=3600",
  });
});

certificateRoutes.get("/my", requireUser, async (c) => {
  const user = currentUser(c);
  const [issued, candidates] = await Promise.all([
    getMyCertificates(user.id),
    getCertificateCandidates(user.id),
  ]);
  return ok(c, { issued, candidates });
});

certificateRoutes.post("/claim/:courseId", requireUser, async (c) => {
  const user = currentUser(c);
  const result = await issueCertificate(user.id, c.req.param("courseId"));

  switch (result.status) {
    case "issued":
      // Earning a certificate can unlock a badge; do not make them wait for
      // the nightly job to see it.
      await evaluateAchievements(user.id);
      return ok(c, { serial: result.serial, issued: true });
    case "already_issued":
      return ok(c, { serial: result.serial, issued: false });
    case "not_enrolled":
      return fail(c, "You are not enrolled in that course.", "forbidden");
    case "incomplete":
      return fail(
        c,
        `Finish all lessons first — ${result.completed} of ${result.total} complete.`,
        "validation",
      );
  }
});
