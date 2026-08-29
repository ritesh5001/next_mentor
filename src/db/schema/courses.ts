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

export const courseStatusEnum = pgEnum("course_status", ["draft", "published", "archived"]);
export const courseLevelEnum = pgEnum("course_level", ["beginner", "intermediate", "advanced"]);
export const videoStatusEnum = pgEnum("video_status", [
  "pending", // upload URL issued, nothing received yet
  "uploading",
  "processing", // Cloudflare is transcoding
  "ready",
  "errored",
]);

export const courses = pgTable(
  "courses",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    slug: text("slug").notNull(),
    title: text("title").notNull(),
    subtitle: text("subtitle"),
    description: text("description"),

    // R2 object key, not a URL. The public URL is composed at render time so
    // the CDN domain can change without a data migration.
    thumbnailKey: text("thumbnail_key"),

    instructorId: text("instructor_id").references(() => users.id, { onDelete: "set null" }),
    instructorName: text("instructor_name"),

    // All money is integer paise. Never a float. Not once.
    priceInPaise: integer("price_in_paise").notNull().default(0),
    mrpInPaise: integer("mrp_in_paise"),

    level: courseLevelEnum("level").notNull().default("beginner"),
    language: text("language").notNull().default("en"),
    status: courseStatusEnum("status").notNull().default("draft"),

    position: integer("position").notNull().default(0),
    publishedAt: timestamp("published_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [
    uniqueIndex("courses_slug_unique").on(t.slug),
    // The catalog query: published courses ordered by recency.
    index("courses_status_published_idx").on(t.status, t.publishedAt),
    index("courses_instructor_idx").on(t.instructorId),
  ],
);

export const modules = pgTable(
  "modules",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    courseId: text("course_id")
      .notNull()
      .references(() => courses.id, { onDelete: "cascade" }),
    title: text("title").notNull(),
    position: integer("position").notNull().default(0),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [index("modules_course_position_idx").on(t.courseId, t.position)],
);

export const lessons = pgTable(
  "lessons",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    moduleId: text("module_id")
      .notNull()
      .references(() => modules.id, { onDelete: "cascade" }),
    title: text("title").notNull(),
    description: text("description"),

    // Cloudflare Stream UID. Null until the direct-creator-upload completes.
    streamVideoId: text("stream_video_id"),
    videoStatus: videoStatusEnum("video_status").notNull().default("pending"),
    durationSeconds: integer("duration_seconds").notNull().default(0),

    // A free preview lesson skips the enrollment check when minting a playback
    // token. This is the ONLY case where an unenrolled user gets a token.
    isFreePreview: boolean("is_free_preview").notNull().default(false),

    position: integer("position").notNull().default(0),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [
    index("lessons_module_position_idx").on(t.moduleId, t.position),
    index("lessons_stream_video_idx").on(t.streamVideoId),
  ],
);

export const coursesRelations = relations(courses, ({ one, many }) => ({
  instructor: one(users, { fields: [courses.instructorId], references: [users.id] }),
  modules: many(modules),
}));

export const modulesRelations = relations(modules, ({ one, many }) => ({
  course: one(courses, { fields: [modules.courseId], references: [courses.id] }),
  lessons: many(lessons),
}));

export const lessonsRelations = relations(lessons, ({ one }) => ({
  module: one(modules, { fields: [lessons.moduleId], references: [modules.id] }),
}));

export type Course = typeof courses.$inferSelect;
export type Module = typeof modules.$inferSelect;
export type Lesson = typeof lessons.$inferSelect;
