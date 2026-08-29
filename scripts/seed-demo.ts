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
import { users, courses, modules, lessons } from "@/backend/db/schema";
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

  console.log("\nNote: lessons have no video (videoStatus=pending) — a real");
  console.log("Cloudflare Stream upload is needed before they are playable.");
  process.exit(0);
}

main().catch((e) => { console.error(e); process.exit(1); });
