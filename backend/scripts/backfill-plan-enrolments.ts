/**
 * Enrols every active member in the courses their pack includes.
 *
 * Plan purchases used to create a subscription without any enrolment, so
 * members who paid before cumulative packs shipped saw an empty library. Safe
 * to re-run: enrolment inserts skip rows that already exist.
 *
 * Usage: pnpm tsx --env-file=.env scripts/backfill-plan-enrolments.ts
 */
import "dotenv/config";
import { and, eq, gt, isNull, or } from "drizzle-orm";

import { db } from "@/db";
import { plans, subscriptions, users } from "@/db/schema";
import { enrolPlanCourses } from "@/services/grants";

async function main() {
  const members = await db
    .select({ userId: subscriptions.userId, email: users.email, plan: plans.name, tier: plans.tier })
    .from(subscriptions)
    .innerJoin(plans, eq(plans.id, subscriptions.planId))
    .innerJoin(users, eq(users.id, subscriptions.userId))
    .where(
      and(
        eq(subscriptions.status, "active"),
        or(isNull(subscriptions.expiresAt), gt(subscriptions.expiresAt, new Date())),
      ),
    );

  for (const m of members) {
    const count = await enrolPlanCourses(db, { userId: m.userId, tier: m.tier });
    console.log(`${m.email} — ${m.plan} (tier ${m.tier}): ${count} course(s) in pack`);
  }
  console.log(`Done: ${members.length} active member(s).`);
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
