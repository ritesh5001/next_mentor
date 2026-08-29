import { relations } from "drizzle-orm";
import { sql } from "drizzle-orm";
import {
  check,
  index,
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { users } from "./auth";
import { courses, lessons } from "./courses";
import { plans } from "./plans";
import { coupons } from "./coupons";

/** An order buys exactly one of these. */
export const orderItemTypeEnum = pgEnum("order_item_type", ["course", "plan"]);

export const orderStatusEnum = pgEnum("order_status", [
  "created", // Razorpay order exists, payment not confirmed
  "paid", // webhook verified — this is the ONLY status that grants access
  "failed",
  "refunded",
]);

export const orders = pgTable(
  "orders",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),

    /**
     * An order buys either a course or a plan, never both.
     *
     * Both id columns are nullable and a CHECK constraint enforces that
     * exactly the matching one is set. The alternative — a second orders
     * table — would mean every revenue query, refund path and (in Phase 3)
     * commission calculation had to be written twice and kept in step.
     */
    itemType: orderItemTypeEnum("item_type").notNull().default("course"),
    courseId: text("course_id").references(() => courses.id, { onDelete: "restrict" }),
    planId: text("plan_id").references(() => plans.id, { onDelete: "restrict" }),

    // Snapshot of the price at purchase time. Reading the current price when
    // issuing a refund or computing commission would be wrong the moment an
    // admin edits it.
    listPriceInPaise: integer("list_price_in_paise").notNull(),
    discountInPaise: integer("discount_in_paise").notNull().default(0),

    /** Which code produced discountInPaise, if any. */
    couponId: text("coupon_id").references(() => coupons.id, { onDelete: "set null" }),
    // The amount actually charged. Phase 3 commission is computed on THIS,
    // never on list price or MRP.
    amountInPaise: integer("amount_in_paise").notNull(),
    currency: text("currency").notNull().default("INR"),

    razorpayOrderId: text("razorpay_order_id").notNull(),
    razorpayPaymentId: text("razorpay_payment_id"),
    status: orderStatusEnum("status").notNull().default("created"),

    paidAt: timestamp("paid_at", { withTimezone: true }),
    refundedAt: timestamp("refunded_at", { withTimezone: true }),
    failureReason: text("failure_reason"),

    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [
    uniqueIndex("orders_razorpay_order_id_unique").on(t.razorpayOrderId),
    // Razorpay retries webhooks. This constraint is what makes double-granting
    // an enrollment structurally impossible rather than merely unlikely.
    uniqueIndex("orders_razorpay_payment_id_unique").on(t.razorpayPaymentId),
    index("orders_user_status_idx").on(t.userId, t.status),
    index("orders_course_idx").on(t.courseId),
    index("orders_plan_idx").on(t.planId),
    index("orders_created_at_idx").on(t.createdAt),
    index("orders_coupon_idx").on(t.couponId),
    // Exactly one target, matching itemType. Enforced by the database so no
    // code path can create a half-formed order.
    check(
      "orders_item_target_check",
      sql`(${t.itemType} = 'course' AND ${t.courseId} IS NOT NULL AND ${t.planId} IS NULL)
       OR (${t.itemType} = 'plan'   AND ${t.planId}   IS NOT NULL AND ${t.courseId} IS NULL)`,
    ),
  ],
);

export const enrollments = pgTable(
  "enrollments",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    courseId: text("course_id")
      .notNull()
      .references(() => courses.id, { onDelete: "cascade" }),
    orderId: text("order_id").references(() => orders.id, { onDelete: "set null" }),
    enrolledAt: timestamp("enrolled_at", { withTimezone: true }).notNull().defaultNow(),
    // Null means lifetime access. Set when access comes from a timed plan.
    expiresAt: timestamp("expires_at", { withTimezone: true }),
    revokedAt: timestamp("revoked_at", { withTimezone: true }),
  },
  (t) => [
    uniqueIndex("enrollments_user_course_unique").on(t.userId, t.courseId),
    // The single hottest query in the app: "is this user enrolled?"
    index("enrollments_user_idx").on(t.userId),
    index("enrollments_course_idx").on(t.courseId),
  ],
);

export const lessonProgress = pgTable(
  "lesson_progress",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    lessonId: text("lesson_id")
      .notNull()
      .references(() => lessons.id, { onDelete: "cascade" }),
    courseId: text("course_id")
      .notNull()
      .references(() => courses.id, { onDelete: "cascade" }),

    secondsWatched: integer("seconds_watched").notNull().default(0),
    lastPositionSeconds: integer("last_position_seconds").notNull().default(0),
    completedAt: timestamp("completed_at", { withTimezone: true }),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [
    uniqueIndex("lesson_progress_user_lesson_unique").on(t.userId, t.lessonId),
    // Drives the "% complete" badge on the My Courses grid.
    index("lesson_progress_user_course_idx").on(t.userId, t.courseId),
  ],
);

export const ordersRelations = relations(orders, ({ one }) => ({
  user: one(users, { fields: [orders.userId], references: [users.id] }),
  course: one(courses, { fields: [orders.courseId], references: [courses.id] }),
  plan: one(plans, { fields: [orders.planId], references: [plans.id] }),
  coupon: one(coupons, { fields: [orders.couponId], references: [coupons.id] }),
}));

export const enrollmentsRelations = relations(enrollments, ({ one }) => ({
  user: one(users, { fields: [enrollments.userId], references: [users.id] }),
  course: one(courses, { fields: [enrollments.courseId], references: [courses.id] }),
  order: one(orders, { fields: [enrollments.orderId], references: [orders.id] }),
}));

export type Order = typeof orders.$inferSelect;
export type Enrollment = typeof enrollments.$inferSelect;
export type LessonProgress = typeof lessonProgress.$inferSelect;
