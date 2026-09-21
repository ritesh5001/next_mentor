import crypto from "node:crypto";
import { and, desc, eq, isNull, sql } from "drizzle-orm";
import { readFile } from "node:fs/promises";
import { PDFDocument, StandardFonts, degrees, rgb } from "pdf-lib";
import QRCode from "qrcode";

import { db } from "@/db";
import {
  certificates,
  courses,
  enrollments,
  lessonProgress,
  lessons,
  modules,
  users,
} from "@/db/schema";
import { appUrl } from "@/lib/env";

/**
 * Course completion certificates.
 *
 * Issued only when every playable lesson is complete, rendered to a PDF, and
 * publicly verifiable at /verify/<serial>.
 */

/**
 * Crockford-style alphabet: no vowels (so no accidental words) and no 0/O or
 * 1/I/L, because serials get read aloud and typed by hand off a printed page.
 */
const SERIAL_ALPHABET = "23456789BCDFGHJKMNPQRSTVWXYZ";

/**
 * Serials are random, not sequential.
 *
 * A sequential serial tells anyone how many certificates exist and lets them
 * enumerate every real one — which is exactly what is needed to forge a
 * plausible credential by screenshotting somebody else's verify page.
 */
function generateSerial(): string {
  const bytes = crypto.randomBytes(12);
  let body = "";
  for (const b of bytes) body += SERIAL_ALPHABET[b % SERIAL_ALPHABET.length];
  return `NM-${body.slice(0, 4)}-${body.slice(4, 8)}-${body.slice(8, 12)}`;
}

/** Completion state for one enrolled course. */
export async function getCourseCompletion(userId: string, courseId: string) {
  const [row] = await db
    .select({
      total: sql<number>`cast(count(distinct ${lessons.id}) as int)`,
      completed: sql<number>`cast(count(distinct ${lessonProgress.id}) filter (where ${lessonProgress.completedAt} is not null) as int)`,
    })
    .from(modules)
    .innerJoin(
      lessons,
      and(eq(lessons.moduleId, modules.id), eq(lessons.videoStatus, "ready")),
    )
    .leftJoin(
      lessonProgress,
      and(eq(lessonProgress.lessonId, lessons.id), eq(lessonProgress.userId, userId)),
    )
    .where(eq(modules.courseId, courseId));

  const total = row?.total ?? 0;
  const completed = row?.completed ?? 0;

  return {
    total,
    completed,
    // A course with no playable lessons is not "100% complete" — it is empty.
    // Without this guard everyone would earn a certificate for a draft course.
    isComplete: total > 0 && completed >= total,
    percent: total > 0 ? Math.round((completed / total) * 100) : 0,
  };
}

export type IssueResult =
  | { status: "issued"; serial: string }
  | { status: "already_issued"; serial: string }
  | { status: "not_enrolled" }
  | { status: "incomplete"; completed: number; total: number };

/**
 * Issues a certificate, if it has been earned.
 *
 * Entitlement and completion are both re-checked here rather than trusted from
 * the caller: this is a credential someone will show an employer, so it must
 * not be mintable by POSTing at the endpoint.
 */
export async function issueCertificate(
  userId: string,
  courseId: string,
): Promise<IssueResult> {
  const [existing] = await db
    .select({ serial: certificates.serial })
    .from(certificates)
    .where(and(eq(certificates.userId, userId), eq(certificates.courseId, courseId)))
    .limit(1);

  if (existing) return { status: "already_issued", serial: existing.serial };

  const [enrollment] = await db
    .select({ id: enrollments.id })
    .from(enrollments)
    .where(
      and(
        eq(enrollments.userId, userId),
        eq(enrollments.courseId, courseId),
        isNull(enrollments.revokedAt),
      ),
    )
    .limit(1);

  if (!enrollment) return { status: "not_enrolled" };

  const completion = await getCourseCompletion(userId, courseId);
  if (!completion.isComplete) {
    return { status: "incomplete", completed: completion.completed, total: completion.total };
  }

  const [person] = await db
    .select({ name: users.name, email: users.email })
    .from(users)
    .where(eq(users.id, userId))
    .limit(1);

  const [course] = await db
    .select({ title: courses.title })
    .from(courses)
    .where(eq(courses.id, courseId))
    .limit(1);

  if (!person || !course) return { status: "not_enrolled" };

  // Names are snapshotted: a certificate records who completed the course on
  // that date, and must not silently change if the profile is edited later.
  const serial = generateSerial();

  const [created] = await db
    .insert(certificates)
    .values({
      userId,
      courseId,
      serial,
      recipientName: person.name ?? person.email,
      courseTitle: course.title,
    })
    // Guards the race between the existence check above and this insert.
    .onConflictDoNothing()
    .returning({ serial: certificates.serial });

  if (!created) {
    const [raced] = await db
      .select({ serial: certificates.serial })
      .from(certificates)
      .where(and(eq(certificates.userId, userId), eq(certificates.courseId, courseId)))
      .limit(1);
    return { status: "already_issued", serial: raced!.serial };
  }

  return { status: "issued", serial: created.serial };
}

/**
 * Renders the certificate PDF.
 *
 * Built with pdf-lib rather than a headless browser: no Chromium to cold-start
 * in a serverless function, and the output is deterministic.
 */
export async function renderCertificatePdf(params: {
  serial: string;
  recipientName: string;
  courseTitle: string;
  issuedAt: Date;
}): Promise<Uint8Array> {
  const pdf = await PDFDocument.create();
  // A4 landscape, the shape people expect to print or post.
  const page = pdf.addPage([842, 595]);
  const { width, height } = page.getSize();

  const serif = await pdf.embedFont(StandardFonts.TimesRoman);
  const serifBold = await pdf.embedFont(StandardFonts.TimesRomanBold);
  const serifItalic = await pdf.embedFont(StandardFonts.TimesRomanItalic);
  const sans = await pdf.embedFont(StandardFonts.Helvetica);
  const sansBold = await pdf.embedFont(StandardFonts.HelveticaBold);

  // The site's palette, so a shared certificate still looks like NextMentor.
  const navy = rgb(0.063, 0.102, 0.278); // #101a47
  const green = rgb(0.071, 0.631, 0.314); // #12a150
  const gold = rgb(0.804, 0.647, 0.302);
  const ink = rgb(0.06, 0.09, 0.16);
  const muted = rgb(0.42, 0.47, 0.56);

  const centre = (text: string, font: typeof serif, size: number) =>
    (width - font.widthOfTextAtSize(text, size)) / 2;

  /** Shrinks a line until it fits the frame rather than letting it run over. */
  const fitted = (text: string, font: typeof serif, start: number, max: number, min: number) => {
    let size = start;
    while (font.widthOfTextAtSize(text, size) > max && size > min) size -= 0.5;
    return size;
  };

  /* ----------------------------------------------------------- the frame */

  // Navy band around the edge, with the page showing through inside it.
  page.drawRectangle({ x: 0, y: 0, width, height, color: navy });
  page.drawRectangle({
    x: 18,
    y: 18,
    width: width - 36,
    height: height - 36,
    color: rgb(1, 1, 1),
  });
  // Two hairlines: gold outside, green inside.
  page.drawRectangle({
    x: 28,
    y: 28,
    width: width - 56,
    height: height - 56,
    borderColor: gold,
    borderWidth: 1.2,
  });
  page.drawRectangle({
    x: 34,
    y: 34,
    width: width - 68,
    height: height - 68,
    borderColor: green,
    borderWidth: 0.4,
  });

  // Corner ornaments — short gold rules meeting at each corner.
  const corner = (x: number, y: number, dx: number, dy: number) => {
    page.drawLine({
      start: { x, y },
      end: { x: x + 46 * dx, y },
      thickness: 2.2,
      color: gold,
    });
    page.drawLine({
      start: { x, y },
      end: { x, y: y + 46 * dy },
      thickness: 2.2,
      color: gold,
    });
    page.drawCircle({ x: x + 6 * dx, y: y + 6 * dy, size: 2.4, color: green });
  };
  corner(44, 44, 1, 1);
  corner(width - 44, 44, -1, 1);
  corner(44, height - 44, 1, -1);
  corner(width - 44, height - 44, -1, -1);

  /* --------------------------------------------------------- the heading */

  // The real mark, so the document carries the brand rather than a text
  // stand-in. Bundled under backend/assets so it ships with the API.
  try {
    const logoBytes = await readFile(new URL("../../assets/logo.png", import.meta.url));
    const logo = await pdf.embedPng(logoBytes);
    const logoWidth = 150;
    const scaled = logo.scale(logoWidth / logo.width);
    page.drawImage(logo, {
      x: (width - logoWidth) / 2,
      y: height - 60 - scaled.height,
      width: logoWidth,
      height: scaled.height,
    });
  } catch {
    // A missing logo must not cost the student their certificate.
    const mark = "NEXTMENTOR";
    page.drawText(mark, {
      x: centre(mark, sansBold, 16),
      y: height - 86,
      size: 16,
      font: sansBold,
      color: navy,
    });
  }

  // Spaced capitals read as engraving; pdf-lib has no letter-spacing, so the
  // spaces are in the string.
  const title = "C E R T I F I C A T E   O F   C O M P L E T I O N";
  const titleSize = fitted(title, serifBold, 26, width - 220, 16);
  page.drawText(title, {
    x: centre(title, serifBold, titleSize),
    y: height - 152,
    size: titleSize,
    font: serifBold,
    color: navy,
  });

  // Short rule with a diamond at its centre, under the title.
  const ruleY = height - 168;
  page.drawLine({
    start: { x: width / 2 - 90, y: ruleY },
    end: { x: width / 2 - 12, y: ruleY },
    thickness: 0.8,
    color: gold,
  });
  page.drawLine({
    start: { x: width / 2 + 12, y: ruleY },
    end: { x: width / 2 + 90, y: ruleY },
    thickness: 0.8,
    color: gold,
  });
  page.drawRectangle({
    x: width / 2 - 3.5,
    y: ruleY - 3.5,
    width: 7,
    height: 7,
    color: green,
    rotate: degrees(45),
  });

  /* ------------------------------------------------------- the recipient */

  const preamble = "This is to certify that";
  page.drawText(preamble, {
    x: centre(preamble, serifItalic, 13),
    y: height - 208,
    size: 13,
    font: serifItalic,
    color: muted,
  });

  const nameSize = fitted(params.recipientName, serifBold, 40, width - 240, 16);
  page.drawText(params.recipientName, {
    x: centre(params.recipientName, serifBold, nameSize),
    y: height - 256,
    size: nameSize,
    font: serifBold,
    color: navy,
  });
  page.drawLine({
    start: { x: 190, y: height - 272 },
    end: { x: width - 190, y: height - 272 },
    thickness: 0.6,
    color: rgb(0.85, 0.87, 0.9),
  });

  const middle = "has successfully completed the course";
  page.drawText(middle, {
    x: centre(middle, serif, 13),
    y: height - 300,
    size: 13,
    font: serif,
    color: muted,
  });

  const courseSize = fitted(params.courseTitle, serifBold, 25, width - 260, 12);
  page.drawText(params.courseTitle, {
    x: centre(params.courseTitle, serifBold, courseSize),
    y: height - 340,
    size: courseSize,
    font: serifBold,
    color: green,
  });

  const closing = "awarded in recognition of dedication and the skills demonstrated throughout the programme";
  const closingSize = fitted(closing, serifItalic, 11, width - 260, 8);
  page.drawText(closing, {
    x: centre(closing, serifItalic, closingSize),
    y: height - 366,
    size: closingSize,
    font: serifItalic,
    color: muted,
  });

  /* ------------------------------------------------------------ the seal */

  const sealX = width / 2;
  const sealY = 150;
  page.drawCircle({ x: sealX, y: sealY, size: 40, color: navy });
  page.drawCircle({ x: sealX, y: sealY, size: 34, borderColor: gold, borderWidth: 1 });
  page.drawCircle({ x: sealX, y: sealY, size: 27, color: green });
  // A tick, drawn as two strokes.
  page.drawLine({
    start: { x: sealX - 11, y: sealY + 2 },
    end: { x: sealX - 3, y: sealY - 7 },
    thickness: 3,
    color: rgb(1, 1, 1),
  });
  page.drawLine({
    start: { x: sealX - 3.6, y: sealY - 7 },
    end: { x: sealX + 12, y: sealY + 11 },
    thickness: 3,
    color: rgb(1, 1, 1),
  });
  // Under the medallion, not across it: inside the disc it collided with
  // the tick.
  const sealLabel = "V E R I F I E D";
  page.drawText(sealLabel, {
    x: sealX - sansBold.widthOfTextAtSize(sealLabel, 7.5) / 2,
    y: sealY - 56,
    size: 7.5,
    font: sansBold,
    color: navy,
  });

  /* ------------------------------------------------- signature and dates */

  const issued = params.issuedAt.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  // Left: the date, on its own rule.
  page.drawLine({ start: { x: 96, y: 128 }, end: { x: 276, y: 128 }, thickness: 0.6, color: muted });
  page.drawText(issued, {
    x: 96 + (180 - serif.widthOfTextAtSize(issued, 12)) / 2,
    y: 136,
    size: 12,
    font: serif,
    color: ink,
  });
  const dateLabel = "DATE OF ISSUE";
  page.drawText(dateLabel, {
    x: 96 + (180 - sans.widthOfTextAtSize(dateLabel, 7.5)) / 2,
    y: 114,
    size: 7.5,
    font: sans,
    color: muted,
  });

  // Right: the signature.
  const signName = "Saurabh Namdev";
  page.drawText(signName, {
    x: width - 276 + (180 - serifItalic.widthOfTextAtSize(signName, 17)) / 2,
    y: 136,
    size: 17,
    font: serifItalic,
    color: navy,
  });
  page.drawLine({
    start: { x: width - 276, y: 128 },
    end: { x: width - 96, y: 128 },
    thickness: 0.6,
    color: muted,
  });
  const signLabel = "FOUNDER & CEO, NEXTMENTOR";
  page.drawText(signLabel, {
    x: width - 276 + (180 - sans.widthOfTextAtSize(signLabel, 7.5)) / 2,
    y: 114,
    size: 7.5,
    font: sans,
    color: muted,
  });

  /* ------------------------------------------------------- verification */

  const verifyPath = `/verify/${params.serial}`;
  const verifyUrl = `${appUrl()}${verifyPath}`;

  // A QR beats typing a serial from a printed page. Drawn small, bottom-left,
  // where it cannot crowd the signature.
  try {
    const qrDataUrl = await QRCode.toDataURL(verifyUrl, {
      margin: 0,
      width: 220,
      color: { dark: "#101a47", light: "#ffffff" },
    });
    const qrImage = await pdf.embedPng(qrDataUrl);
    page.drawImage(qrImage, { x: 60, y: 52, width: 46, height: 46 });
    page.drawText("Scan to verify", {
      x: 112,
      y: 74,
      size: 8,
      font: sansBold,
      color: navy,
    });
    page.drawText(verifyUrl.replace(/^https?:\/\//, ""), {
      x: 112,
      y: 62,
      size: 7.5,
      font: sans,
      color: muted,
    });
  } catch {
    // No QR: the printed link still verifies the document.
    page.drawText(`Verify at ${verifyUrl.replace(/^https?:\/\//, "")}`, {
      x: 60,
      y: 62,
      size: 8,
      font: sans,
      color: muted,
    });
  }

  const serialLine = `Certificate no. ${params.serial}`;
  page.drawText(serialLine, {
    x: width - 60 - sansBold.widthOfTextAtSize(serialLine, 8.5),
    y: 62,
    size: 8.5,
    font: sansBold,
    color: navy,
  });

  return pdf.save();
}

/** Public lookup for the verification page. */
export async function getCertificateBySerial(serial: string) {
  const [row] = await db
    .select({
      serial: certificates.serial,
      recipientName: certificates.recipientName,
      courseTitle: certificates.courseTitle,
      issuedAt: certificates.issuedAt,
      revokedAt: certificates.revokedAt,
    })
    .from(certificates)
    .where(eq(certificates.serial, serial.trim().toUpperCase()))
    .limit(1);

  return row ?? null;
}

export async function getMyCertificates(userId: string) {
  return db
    .select({
      serial: certificates.serial,
      courseTitle: certificates.courseTitle,
      courseSlug: courses.slug,
      issuedAt: certificates.issuedAt,
      revokedAt: certificates.revokedAt,
    })
    .from(certificates)
    .innerJoin(courses, eq(courses.id, certificates.courseId))
    .where(eq(certificates.userId, userId))
    .orderBy(desc(certificates.issuedAt));
}

/** Enrolled courses with completion, so the page can offer or explain. */
export async function getCertificateCandidates(userId: string) {
  const rows = await db
    .select({
      courseId: courses.id,
      courseTitle: courses.title,
      courseSlug: courses.slug,
      total: sql<number>`cast(count(distinct ${lessons.id}) as int)`,
      completed: sql<number>`cast(count(distinct ${lessonProgress.id}) filter (where ${lessonProgress.completedAt} is not null) as int)`,
      certificateSerial: certificates.serial,
    })
    .from(enrollments)
    .innerJoin(courses, eq(courses.id, enrollments.courseId))
    .leftJoin(modules, eq(modules.courseId, courses.id))
    .leftJoin(
      lessons,
      and(eq(lessons.moduleId, modules.id), eq(lessons.videoStatus, "ready")),
    )
    .leftJoin(
      lessonProgress,
      and(eq(lessonProgress.lessonId, lessons.id), eq(lessonProgress.userId, userId)),
    )
    .leftJoin(
      certificates,
      and(eq(certificates.courseId, courses.id), eq(certificates.userId, userId)),
    )
    .where(and(eq(enrollments.userId, userId), isNull(enrollments.revokedAt)))
    .groupBy(courses.id, certificates.serial);

  return rows.map((r) => ({
    ...r,
    percent: r.total > 0 ? Math.round((r.completed / r.total) * 100) : 0,
    isComplete: r.total > 0 && r.completed >= r.total,
  }));
}
