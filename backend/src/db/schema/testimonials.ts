import { boolean, index, integer, pgTable, text, timestamp } from "drizzle-orm/pg-core";

import { users } from "./auth";

/**
 * Student feedback shown on the homepage.
 *
 * Every row is something a real student actually said: each card carries a
 * verified tick, and visitors decide whether to pay on the strength of them.
 * Staff add them from the admin panel, so collecting feedback never needs a
 * developer — and `isPublished` lets one be pulled without deleting it.
 */
export const testimonials = pgTable(
  "testimonials",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),

    name: text("name").notNull(),
    /** How they describe themselves: Student, Housewife, Freelancer… */
    who: text("who"),
    /** The course or skill they are talking about. */
    course: text("course"),
    body: text("body").notNull(),

    isPublished: boolean("is_published").notNull().default(true),
    /** Lower shows first; ties fall back to newest. */
    position: integer("position").notNull().default(0),

    createdById: text("created_by_id").references(() => users.id, { onDelete: "set null" }),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [index("testimonials_published_idx").on(t.isPublished, t.position)],
);
