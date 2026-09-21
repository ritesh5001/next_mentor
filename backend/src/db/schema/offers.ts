import { boolean, index, integer, jsonb, pgTable, text, timestamp } from "drizzle-orm/pg-core";

import { users } from "./auth";

/**
 * Incentive offers: "refer 10 people this month and win X".
 *
 * The point of the table is the criteria, not the prize. A member cannot chase
 * a target they have to work out by hand, so each offer states its targets as
 * data and the dashboard shows live progress against them. The owner releases
 * and withdraws offers from the admin panel without a deploy.
 */

/** What an offer can measure. Everything here is already in the ledger. */
export type OfferMetric = "referrals" | "sales" | "earnings";

/**
 * One target. `target` is a count for referrals and sales, and paise for
 * earnings — the same unit the rest of the system stores money in.
 */
export type OfferCriterion = {
  metric: OfferMetric;
  target: number;
  /** Overrides the default wording, e.g. "Premium Pro sales". */
  label?: string;
};

export const offers = pgTable(
  "offers",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),

    title: text("title").notNull(),
    description: text("description"),
    /** What they win, in the owner's own words. */
    reward: text("reward").notNull(),
    imageUrl: text("image_url"),

    /**
     * Only activity inside the window counts. Without a start date an offer
     * announced today would be won instantly by whoever already had the
     * numbers, which is not a promotion.
     */
    startsAt: timestamp("starts_at", { withTimezone: true }).notNull().defaultNow(),
    endsAt: timestamp("ends_at", { withTimezone: true }),

    criteria: jsonb("criteria").$type<OfferCriterion[]>().notNull().default([]),

    /** Draft until released, so an offer can be prepared in advance. */
    isPublished: boolean("is_published").notNull().default(false),
    position: integer("position").notNull().default(0),

    createdById: text("created_by_id").references(() => users.id, { onDelete: "set null" }),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [index("offers_live_idx").on(t.isPublished, t.startsAt)],
);
