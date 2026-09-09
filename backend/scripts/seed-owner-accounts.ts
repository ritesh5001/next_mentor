/**
 * One-off script: creates the owner's admin + test-user accounts.
 *
 *   pnpm tsx scripts/seed-owner-accounts.ts
 *
 * Idempotent: safe to run repeatedly.
 */
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";

import { db } from "@/db";
import { users, plans } from "@/db/schema";
import { generateUniqueReferralCode } from "@/lib/referral-code";
import { grantPlan } from "@/services/grants";

const PASSWORD = "Ritesh5001@";

const ADMIN_EMAIL = "saurabhnamdev2015@gmail.com";
const USER_EMAIL = "mohitnamdev2016@gmail.com";

async function upsertUser(email: string, role: "admin" | "student") {
  const [existing] = await db.select({ id: users.id }).from(users)
    .where(eq(users.email, email)).limit(1);

  if (existing) {
    await db.update(users)
      .set({ role, emailVerified: new Date(), passwordHash: await bcrypt.hash(PASSWORD, 12) })
      .where(eq(users.id, existing.id));
    console.log(`Updated ${role}  ${email}`);
    return existing.id;
  }

  const [created] = await db.insert(users).values({
    name: role === "admin" ? "Saurabh (Admin)" : "Mohit",
    email,
    passwordHash: await bcrypt.hash(PASSWORD, 12),
    role,
    emailVerified: new Date(),
    referralCode: await generateUniqueReferralCode(),
  }).returning({ id: users.id });

  console.log(`Created ${role}  ${email}`);
  return created.id;
}

async function main() {
  const adminId = await upsertUser(ADMIN_EMAIL, "admin");
  const userId = await upsertUser(USER_EMAIL, "student");

  // "premium-pro" is the lifetime, grantsAllCourses:true plan seeded by
  // seed-demo.ts — granting it gives blanket course access without looping
  // over every course individually.
  const [plan] = await db.select({ id: plans.id }).from(plans)
    .where(eq(plans.slug, "premium-pro")).limit(1);

  if (!plan) {
    console.error(
      'Plan "premium-pro" not found — run `pnpm seed:demo` first to seed plans, then re-run this script.',
    );
    process.exit(1);
  }

  const result = await grantPlan({ userId, planId: plan.id, grantedById: adminId });
  if ("error" in result) {
    console.error(`Failed to grant plan: ${result.error}`);
    process.exit(1);
  }
  console.log(`Granted all-course access (premium-pro) to ${USER_EMAIL}`);

  console.log("\nDone.");
  console.log(`Admin: ${ADMIN_EMAIL} / ${PASSWORD}`);
  console.log(`User:  ${USER_EMAIL} / ${PASSWORD}`);
  process.exit(0);
}

main().catch((e) => { console.error(e); process.exit(1); });
