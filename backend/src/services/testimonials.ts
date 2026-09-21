import { asc, desc, eq } from "drizzle-orm";

import { db } from "@/db";
import { testimonials } from "@/db/schema";
import { cached, invalidateTag } from "@/lib/cache";

export const TESTIMONIALS_TAG = "testimonials";

export type TestimonialInput = {
  name: string;
  who?: string;
  course?: string;
  body: string;
  position?: number;
};

async function queryPublished() {
  return db
    .select({
      id: testimonials.id,
      name: testimonials.name,
      who: testimonials.who,
      course: testimonials.course,
      body: testimonials.body,
    })
    .from(testimonials)
    .where(eq(testimonials.isPublished, true))
    .orderBy(asc(testimonials.position), desc(testimonials.createdAt));
}

/** Public, identical for everyone, so cached until an admin edits one. */
export const getPublishedTestimonials = cached(queryPublished, "testimonials", {
  tags: [TESTIMONIALS_TAG],
  ttlSeconds: 3600,
});

export function listTestimonialsForAdmin() {
  return db
    .select()
    .from(testimonials)
    .orderBy(asc(testimonials.position), desc(testimonials.createdAt));
}

export async function createTestimonial(d: TestimonialInput, adminId: string) {
  const [row] = await db
    .insert(testimonials)
    .values({
      name: d.name,
      who: d.who || null,
      course: d.course || null,
      body: d.body,
      position: d.position ?? 0,
      createdById: adminId,
    })
    .returning({ id: testimonials.id });

  invalidateTag(TESTIMONIALS_TAG);
  return { ok: true as const, id: row.id };
}

export async function updateTestimonial(id: string, d: Partial<TestimonialInput & { isPublished: boolean }>) {
  const patch: Record<string, unknown> = { updatedAt: new Date() };
  if (d.name !== undefined) patch.name = d.name;
  if (d.who !== undefined) patch.who = d.who || null;
  if (d.course !== undefined) patch.course = d.course || null;
  if (d.body !== undefined) patch.body = d.body;
  if (d.position !== undefined) patch.position = d.position;
  if (d.isPublished !== undefined) patch.isPublished = d.isPublished;

  await db.update(testimonials).set(patch).where(eq(testimonials.id, id));
  invalidateTag(TESTIMONIALS_TAG);
}

export async function deleteTestimonial(id: string) {
  await db.delete(testimonials).where(eq(testimonials.id, id));
  invalidateTag(TESTIMONIALS_TAG);
}
