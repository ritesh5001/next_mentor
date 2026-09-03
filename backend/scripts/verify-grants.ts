/**
 * Comped-access checks.
 *
 *   pnpm verify:grants
 *
 * The feature hands out paid product for free, so the assertions that matter
 * are the ones about money: a grant must never mint commission, never create
 * an order, and never quietly rewrite a purchase as a gift.
 */
import { and, eq } from "drizzle-orm";

import { db } from "@/db";
import {
  commissions, courses, enrollments, orders, plans, subscriptions, users, wallets,
} from "@/db/schema";
import { grantCourse, grantPlan, revokeCourse, revokePlan, getUserAccess } from "@/services/grants";
import { generateUniqueReferralCode } from "@/lib/referral-code";
import { uniqueSlug } from "@/services/courses";

let failures = 0;
function check(label: string, ok: boolean, detail = "") {
  console.log(`${ok ? "PASS" : "FAIL"}  ${label}${detail ? ` — ${detail}` : ""}`);
  if (!ok) failures++;
}

async function main() {
  const stamp = Date.now();

  const [admin] = await db.insert(users).values({
    name: "Grant Admin", email: `gadmin${stamp}@test.local`, role: "admin",
    referralCode: await generateUniqueReferralCode(),
  }).returning();

  const [member] = await db.insert(users).values({
    name: "Grant Member", email: `gmember${stamp}@test.local`,
    referralCode: await generateUniqueReferralCode(),
  }).returning();

  const [course] = await db.insert(courses).values({
    slug: await uniqueSlug(`grant-course-${stamp}`), title: "Granted course",
    priceInPaise: 499900, status: "published",
  }).returning();

  const [plan] = await db.insert(plans).values({
    slug: `grant-plan-${stamp}`, name: "Granted plan", priceInPaise: 599900,
    durationDays: 365, commissionRateBps: 1500,
  }).returning();

  const ordersBefore = (await db.select().from(orders)).length;
  const commissionsBefore = (await db.select().from(commissions)).length;

  // ------------------------------------------------------------- course
  const g1 = await grantCourse({ userId: member.id, courseId: course.id, grantedById: admin.id });
  check("granting a course succeeds", "ok" in g1 && g1.created);

  const [enr] = await db.select().from(enrollments)
    .where(and(eq(enrollments.userId, member.id), eq(enrollments.courseId, course.id)));
  check("the enrollment exists", Boolean(enr));
  check("a comped enrollment has no order", enr.orderId === null);
  check("the granting admin is recorded", enr.grantedById === admin.id);
  check("it is live", enr.revokedAt === null);

  const g2 = await grantCourse({ userId: member.id, courseId: course.id, grantedById: admin.id });
  check("granting twice is idempotent", "ok" in g2 && g2.created === false);
  const dupes = await db.select().from(enrollments)
    .where(and(eq(enrollments.userId, member.id), eq(enrollments.courseId, course.id)));
  check("no duplicate enrollment row", dupes.length === 1, `${dupes.length} rows`);

  // ------------------------------------------------------------ the money
  check("no order was created", (await db.select().from(orders)).length === ordersBefore);
  check("no commission was created",
    (await db.select().from(commissions)).length === commissionsBefore);
  check("no wallet was created for the member",
    (await db.select().from(wallets).where(eq(wallets.userId, member.id))).length === 0);

  // --------------------------------------------------------------- plan
  const p1 = await grantPlan({ userId: member.id, planId: plan.id, grantedById: admin.id });
  check("granting a plan succeeds", "ok" in p1);

  const [sub] = await db.select().from(subscriptions)
    .where(and(eq(subscriptions.userId, member.id), eq(subscriptions.status, "active")));
  check("the subscription is active", Boolean(sub) && sub.status === "active");
  check("the granting admin is recorded on it", sub.grantedById === admin.id);
  check("expiry follows the plan's own duration", sub.expiresAt !== null);

  await grantPlan({ userId: member.id, planId: plan.id, grantedById: admin.id });
  const actives = await db.select().from(subscriptions)
    .where(and(eq(subscriptions.userId, member.id), eq(subscriptions.status, "active")));
  check("only one membership is ever live", actives.length === 1, `${actives.length} active`);

  check("still no commission after a plan grant",
    (await db.select().from(commissions)).length === commissionsBefore);

  // ------------------------------------------------- a purchase is not overwritten
  const [paidOrder] = await db.insert(orders).values({
    userId: member.id, itemType: "course", courseId: course.id,
    listPriceInPaise: 499900, amountInPaise: 499900,
    razorpayOrderId: `order_grant_${stamp}`, status: "paid",
  }).returning();

  await db.update(enrollments)
    .set({ orderId: paidOrder.id, grantedById: null })
    .where(eq(enrollments.id, enr.id));

  await grantCourse({ userId: member.id, courseId: course.id, grantedById: admin.id });
  const [afterPaid] = await db.select().from(enrollments).where(eq(enrollments.id, enr.id));
  check("granting over a purchase leaves the order intact", afterPaid.orderId === paidOrder.id);
  check("granting over a purchase does not claim authorship", afterPaid.grantedById === null);

  // ------------------------------------------------------------- revoke
  const r1 = await revokeCourse(member.id, course.id);
  check("revoking a course succeeds", "ok" in r1);
  const [revoked] = await db.select().from(enrollments).where(eq(enrollments.id, enr.id));
  check("revoked, not deleted", revoked.revokedAt !== null);

  const access = await getUserAccess(member.id);
  check("the revoked course still appears in the audit view", access.enrolled.length === 1);

  const back = await grantCourse({ userId: member.id, courseId: course.id, grantedById: admin.id });
  check("access can be reinstated", "ok" in back);
  const [reinstated] = await db.select().from(enrollments).where(eq(enrollments.id, enr.id));
  check("reinstating clears the revocation", reinstated.revokedAt === null);
  check("reinstating a purchase does not relabel it a gift",
    reinstated.orderId === paidOrder.id && reinstated.grantedById === null);

  const r2 = await revokePlan(member.id);
  check("revoking a plan succeeds", "ok" in r2);
  check("no membership is live afterwards",
    (await db.select().from(subscriptions)
      .where(and(eq(subscriptions.userId, member.id), eq(subscriptions.status, "active")))).length === 0);

  check("revoking a plan twice reports honestly", "error" in (await revokePlan(member.id)));
  check("granting a course that does not exist is refused",
    "error" in (await grantCourse({ userId: member.id, courseId: "nope", grantedById: admin.id })));
  check("granting to a user that does not exist is refused",
    "error" in (await grantCourse({ userId: "nope", courseId: course.id, grantedById: admin.id })));

  // ------------------------------------------------------------- cleanup
  await db.delete(enrollments).where(eq(enrollments.userId, member.id));
  await db.delete(subscriptions).where(eq(subscriptions.userId, member.id));
  await db.delete(orders).where(eq(orders.userId, member.id));
  await db.delete(courses).where(eq(courses.id, course.id));
  await db.delete(plans).where(eq(plans.id, plan.id));
  await db.delete(users).where(eq(users.id, member.id));
  await db.delete(users).where(eq(users.id, admin.id));

  console.log(failures === 0 ? "\nAll checks passed." : `\n${failures} check(s) FAILED.`);
  process.exit(failures === 0 ? 0 : 1);
}

main().catch((e) => { console.error(e); process.exit(1); });
