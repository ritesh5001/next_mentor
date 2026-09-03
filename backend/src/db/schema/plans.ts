import { relations } from "drizzle-orm";
import {
  type AnyPgColumn,
  boolean,
  index,
  integer,
  jsonb,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core";

import { users } from "./auth";

/**
 * Membership tiers — the "Premium Pro" badge in the reference dashboard.
 *
 * A plan does two things: it bundles access to courses, and it sets the rate
 * at which the holder earns affiliate commission. The commission rate lives
 * here rather than on the user so that changing a tier's economics is one
 * update, not a backfill across every member.
 */

export const subscriptionStatusEnum = pgEnum("subscription_status", [
  "active",
  "expired",
  "cancelled",
]);

export const plans = pgTable(
  "plans",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    slug: text("slug").notNull(),
    name: text("name").notNull(),
    tagline: text("tagline"),

    priceInPaise: integer("price_in_paise").notNull().default(0),
    mrpInPaise: integer("mrp_in_paise"),

    // Null means the plan never expires once bought.
    durationDays: integer("duration_days"),

    /**
     * Affiliate commission rate in basis points (1% = 100 bps).
     *
     * Integer bps rather than a decimal percentage so commission maths stays in
     * integers end to end: amountInPaise * rateBps / 10000 is exact, whereas
     * multiplying by 0.15 invites floating-point drift into money.
     */
    commissionRateBps: integer("commission_rate_bps").notNull().default(0),

    /** Marketing bullet points, rendered on the pricing card. */
    features: jsonb("features").$type<string[]>().notNull().default([]),

    /** Grants access to every published course while the plan is active. */
    grantsAllCourses: boolean("grants_all_courses").notNull().default(false),

    isActive: boolean("is_active").notNull().default(true),
    isFeatured: boolean("is_featured").notNull().default(false),
    position: integer("position").notNull().default(0),

    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [
    uniqueIndex("plans_slug_unique").on(t.slug),
    index("plans_active_position_idx").on(t.isActive, t.position),
  ],
);

export const subscriptions = pgTable(
  "subscriptions",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    planId: text("plan_id")
      .notNull()
      .references(() => plans.id, { onDelete: "restrict" }),

    status: subscriptionStatusEnum("status").notNull().default("active"),
    startsAt: timestamp("starts_at", { withTimezone: true }).notNull().defaultNow(),
    // Null = lifetime, mirroring plans.durationDays.
    expiresAt: timestamp("expires_at", { withTimezone: true }),
    cancelledAt: timestamp("cancelled_at", { withTimezone: true }),
    /**
     * Set when an administrator comped this rather than the member paying.
     *
     * Subscriptions carry no order reference, so without this a gifted plan
     * would be indistinguishable from a bought one.
     */
    grantedById: text("granted_by_id").references((): AnyPgColumn => users.id, {
      onDelete: "set null",
    }),

    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [
    // The hot path: "what is this user's live plan?" — read on every page that
    // shows the tier badge or computes a commission rate.
    index("subscriptions_user_status_idx").on(t.userId, t.status),
    index("subscriptions_expires_idx").on(t.expiresAt),
    index("subscriptions_plan_idx").on(t.planId),
  ],
);

export const plansRelations = relations(plans, ({ many }) => ({
  subscriptions: many(subscriptions),
}));

export const subscriptionsRelations = relations(subscriptions, ({ one }) => ({
  user: one(users, { fields: [subscriptions.userId], references: [users.id] }),
  plan: one(plans, { fields: [subscriptions.planId], references: [plans.id] }),
}));

export type Plan = typeof plans.$inferSelect;
export type Subscription = typeof subscriptions.$inferSelect;
