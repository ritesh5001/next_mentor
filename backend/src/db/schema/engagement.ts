import { relations } from "drizzle-orm";
import {
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
import { courses } from "./courses";
import { plans } from "./plans";

/**
 * Phase 4 — the things that keep people coming back: proof of completion,
 * progress badges, a place to talk, a pipeline for affiliates, and mentorship.
 */

export const leadStatusEnum = pgEnum("lead_status", [
  "new",
  "contacted",
  "qualified",
  "converted",
  "lost",
]);

export const bookingStatusEnum = pgEnum("booking_status", [
  "booked",
  "attended",
  "cancelled",
  "no_show",
]);

export const assetTypeEnum = pgEnum("asset_type", ["banner", "video", "script", "pdf"]);

/**
 * Certificates.
 *
 * The serial is the public identifier — printed on the PDF and resolvable at
 * /verify/<serial> — so it must be unguessable. Someone who can enumerate
 * serials can mint plausible-looking fake credentials by screenshotting the
 * verify page of a real one.
 */
export const certificates = pgTable(
  "certificates",
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

    serial: text("serial").notNull(),
    /** Snapshot of the holder's and course's names at issue time. */
    recipientName: text("recipient_name").notNull(),
    courseTitle: text("course_title").notNull(),

    /** R2 key for the rendered PDF. Null until generation succeeds. */
    r2Key: text("r2_key"),

    issuedAt: timestamp("issued_at", { withTimezone: true }).notNull().defaultNow(),
    revokedAt: timestamp("revoked_at", { withTimezone: true }),
  },
  (t) => [
    uniqueIndex("certificates_serial_unique").on(t.serial),
    // One certificate per person per course.
    uniqueIndex("certificates_user_course_unique").on(t.userId, t.courseId),
    index("certificates_user_idx").on(t.userId),
  ],
);

/**
 * Achievement definitions.
 *
 * `criteria` is JSON so new badges are data, not a deploy. The evaluator in
 * services/achievements.ts understands a small fixed set of metrics.
 */
export const achievements = pgTable(
  "achievements",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    code: text("code").notNull(),
    title: text("title").notNull(),
    description: text("description").notNull(),
    /** Lucide icon name, resolved on the client. */
    icon: text("icon").notNull().default("Award"),
    tier: text("tier").notNull().default("bronze"),

    criteria: jsonb("criteria")
      .$type<{ metric: string; threshold: number }>()
      .notNull(),

    position: integer("position").notNull().default(0),
    isActive: boolean("is_active").notNull().default(true),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [
    uniqueIndex("achievements_code_unique").on(t.code),
    index("achievements_active_position_idx").on(t.isActive, t.position),
  ],
);

export const userAchievements = pgTable(
  "user_achievements",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    achievementId: text("achievement_id")
      .notNull()
      .references(() => achievements.id, { onDelete: "cascade" }),
    unlockedAt: timestamp("unlocked_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [
    // Makes the evaluator safe to re-run: a repeat insert is a no-op.
    uniqueIndex("user_achievements_unique").on(t.userId, t.achievementId),
    index("user_achievements_user_idx").on(t.userId),
  ],
);

/**
 * Affiliate lead pipeline.
 *
 * Owned by the affiliate who entered it — people they are working on but who
 * have not signed up yet, so there is no user row to hang this off.
 */
export const leads = pgTable(
  "leads",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    ownerId: text("owner_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),

    name: text("name").notNull(),
    email: text("email"),
    phone: text("phone"),
    source: text("source"),
    status: leadStatusEnum("status").notNull().default("new"),
    notes: text("notes"),

    /** Set when this lead becomes a registered user. */
    convertedUserId: text("converted_user_id").references(() => users.id, {
      onDelete: "set null",
    }),

    lastContactedAt: timestamp("last_contacted_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [
    index("leads_owner_status_idx").on(t.ownerId, t.status),
    index("leads_owner_created_idx").on(t.ownerId, t.createdAt),
  ],
);

/* --------------------------------------------------------------- community */

export const communityPosts = pgTable(
  "community_posts",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    authorId: text("author_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),

    title: text("title").notNull(),
    body: text("body").notNull(),
    category: text("category").notNull().default("general"),

    isPinned: boolean("is_pinned").notNull().default(false),
    isLocked: boolean("is_locked").notNull().default(false),
    /** Soft-delete: moderation hides a post without destroying the thread. */
    hiddenAt: timestamp("hidden_at", { withTimezone: true }),
    hiddenReason: text("hidden_reason"),

    commentCount: integer("comment_count").notNull().default(0),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [
    // The feed query: visible posts, pinned first, newest next.
    index("community_posts_feed_idx").on(t.hiddenAt, t.isPinned, t.createdAt),
    index("community_posts_category_idx").on(t.category, t.createdAt),
    index("community_posts_author_idx").on(t.authorId),
  ],
);

export const communityComments = pgTable(
  "community_comments",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    postId: text("post_id")
      .notNull()
      .references(() => communityPosts.id, { onDelete: "cascade" }),
    authorId: text("author_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),

    body: text("body").notNull(),
    /** One level of threading only — deeper nesting is unreadable on mobile. */
    parentId: text("parent_id"),

    hiddenAt: timestamp("hidden_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [
    index("community_comments_post_idx").on(t.postId, t.createdAt),
    index("community_comments_author_idx").on(t.authorId),
  ],
);

/* -------------------------------------------------------------- mentorship */

export const mentorshipSlots = pgTable(
  "mentorship_slots",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    mentorId: text("mentor_id").references(() => users.id, { onDelete: "set null" }),
    mentorName: text("mentor_name").notNull(),

    title: text("title").notNull(),
    description: text("description"),

    startsAt: timestamp("starts_at", { withTimezone: true }).notNull(),
    endsAt: timestamp("ends_at", { withTimezone: true }).notNull(),

    capacity: integer("capacity").notNull().default(1),
    bookedCount: integer("booked_count").notNull().default(0),

    /** Only revealed to someone with a confirmed booking. */
    meetingUrl: text("meeting_url"),
    /** Null means any signed-in user may book. */
    planRequiredId: text("plan_required_id").references(() => plans.id, {
      onDelete: "set null",
    }),

    isCancelled: boolean("is_cancelled").notNull().default(false),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [
    index("mentorship_slots_starts_idx").on(t.startsAt),
    index("mentorship_slots_mentor_idx").on(t.mentorId),
  ],
);

export const mentorshipBookings = pgTable(
  "mentorship_bookings",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    slotId: text("slot_id")
      .notNull()
      .references(() => mentorshipSlots.id, { onDelete: "cascade" }),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),

    status: bookingStatusEnum("status").notNull().default("booked"),
    note: text("note"),

    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    cancelledAt: timestamp("cancelled_at", { withTimezone: true }),
  },
  (t) => [
    // Nobody books the same slot twice — this is what keeps bookedCount honest.
    uniqueIndex("mentorship_bookings_slot_user_unique").on(t.slotId, t.userId),
    index("mentorship_bookings_user_idx").on(t.userId),
  ],
);

/* ------------------------------------------------- promo + training assets */

export const promoAssets = pgTable(
  "promo_assets",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    title: text("title").notNull(),
    description: text("description"),
    type: assetTypeEnum("type").notNull(),

    /** R2 key for downloadable files. */
    r2Key: text("r2_key"),
    /** Inline copy for "script" assets, which have nothing to download. */
    bodyText: text("body_text"),
    dimensions: text("dimensions"),

    planRequiredId: text("plan_required_id").references(() => plans.id, {
      onDelete: "set null",
    }),
    position: integer("position").notNull().default(0),
    isActive: boolean("is_active").notNull().default(true),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [index("promo_assets_active_position_idx").on(t.isActive, t.position)],
);

export const trainingModules = pgTable(
  "training_modules",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    title: text("title").notNull(),
    description: text("description"),

    /** Cloudflare Stream UID — same pipeline as course lessons. */
    streamVideoId: text("stream_video_id"),
    durationSeconds: integer("duration_seconds").notNull().default(0),

    planRequiredId: text("plan_required_id").references(() => plans.id, {
      onDelete: "set null",
    }),
    position: integer("position").notNull().default(0),
    isActive: boolean("is_active").notNull().default(true),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [index("training_modules_active_position_idx").on(t.isActive, t.position)],
);

/* ------------------------------------------------------------------ relations */

export const certificatesRelations = relations(certificates, ({ one }) => ({
  user: one(users, { fields: [certificates.userId], references: [users.id] }),
  course: one(courses, { fields: [certificates.courseId], references: [courses.id] }),
}));

export const userAchievementsRelations = relations(userAchievements, ({ one }) => ({
  user: one(users, { fields: [userAchievements.userId], references: [users.id] }),
  achievement: one(achievements, {
    fields: [userAchievements.achievementId],
    references: [achievements.id],
  }),
}));

export const communityPostsRelations = relations(communityPosts, ({ one, many }) => ({
  author: one(users, { fields: [communityPosts.authorId], references: [users.id] }),
  comments: many(communityComments),
}));

export const communityCommentsRelations = relations(communityComments, ({ one }) => ({
  post: one(communityPosts, {
    fields: [communityComments.postId],
    references: [communityPosts.id],
  }),
  author: one(users, { fields: [communityComments.authorId], references: [users.id] }),
}));

export const mentorshipSlotsRelations = relations(mentorshipSlots, ({ many }) => ({
  bookings: many(mentorshipBookings),
}));

export const mentorshipBookingsRelations = relations(mentorshipBookings, ({ one }) => ({
  slot: one(mentorshipSlots, {
    fields: [mentorshipBookings.slotId],
    references: [mentorshipSlots.id],
  }),
  user: one(users, { fields: [mentorshipBookings.userId], references: [users.id] }),
}));

export type Certificate = typeof certificates.$inferSelect;
export type Achievement = typeof achievements.$inferSelect;
export type Lead = typeof leads.$inferSelect;
export type CommunityPost = typeof communityPosts.$inferSelect;
export type MentorshipSlot = typeof mentorshipSlots.$inferSelect;
export type PromoAsset = typeof promoAssets.$inferSelect;
export type TrainingModule = typeof trainingModules.$inferSelect;
