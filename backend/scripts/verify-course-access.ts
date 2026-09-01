/**
 * Top performers ranking + paid-content access control.
 *
 *   pnpm verify:course-access
 *
 * The two things a buyer and an affiliate would each notice immediately if
 * they broke: the leaderboard showing the wrong people, and course material
 * being downloadable without paying.
 */
import { eq, and } from "drizzle-orm";

import { db } from "@/db";
import {
  users, courses, modules, lessons, lessonResources,
  enrollments, orders, commissions, plans, subscriptions,
} from "@/db/schema";
import { getTopPerformers } from "@/services/affiliate";
import { isEnrolled } from "@/lib/permissions";
import { uploadCourseResource, signedResourceUrl, publicUrl, deleteObject } from "@/lib/imagekit";
import { generateUniqueReferralCode } from "@/lib/referral-code";
import { uniqueSlug } from "@/services/courses";

let failures = 0;
function check(label: string, ok: boolean, detail = "") {
  console.log(`${ok ? "PASS" : "FAIL"}  ${label}${detail ? ` — ${detail}` : ""}`);
  if (!ok) failures++;
}

const PDF = Buffer.from("%PDF-1.4\n1 0 obj\n<<>>\nendobj\ntrailer\n<<>>\n%%EOF\n");

async function main() {
  const stamp = Date.now();
  const made: string[] = [];

  const [plan] = await db.insert(plans).values({
    slug: `ca-plan-${stamp}`, name: "CA Plan", priceInPaise: 100000,
    durationDays: 365, commissionRateBps: 1000, isActive: true,
  }).returning({ id: plans.id });

  async function mkUser(tag: string) {
    const [u] = await db.insert(users).values({
      name: tag, email: `ca-${tag}-${stamp}@test.local`,
      referralCode: await generateUniqueReferralCode(), emailVerified: new Date(),
    }).returning({ id: users.id });
    made.push(u.id);
    return u.id;
  }

  const alice = await mkUser("alice");
  const bob = await mkUser("bob");
  const carol = await mkUser("carol");
  const buyer = await mkUser("buyer");
  const stranger = await mkUser("stranger");

  const [course] = await db.insert(courses).values({
    slug: await uniqueSlug(`CA Course ${stamp}`), title: "CA Course",
    priceInPaise: 200000, status: "published", publishedAt: new Date(),
  }).returning({ id: courses.id });

  const [mod] = await db.insert(modules).values({
    courseId: course.id, title: "Module 1", position: 0,
  }).returning({ id: modules.id });

  const [lesson] = await db.insert(lessons).values({
    moduleId: mod.id, title: "Lesson 1", position: 0,
    streamVideoId: `v${stamp}`, videoStatus: "ready", durationSeconds: 300,
  }).returning({ id: lessons.id });

  /* ------------------------------------------------ top performers ------ */

  // Three earners with different totals, all matured so they count.
  async function earn(earnerId: string, sourceId: string, amount: number, tag: string) {
    const rzp = `order_ca_${tag}_${stamp}`;
    const [o] = await db.insert(orders).values({
      userId: sourceId, itemType: "course", courseId: course.id,
      listPriceInPaise: 200000, amountInPaise: 200000,
      razorpayOrderId: rzp, status: "paid", paidAt: new Date(),
    }).returning({ id: orders.id });

    await db.insert(commissions).values({
      earnerId, sourceUserId: sourceId, orderId: o.id, level: 1,
      rateBps: 1000, baseAmountInPaise: 200000, amountInPaise: amount,
      status: "approved", maturesAt: new Date(Date.now() - 1000),
      approvedAt: new Date(),
    });
  }

  await earn(alice, buyer, 50000, "a");
  await earn(bob, stranger, 30000, "b");
  await earn(carol, buyer, 10000, "c");

  const board = await getTopPerformers(20);
  const mine = board.filter((r) => [alice, bob, carol].includes(r.userId));

  check("leaderboard returns the earners", mine.length === 3, `${mine.length} of 3`);
  check("ranked highest first",
    mine[0]?.userId === alice && mine[1]?.userId === bob && mine[2]?.userId === carol,
    mine.map((m) => m.earnedInPaise).join(" > "));
  check("totals are correct", mine[0]?.earnedInPaise === 50000, String(mine[0]?.earnedInPaise));
  check("sale counts are correct", mine[0]?.saleCount === 1, String(mine[0]?.saleCount));

  // Pending commission must NOT appear — it is still refundable.
  const rzpP = `order_ca_pending_${stamp}`;
  const [po] = await db.insert(orders).values({
    userId: stranger, itemType: "course", courseId: course.id,
    listPriceInPaise: 200000, amountInPaise: 200000,
    razorpayOrderId: rzpP, status: "paid", paidAt: new Date(),
  }).returning({ id: orders.id });
  await db.insert(commissions).values({
    earnerId: carol, sourceUserId: stranger, orderId: po.id, level: 1,
    rateBps: 1000, baseAmountInPaise: 200000, amountInPaise: 999999,
    status: "pending", maturesAt: new Date(Date.now() + 86400000),
  });

  const after = await getTopPerformers(20);
  const carolRow = after.find((r) => r.userId === carol);
  check("pending commission is excluded from the board",
    carolRow?.earnedInPaise === 10000, String(carolRow?.earnedInPaise));

  // Reversed commission must not count either.
  await db.update(commissions).set({ status: "reversed" })
    .where(and(eq(commissions.earnerId, bob), eq(commissions.status, "approved")));
  const after2 = await getTopPerformers(20);
  check("reversed commission drops off the board",
    !after2.some((r) => r.userId === bob));

  /* ------------------------------------------- paid content access ------ */

  const up = await uploadCourseResource({
    file: PDF, contentType: "application/pdf",
    courseId: course.id, lessonId: lesson.id,
  });

  if ("error" in up) {
    check("uploads a lesson resource", false, up.error);
  } else {
    check("uploads a lesson resource", true, up.filePath);

    await db.insert(lessonResources).values({
      lessonId: lesson.id, title: "Worksheet",
      filePath: up.filePath, sizeBytes: up.sizeBytes, mimeType: "application/pdf",
    });

    // THE check: paid material must not be publicly downloadable.
    const rawRes = await fetch(publicUrl(up.filePath)!);
    check("raw resource path is NOT public", !rawRes.ok, `HTTP ${rawRes.status}`);

    const signed = signedResourceUrl(up.filePath);
    const signedRes = await fetch(signed!);
    check("signed url downloads it", signedRes.ok, `HTTP ${signedRes.status}`);

    await deleteObject(up.filePath);
  }

  // Enrollment gating.
  check("stranger is not enrolled", !(await isEnrolled(stranger, course.id)));
  await db.insert(enrollments).values({ userId: buyer, courseId: course.id });
  check("buyer is enrolled", await isEnrolled(buyer, course.id));

  await db.update(enrollments).set({ revokedAt: new Date() })
    .where(and(eq(enrollments.userId, buyer), eq(enrollments.courseId, course.id)));
  check("revoked enrollment loses access", !(await isEnrolled(buyer, course.id)));

  /* ------------------------------------------------------------ cleanup - */
  await db.delete(lessonResources).where(eq(lessonResources.lessonId, lesson.id));
  await db.delete(commissions).where(eq(commissions.orderId, po.id));
  for (const u of made) {
    await db.delete(commissions).where(eq(commissions.earnerId, u));
    await db.delete(enrollments).where(eq(enrollments.userId, u));
    await db.delete(orders).where(eq(orders.userId, u));
    await db.delete(subscriptions).where(eq(subscriptions.userId, u));
  }
  await db.delete(courses).where(eq(courses.id, course.id));
  await db.delete(plans).where(eq(plans.id, plan.id));
  for (const u of made) await db.delete(users).where(eq(users.id, u));

  console.log(failures === 0 ? "\nAll checks passed." : `\n${failures} check(s) FAILED.`);
  process.exit(failures === 0 ? 0 : 1);
}

main().catch((e) => { console.error(e); process.exit(1); });
