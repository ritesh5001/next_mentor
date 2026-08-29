import { relations } from "drizzle-orm";
import {
  boolean,
  index,
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core";

import { users } from "./auth";

/**
 * Discount codes — the "Exclusive Coupons" panel in the reference dashboard.
 *
 * Everything needed to decide whether a code is valid lives in this row, so
 * validation is one indexed lookup inside the order-creation transaction
 * rather than a scatter of business rules across the app.
 */

export const discountTypeEnum = pgEnum("discount_type", ["percent", "flat"]);
export const couponScopeEnum = pgEnum("coupon_scope", ["all", "course", "plan"]);

export const coupons = pgTable(
  "coupons",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),

    /** Always stored upper-case; lookups normalise before querying. */
    code: text("code").notNull(),
    description: text("description"),

    discountType: discountTypeEnum("discount_type").notNull(),
    /** Percent: basis points (1500 = 15%). Flat: paise. Integers either way. */
    value: integer("value").notNull(),
    /** Caps a percentage discount, e.g. "20% off, up to ₹500". */
    maxDiscountInPaise: integer("max_discount_in_paise"),
    /** Order must reach this before the code applies. */
    minOrderInPaise: integer("min_order_in_paise").notNull().default(0),

    scope: couponScopeEnum("scope").notNull().default("all"),
    /** Course id or plan id when scope is not "all". */
    targetId: text("target_id"),

    /** Null means unlimited. */
    maxRedemptions: integer("max_redemptions"),
    usedCount: integer("used_count").notNull().default(0),
    /** How many times one person may use this code. */
    perUserLimit: integer("per_user_limit").notNull().default(1),

    validFrom: timestamp("valid_from", { withTimezone: true }),
    validUntil: timestamp("valid_until", { withTimezone: true }),

    isActive: boolean("is_active").notNull().default(true),

    createdById: text("created_by_id").references(() => users.id, { onDelete: "set null" }),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [
    uniqueIndex("coupons_code_unique").on(t.code),
    index("coupons_active_idx").on(t.isActive),
    index("coupons_scope_target_idx").on(t.scope, t.targetId),
  ],
);

/**
 * One row per successful use.
 *
 * This table, not `coupons.usedCount`, is the source of truth for whether a
 * user has already redeemed a code — a counter cannot answer "who used it",
 * and a counter alone races under concurrent checkouts.
 */
export const couponRedemptions = pgTable(
  "coupon_redemptions",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    couponId: text("coupon_id")
      .notNull()
      .references(() => coupons.id, { onDelete: "cascade" }),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    /** Set when the order is created; the redemption only counts once paid. */
    orderId: text("order_id"),
    discountInPaise: integer("discount_in_paise").notNull(),
    redeemedAt: timestamp("redeemed_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [
    index("coupon_redemptions_coupon_user_idx").on(t.couponId, t.userId),
    index("coupon_redemptions_order_idx").on(t.orderId),
  ],
);

export const couponsRelations = relations(coupons, ({ many }) => ({
  redemptions: many(couponRedemptions),
}));

export const couponRedemptionsRelations = relations(couponRedemptions, ({ one }) => ({
  coupon: one(coupons, { fields: [couponRedemptions.couponId], references: [coupons.id] }),
  user: one(users, { fields: [couponRedemptions.userId], references: [users.id] }),
}));

export type Coupon = typeof coupons.$inferSelect;
export type CouponRedemption = typeof couponRedemptions.$inferSelect;
