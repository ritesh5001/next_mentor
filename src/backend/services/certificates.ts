import "server-only";

import crypto from "node:crypto";
import { and, desc, eq, isNull, sql } from "drizzle-orm";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

import { db } from "@/backend/db";
import {
  certificates,
  courses,
  enrollments,
  lessonProgress,
  lessons,
  modules,
  users,
} from "@/backend/db/schema";
import { appUrl } from "@/shared/env";

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
  // A4 landscape.
  const page = pdf.addPage([842, 595]);

  const serif = await pdf.embedFont(StandardFonts.TimesRoman);
  const serifBold = await pdf.embedFont(StandardFonts.TimesRomanBold);
  const sans = await pdf.embedFont(StandardFonts.Helvetica);

  const teal = rgb(0.05, 0.58, 0.53); // --color-primary
  const ink = rgb(0.06, 0.09, 0.16); // --color-foreground
  const muted = rgb(0.39, 0.45, 0.55); // --color-muted-foreground

  const { width, height } = page.getSize();

  // Border
  page.drawRectangle({
    x: 24,
    y: 24,
    width: width - 48,
    height: height - 48,
    borderColor: teal,
    borderWidth: 2,
  });
  page.drawRectangle({
    x: 32,
    y: 32,
    width: width - 64,
    height: height - 64,
    borderColor: teal,
    borderWidth: 0.5,
  });

  const centre = (text: string, font: typeof serif, size: number) =>
    (width - font.widthOfTextAtSize(text, size)) / 2;

  page.drawText("NEXTMENTOR", {
    x: centre("NEXTMENTOR", sans, 12),
    y: height - 90,
    size: 12,
    font: sans,
    color: teal,
  });

  page.drawText("Certificate of Completion", {
    x: centre("Certificate of Completion", serifBold, 34),
    y: height - 150,
    size: 34,
    font: serifBold,
    color: ink,
  });

  page.drawText("This is to certify that", {
    x: centre("This is to certify that", serif, 13),
    y: height - 200,
    size: 13,
    font: serif,
    color: muted,
  });

  // Long names would run past the border, so shrink to fit rather than clip.
  let nameSize = 30;
  while (serifBold.widthOfTextAtSize(params.recipientName, nameSize) > width - 160 && nameSize > 14) {
    nameSize -= 1;
  }
  page.drawText(params.recipientName, {
    x: centre(params.recipientName, serifBold, nameSize),
    y: height - 250,
    size: nameSize,
    font: serifBold,
    color: teal,
  });

  page.drawLine({
    start: { x: 180, y: height - 265 },
    end: { x: width - 180, y: height - 265 },
    thickness: 0.5,
    color: muted,
  });

  page.drawText("has successfully completed the course", {
    x: centre("has successfully completed the course", serif, 13),
    y: height - 300,
    size: 13,
    font: serif,
    color: muted,
  });

  let titleSize = 22;
  while (serifBold.widthOfTextAtSize(params.courseTitle, titleSize) > width - 160 && titleSize > 11) {
    titleSize -= 1;
  }
  page.drawText(params.courseTitle, {
    x: centre(params.courseTitle, serifBold, titleSize),
    y: height - 340,
    size: titleSize,
    font: serifBold,
    color: ink,
  });

  const dateLine = `Issued ${params.issuedAt.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })}`;
  page.drawText(dateLine, {
    x: centre(dateLine, serif, 12),
    y: 130,
    size: 12,
    font: serif,
    color: muted,
  });

  page.drawText(`Certificate no. ${params.serial}`, {
    x: 60,
    y: 70,
    size: 9,
    font: sans,
    color: muted,
  });

  const verifyLine = `Verify at ${appUrl().replace(/^https?:\/\//, "")}/verify/${params.serial}`;
  page.drawText(verifyLine, {
    x: width - 60 - sans.widthOfTextAtSize(verifyLine, 9),
    y: 70,
    size: 9,
    font: sans,
    color: muted,
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
