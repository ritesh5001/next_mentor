/**
 * Seeds a demo admin + course so the app can be clicked through locally.
 *
 *   pnpm seed:demo
 *
 * Idempotent: safe to run repeatedly.
 */
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";

import { db } from "@/backend/db";
import {
  users, courses, modules, lessons, plans, coupons, achievements,
} from "@/backend/db/schema";
import { generateUniqueReferralCode } from "@/backend/lib/referral-code";

const ADMIN_EMAIL = "admin@nextmentor.local";
const ADMIN_PASSWORD = "Admin123!";

async function main() {
  let [admin] = await db.select({ id: users.id }).from(users)
    .where(eq(users.email, ADMIN_EMAIL)).limit(1);

  if (!admin) {
    [admin] = await db.insert(users).values({
      name: "Demo Admin", email: ADMIN_EMAIL,
      passwordHash: await bcrypt.hash(ADMIN_PASSWORD, 12),
      role: "admin", emailVerified: new Date(),
      referralCode: await generateUniqueReferralCode(),
    }).returning({ id: users.id });
    console.log(`Created admin  ${ADMIN_EMAIL} / ${ADMIN_PASSWORD}`);
  } else {
    await db.update(users).set({ role: "admin", emailVerified: new Date() })
      .where(eq(users.id, admin.id));
    console.log(`Admin already exists  ${ADMIN_EMAIL} / ${ADMIN_PASSWORD}`);
  }

  // A non-admin account, so the role gate can be exercised locally.
  const STUDENT_EMAIL = "student@nextmentor.local";
  const STUDENT_PASSWORD = "Student123!";

  const [existingStudent] = await db.select({ id: users.id }).from(users)
    .where(eq(users.email, STUDENT_EMAIL)).limit(1);

  if (!existingStudent) {
    await db.insert(users).values({
      name: "Demo Student", email: STUDENT_EMAIL,
      passwordHash: await bcrypt.hash(STUDENT_PASSWORD, 12),
      role: "student", emailVerified: new Date(),
      referralCode: await generateUniqueReferralCode(),
    });
    console.log(`Created student  ${STUDENT_EMAIL} / ${STUDENT_PASSWORD}`);
  } else {
    console.log(`Student already exists  ${STUDENT_EMAIL} / ${STUDENT_PASSWORD}`);
  }

  const slug = "meta-ads-mastery";
  let [course] = await db.select({ id: courses.id }).from(courses)
    .where(eq(courses.slug, slug)).limit(1);

  if (!course) {
    [course] = await db.insert(courses).values({
      slug, title: "Meta Ads Mastery",
      subtitle: "Run profitable ad campaigns from scratch",
      description:
        "Build, launch and scale Meta ad campaigns that actually return a profit.\n\n" +
        "You will set up Business Manager correctly, build audiences that convert, " +
        "write creative that stops the scroll, and read the numbers well enough to " +
        "know when to scale and when to kill.",
      instructorName: "Aishwarya Sharma",
      priceInPaise: 249900, mrpInPaise: 499900,
      level: "beginner", language: "en",
      status: "published", publishedAt: new Date(),
    }).returning({ id: courses.id });

    const [m1] = await db.insert(modules).values({
      courseId: course.id, title: "Foundations", position: 0,
    }).returning({ id: modules.id });

    const [m2] = await db.insert(modules).values({
      courseId: course.id, title: "Campaign Building", position: 1,
    }).returning({ id: modules.id });

    // videoStatus stays "pending": no real Cloudflare upload has happened.
    // The lesson rows exist so the curriculum renders.
    await db.insert(lessons).values([
      { moduleId: m1.id, title: "Welcome and what you'll build", position: 0, isFreePreview: true, durationSeconds: 240 },
      { moduleId: m1.id, title: "Setting up Business Manager", position: 1, durationSeconds: 720 },
      { moduleId: m2.id, title: "Your first campaign, step by step", position: 0, durationSeconds: 1080 },
      { moduleId: m2.id, title: "Reading the numbers that matter", position: 1, durationSeconds: 900 },
    ]);

    console.log(`Created course /courses/${slug} with 2 sections, 4 lessons`);
  } else {
    console.log(`Course already exists  /courses/${slug}`);
  }

  // ------------------------------------------------------------------ plans
  const planSeed = [
    {
      slug: "starter", name: "Starter", tagline: "Get going with the essentials",
      priceInPaise: 99900, mrpInPaise: 199900, durationDays: 365,
      commissionRateBps: 500, position: 0, isFeatured: false, grantsAllCourses: false,
      features: ["Access to 3 starter courses", "Community access", "Certificate on completion"],
    },
    {
      slug: "pro", name: "Pro", tagline: "The full catalog, plus real commission",
      priceInPaise: 249900, mrpInPaise: 499900, durationDays: 365,
      commissionRateBps: 1500, position: 1, isFeatured: true, grantsAllCourses: true,
      features: ["Every course, forever updated", "10% referral commission", "Priority support", "Monthly live Q&A"],
    },
    {
      slug: "premium-pro", name: "Premium Pro", tagline: "Highest commission and 1:1 mentorship",
      priceInPaise: 599900, mrpInPaise: 999900, durationDays: null,
      commissionRateBps: 2500, position: 2, isFeatured: false, grantsAllCourses: true,
      features: ["Lifetime access to everything", "25% referral commission", "1:1 mentorship calls", "Done-with-you campaign reviews"],
    },
  ];

  for (const p of planSeed) {
    const [exists] = await db.select({ id: plans.id }).from(plans)
      .where(eq(plans.slug, p.slug)).limit(1);
    if (!exists) {
      await db.insert(plans).values(p);
      console.log(`Created plan    ${p.name}`);
    }
  }

  // ---------------------------------------------------------------- coupons
  const couponSeed = [
    {
      code: "LAUNCH20", description: "Launch week — 20% off anything",
      discountType: "percent" as const, value: 2000,
      maxDiscountInPaise: 100000, minOrderInPaise: 0, perUserLimit: 1, scope: "all" as const,
    },
    {
      code: "FIRST500", description: "₹500 off your first course",
      discountType: "flat" as const, value: 50000,
      minOrderInPaise: 150000, perUserLimit: 1, scope: "all" as const,
    },
  ];

  for (const c of couponSeed) {
    const [exists] = await db.select({ id: coupons.id }).from(coupons)
      .where(eq(coupons.code, c.code)).limit(1);
    if (!exists) {
      await db.insert(coupons).values(c);
      console.log(`Created coupon  ${c.code}`);
    }
  }

  // ----------------------------------------------------------- achievements
  const badgeSeed = [
    { code: "first_lesson", title: "First steps", description: "Complete your first lesson.",
      icon: "Footprints", tier: "bronze", position: 0,
      criteria: { metric: "lessons_completed", threshold: 1 } },
    { code: "ten_lessons", title: "Getting serious", description: "Complete 10 lessons.",
      icon: "Flame", tier: "bronze", position: 1,
      criteria: { metric: "lessons_completed", threshold: 10 } },
    { code: "first_certificate", title: "Certified", description: "Earn your first certificate.",
      icon: "Award", tier: "silver", position: 2,
      criteria: { metric: "certificates_earned", threshold: 1 } },
    { code: "first_referral", title: "Word of mouth", description: "Refer your first sign-up.",
      icon: "UserPlus", tier: "bronze", position: 3,
      criteria: { metric: "referrals_signed_up", threshold: 1 } },
    { code: "five_buyers", title: "Closer", description: "Five of your referrals made a purchase.",
      icon: "Handshake", tier: "silver", position: 4,
      criteria: { metric: "referrals_purchased", threshold: 5 } },
    { code: "earned_10k", title: "Ten thousand", description: "Earn ₹10,000 in cleared commission.",
      icon: "Trophy", tier: "gold", position: 5,
      criteria: { metric: "commission_earned_paise", threshold: 1000000 } },
  ];

  for (const b of badgeSeed) {
    const [exists] = await db.select({ id: achievements.id }).from(achievements)
      .where(eq(achievements.code, b.code)).limit(1);
    if (!exists) {
      await db.insert(achievements).values(b);
      console.log(`Created badge   ${b.title}`);
    }
  }

  console.log("\nNote: lessons have no video (videoStatus=pending) — a real");
  console.log("Cloudflare Stream upload is needed before they are playable.");
  process.exit(0);
}

main().catch((e) => { console.error(e); process.exit(1); });
