/**
 * Smoke test for Phase 4: certificates, achievements, leads, community,
 * mentorship capacity.
 *
 *   pnpm verify:engagement
 */
import { eq, and } from "drizzle-orm";

import { db } from "@/db";
import {
  users, courses, modules, lessons, enrollments, lessonProgress,
  certificates, achievements, userAchievements, leads,
  communityPosts, communityComments, mentorshipSlots, mentorshipBookings,
  plans, subscriptions,
} from "@/db/schema";
import {
  issueCertificate, getCourseCompletion, getCertificateBySerial, renderCertificatePdf,
} from "@/services/certificates";
import { evaluateAchievements, getUserMetrics } from "@/services/achievements";
import { getMentorshipSlots } from "@/services/engagement";
import { generateUniqueReferralCode } from "@/lib/referral-code";
import { uniqueSlug } from "@/services/courses";

let failures = 0;
function check(label: string, ok: boolean, detail = "") {
  console.log(`${ok ? "PASS" : "FAIL"}  ${label}${detail ? ` — ${detail}` : ""}`);
  if (!ok) failures++;
}

async function main() {
  const stamp = Date.now();

  // -------------------------------------------------------------- fixtures
  const [student] = await db.insert(users).values({
    name: "Cert Student", email: `p4s${stamp}@test.local`,
    referralCode: await generateUniqueReferralCode(), emailVerified: new Date(),
  }).returning({ id: users.id });

  const [course] = await db.insert(courses).values({
    slug: await uniqueSlug(`P4 Course ${stamp}`), title: "P4 Course",
    priceInPaise: 100000, status: "published", publishedAt: new Date(),
  }).returning({ id: courses.id });

  const [mod] = await db.insert(modules).values({
    courseId: course.id, title: "Section", position: 0,
  }).returning({ id: modules.id });

  const lessonRows = await db.insert(lessons).values([
    { moduleId: mod.id, title: "L1", position: 0, streamVideoId: `v1_${stamp}`, videoStatus: "ready", durationSeconds: 300 },
    { moduleId: mod.id, title: "L2", position: 1, streamVideoId: `v2_${stamp}`, videoStatus: "ready", durationSeconds: 300 },
    // Not ready: must not count toward completion.
    { moduleId: mod.id, title: "L3 (processing)", position: 2, videoStatus: "processing" },
  ]).returning({ id: lessons.id });

  // ------------------------------------------------- certificate gating
  const notEnrolled = await issueCertificate(student.id, course.id);
  check("not enrolled cannot claim", notEnrolled.status === "not_enrolled", notEnrolled.status);

  await db.insert(enrollments).values({ userId: student.id, courseId: course.id });

  const zero = await getCourseCompletion(student.id, course.id);
  check("unwatched course is 0%", zero.percent === 0 && !zero.isComplete);
  check("only ready lessons count toward the total", zero.total === 2, `total=${zero.total}`);

  const incomplete = await issueCertificate(student.id, course.id);
  check("incomplete course cannot claim", incomplete.status === "incomplete", incomplete.status);

  // Complete one of two.
  await db.insert(lessonProgress).values({
    userId: student.id, lessonId: lessonRows[0].id, courseId: course.id,
    secondsWatched: 300, lastPositionSeconds: 300, completedAt: new Date(),
  });
  const half = await getCourseCompletion(student.id, course.id);
  check("half-done reports 50%", half.percent === 50 && !half.isComplete, `${half.percent}%`);

  const stillIncomplete = await issueCertificate(student.id, course.id);
  check("half-done still cannot claim", stillIncomplete.status === "incomplete");

  // Complete the rest.
  await db.insert(lessonProgress).values({
    userId: student.id, lessonId: lessonRows[1].id, courseId: course.id,
    secondsWatched: 300, lastPositionSeconds: 300, completedAt: new Date(),
  });
  const done = await getCourseCompletion(student.id, course.id);
  check("all ready lessons done reports 100%", done.percent === 100 && done.isComplete);

  const issued = await issueCertificate(student.id, course.id);
  check("completed course issues a certificate", issued.status === "issued", issued.status);

  const serial = issued.status === "issued" ? issued.serial : "";
  check("serial has the expected shape", /^NM-[0-9A-Z]{4}-[0-9A-Z]{4}-[0-9A-Z]{4}$/.test(serial), serial);
  check("serial avoids ambiguous characters", !/[01OIL]/.test(serial.replace("NM-", "")), serial);

  const again = await issueCertificate(student.id, course.id);
  check("claiming twice returns the same serial",
    again.status === "already_issued" && again.serial === serial);

  const certRows = await db.select().from(certificates).where(eq(certificates.userId, student.id));
  check("exactly one certificate row", certRows.length === 1, `${certRows.length}`);

  // ------------------------------------------------------ public lookup
  const found = await getCertificateBySerial(serial);
  check("verify lookup finds it", found?.serial === serial);
  check("verify lookup is case-insensitive", (await getCertificateBySerial(serial.toLowerCase()))?.serial === serial);
  check("unknown serial returns null", (await getCertificateBySerial("NM-ZZZZ-ZZZZ-ZZZZ")) === null);

  // ------------------------------------------------------------ PDF
  const pdf = await renderCertificatePdf({
    serial, recipientName: "Cert Student", courseTitle: "P4 Course", issuedAt: new Date(),
  });
  check("PDF renders", pdf.length > 1000, `${pdf.length} bytes`);
  check("output is a real PDF", Buffer.from(pdf.slice(0, 5)).toString() === "%PDF-");

  const longPdf = await renderCertificatePdf({
    serial, issuedAt: new Date(),
    recipientName: "Bartholomew Maximilian Fitzgerald-Montgomery III",
    courseTitle: "An Extremely Long Course Title That Would Otherwise Overflow The Certificate Border",
  });
  check("long names and titles do not break rendering", longPdf.length > 1000);

  // ------------------------------------------------------- achievements
  const metrics = await getUserMetrics(student.id);
  check("lesson metric counts completions", metrics.lessons_completed === 2, `${metrics.lessons_completed}`);
  check("certificate metric counts certificates", metrics.certificates_earned === 1);

  await db.insert(achievements).values([
    { code: `p4_one_${stamp}`, title: "One lesson", description: "x", position: 0,
      criteria: { metric: "lessons_completed", threshold: 1 } },
    { code: `p4_hundred_${stamp}`, title: "Hundred lessons", description: "x", position: 1,
      criteria: { metric: "lessons_completed", threshold: 100 } },
    { code: `p4_bad_${stamp}`, title: "Broken", description: "x", position: 2,
      criteria: { metric: "not_a_real_metric", threshold: 1 } as never },
  ]);

  const earned = await evaluateAchievements(student.id);
  check("earned badge is awarded", earned.includes(`p4_one_${stamp}`), earned.join(","));
  check("unearned badge is not awarded", !earned.includes(`p4_hundred_${stamp}`));
  check("badge with an unknown metric is skipped, not fatal", !earned.includes(`p4_bad_${stamp}`));

  const rerun = await evaluateAchievements(student.id);
  check("re-running awards nothing new", rerun.length === 0, `${rerun.length}`);

  // Scoped to this test's own badges — the seeded ones (first_lesson,
  // first_certificate) are legitimately earned by this fixture too.
  const heldMine = await db
    .select({ code: achievements.code })
    .from(userAchievements)
    .innerJoin(achievements, eq(achievements.id, userAchievements.achievementId))
    .where(
      and(eq(userAchievements.userId, student.id), eq(achievements.code, `p4_one_${stamp}`)),
    );
  check("no duplicate row after re-run", heldMine.length === 1, `${heldMine.length}`);

  // -------------------------------------------------------------- leads
  const [lead] = await db.insert(leads).values({
    ownerId: student.id, name: "Prospect", email: "p@example.com", status: "new",
  }).returning({ id: leads.id });

  const [other] = await db.insert(users).values({
    name: "Other", email: `p4o${stamp}@test.local`,
    referralCode: await generateUniqueReferralCode(),
  }).returning({ id: users.id });

  // Ownership scoping: another user's update must match zero rows.
  const stolen = await db.update(leads).set({ status: "converted" })
    .where(and(eq(leads.id, lead.id), eq(leads.ownerId, other.id)))
    .returning({ id: leads.id });
  check("a lead cannot be moved by a non-owner", stolen.length === 0);

  // ---------------------------------------------------------- community
  const [post] = await db.insert(communityPosts).values({
    authorId: student.id, title: "Hello", body: "First post", category: "general",
  }).returning({ id: communityPosts.id });

  await db.insert(communityComments).values({
    postId: post.id, authorId: student.id, body: "A reply",
  });
  await db.update(communityPosts)
    .set({ commentCount: 1 }).where(eq(communityPosts.id, post.id));

  const { getCommunityFeed, getPostWithComments } = await import("@/services/engagement");

  check("post appears in the feed",
    (await getCommunityFeed()).some((p) => p.id === post.id));

  await db.update(communityPosts).set({ hiddenAt: new Date() }).where(eq(communityPosts.id, post.id));
  check("hidden post disappears from the feed",
    !(await getCommunityFeed()).some((p) => p.id === post.id));
  check("hidden post is not readable directly", (await getPostWithComments(post.id)) === null);

  // --------------------------------------------------------- mentorship
  const [proPlan] = await db.insert(plans).values({
    slug: `p4-plan-${stamp}`, name: "P4 Plan", priceInPaise: 100000,
    durationDays: 30, commissionRateBps: 1000, isActive: true,
  }).returning({ id: plans.id });

  const [openSlot] = await db.insert(mentorshipSlots).values({
    mentorName: "Mentor", title: "Open session",
    startsAt: new Date(Date.now() + 86400000), endsAt: new Date(Date.now() + 90000000),
    capacity: 1, meetingUrl: "https://meet.example.com/secret-room",
  }).returning({ id: mentorshipSlots.id });

  const [gatedSlot] = await db.insert(mentorshipSlots).values({
    mentorName: "Mentor", title: "Gated session",
    startsAt: new Date(Date.now() + 86400000), endsAt: new Date(Date.now() + 90000000),
    capacity: 5, meetingUrl: "https://meet.example.com/premium-room",
    planRequiredId: proPlan.id,
  }).returning({ id: mentorshipSlots.id });

  const before = await getMentorshipSlots(student.id);
  const openBefore = before.find((s) => s.id === openSlot.id);
  check("meeting link is hidden without a booking", openBefore?.meetingUrl === null);
  check("seats left is reported", openBefore?.seatsLeft === 1, String(openBefore?.seatsLeft));

  await db.insert(mentorshipBookings).values({ slotId: openSlot.id, userId: student.id });
  await db.update(mentorshipSlots).set({ bookedCount: 1 }).where(eq(mentorshipSlots.id, openSlot.id));

  const after = await getMentorshipSlots(student.id);
  const openAfter = after.find((s) => s.id === openSlot.id);
  check("meeting link appears once booked",
    openAfter?.meetingUrl === "https://meet.example.com/secret-room");
  check("slot shows as booked", openAfter?.isBooked === true);
  check("full slot reports zero seats", openAfter?.seatsLeft === 0);

  // Double-booking must be impossible.
  let dupBlocked = false;
  try {
    await db.insert(mentorshipBookings).values({ slotId: openSlot.id, userId: student.id });
  } catch { dupBlocked = true; }
  check("double-booking is blocked by the unique index", dupBlocked);

  const gated = after.find((s) => s.id === gatedSlot.id);
  check("gated slot still hides its link", gated?.meetingUrl === null);

  // ------------------------------------------------------------ cleanup
  await db.delete(mentorshipBookings).where(eq(mentorshipBookings.userId, student.id));
  await db.delete(mentorshipSlots).where(eq(mentorshipSlots.id, openSlot.id));
  await db.delete(mentorshipSlots).where(eq(mentorshipSlots.id, gatedSlot.id));
  await db.delete(subscriptions).where(eq(subscriptions.userId, student.id));
  await db.delete(plans).where(eq(plans.id, proPlan.id));
  await db.delete(communityComments).where(eq(communityComments.postId, post.id));
  await db.delete(communityPosts).where(eq(communityPosts.id, post.id));
  await db.delete(leads).where(eq(leads.ownerId, student.id));
  await db.delete(userAchievements).where(eq(userAchievements.userId, student.id));
  for (const c of [`p4_one_${stamp}`, `p4_hundred_${stamp}`, `p4_bad_${stamp}`]) {
    await db.delete(achievements).where(eq(achievements.code, c));
  }
  await db.delete(certificates).where(eq(certificates.userId, student.id));
  await db.delete(lessonProgress).where(eq(lessonProgress.userId, student.id));
  await db.delete(enrollments).where(eq(enrollments.userId, student.id));
  await db.delete(courses).where(eq(courses.id, course.id));
  await db.delete(users).where(eq(users.id, student.id));
  await db.delete(users).where(eq(users.id, other.id));

  console.log(failures === 0 ? "\nAll checks passed." : `\n${failures} check(s) FAILED.`);
  process.exit(failures === 0 ? 0 : 1);
}

main().catch((e) => { console.error(e); process.exit(1); });
