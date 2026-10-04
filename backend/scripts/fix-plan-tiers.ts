/**
 * One-off: every plan was saved on pack tier 1, which blocked upgrades and the
 * "sell only what you own" rule. Puts them back on 1/2/3 by price and, through
 * updatePlan, enrols existing members in the courses their tier now covers.
 *
 *   tsx --env-file=.env scripts/fix-plan-tiers.ts          # dry run
 *   tsx --env-file=.env scripts/fix-plan-tiers.ts --apply
 */
import { asc } from "drizzle-orm";

import { db } from "@/db";
import { plans } from "@/db/schema";
import { updatePlan } from "@/services/admin-write";

const apply = process.argv.includes("--apply");
const rows = await db
  .select({ id: plans.id, name: plans.name, tier: plans.tier, isActive: plans.isActive })
  .from(plans)
  .orderBy(asc(plans.priceInPaise));

const live = rows.filter((r) => r.isActive);
// Highest first, so each tier is free by the time a plan moves onto it.
for (const [i, plan] of [...live.entries()].reverse()) {
  const tier = i + 1;
  if (plan.tier === tier) continue;
  console.log(`${plan.name}: tier ${plan.tier} -> ${tier}`);
  if (apply) {
    const result = await updatePlan(plan.id, { tier });
    if (!result.ok) throw new Error(result.error);
  }
}
console.log(apply ? "Applied." : "Dry run. Pass --apply to write.");
process.exit(0);
