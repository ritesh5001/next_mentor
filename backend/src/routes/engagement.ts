import { Hono } from "hono";
import { z } from "zod";

import {
  getAchievementBoard,
  getLeads,
  getLeadStats,
  getCommunityFeed,
  getPostWithComments,
  getMentorshipSlots,
  getPromoAssets,
  getTrainingModules,
} from "@/services/engagement-index";
import {
  createLead,
  updateLeadStatus,
  deleteLead,
  createPost,
  createComment,
  hidePost,
  setPostPinned,
  setPostLocked,
  bookSlot,
  cancelBooking,
} from "@/services/engagement-write";
import { requireUser, requireAdmin, currentUser } from "@/middleware/auth";
import { ok, fail, parseBody } from "@/middleware/respond";

export const engagementRoutes = new Hono();

/* ---------------------------------------------------------------- read side */

engagementRoutes.get("/achievements", requireUser, async (c) =>
  ok(c, await getAchievementBoard(currentUser(c).id)),
);

engagementRoutes.get("/leads", requireUser, async (c) => {
  const user = currentUser(c);
  const [leads, stats] = await Promise.all([getLeads(user.id), getLeadStats(user.id)]);
  return ok(c, { leads, stats });
});

engagementRoutes.get("/community", requireUser, async (c) =>
  ok(c, await getCommunityFeed({ category: c.req.query("category") || undefined })),
);

engagementRoutes.get("/community/:postId", requireUser, async (c) => {
  const data = await getPostWithComments(c.req.param("postId"));
  if (!data) return fail(c, "That post is no longer available.", "not_found");
  return ok(c, data);
});

engagementRoutes.get("/mentorship", requireUser, async (c) =>
  ok(c, await getMentorshipSlots(currentUser(c).id)),
);

engagementRoutes.get("/promo", requireUser, async (c) =>
  ok(c, await getPromoAssets(currentUser(c).id)),
);

engagementRoutes.get("/training", requireUser, async (c) =>
  ok(c, await getTrainingModules(currentUser(c).id)),
);

/* --------------------------------------------------------------- write side */

const leadSchema = z.object({
  name: z.string().trim().min(2, "Enter a name").max(80),
  email: z.string().trim().toLowerCase().email("Enter a valid email").optional().or(z.literal("")),
  phone: z
    .string()
    .trim()
    .regex(/^(\+?91[-\s]?)?[6-9]\d{9}$/, "Enter a valid 10-digit mobile number")
    .optional()
    .or(z.literal("")),
  source: z.string().trim().max(60).optional().or(z.literal("")),
  notes: z.string().trim().max(2000).optional().or(z.literal("")),
});

engagementRoutes.post("/leads", requireUser, async (c) => {
  const body = await parseBody(c, leadSchema);
  if (!body.ok) return body.response;

  const d = body.data;
  if (!d.email && !d.phone) {
    return fail(c, "Add an email or a phone number so you can follow up.", "validation");
  }

  await createLead({ ownerId: currentUser(c).id, ...d });
  return ok(c, { created: true }, 201);
});

engagementRoutes.patch("/leads/:id", requireUser, async (c) => {
  const body = await parseBody(
    c,
    z.object({ status: z.enum(["new", "contacted", "qualified", "converted", "lost"]) }),
  );
  if (!body.ok) return body.response;

  const moved = await updateLeadStatus(c.req.param("id"), currentUser(c).id, body.data.status);
  if (!moved) return fail(c, "That lead was not found.", "not_found");
  return ok(c, { status: body.data.status });
});

engagementRoutes.delete("/leads/:id", requireUser, async (c) => {
  await deleteLead(c.req.param("id"), currentUser(c).id);
  return ok(c, { deleted: true });
});

const postSchema = z.object({
  title: z.string().trim().min(4, "Give your post a title").max(140),
  body: z.string().trim().min(10, "Say a little more").max(10_000),
  category: z.enum(["general", "wins", "questions", "resources"]),
});

engagementRoutes.post("/community", requireUser, async (c) => {
  const body = await parseBody(c, postSchema);
  if (!body.ok) return body.response;

  await createPost({ authorId: currentUser(c).id, ...body.data });
  return ok(c, { created: true }, 201);
});

engagementRoutes.post("/community/:postId/comments", requireUser, async (c) => {
  const body = await parseBody(c, z.object({ body: z.string().trim().min(2).max(5000) }));
  if (!body.ok) return body.response;

  const result = await createComment({
    postId: c.req.param("postId"),
    authorId: currentUser(c).id,
    body: body.data.body,
  });

  if (!result.ok) return fail(c, result.error, "validation");
  return ok(c, { created: true }, 201);
});

engagementRoutes.delete("/community/:postId", requireUser, async (c) => {
  const user = currentUser(c);
  const result = await hidePost(c.req.param("postId"), user.id, user.role === "admin");
  if (!result.ok) return fail(c, result.error, "forbidden");
  return ok(c, { removed: true });
});

engagementRoutes.patch("/community/:postId/moderation", requireAdmin, async (c) => {
  const body = await parseBody(
    c,
    z.object({ isPinned: z.boolean().optional(), isLocked: z.boolean().optional() }),
  );
  if (!body.ok) return body.response;

  if (body.data.isPinned !== undefined) {
    await setPostPinned(c.req.param("postId"), body.data.isPinned);
  }
  if (body.data.isLocked !== undefined) {
    await setPostLocked(c.req.param("postId"), body.data.isLocked);
  }
  return ok(c, { updated: true });
});

engagementRoutes.post("/mentorship/:slotId/book", requireUser, async (c) => {
  const result = await bookSlot(c.req.param("slotId"), currentUser(c).id);
  return result.ok ? ok(c, { booked: true }) : fail(c, result.error, "conflict");
});

engagementRoutes.delete("/mentorship/:slotId/book", requireUser, async (c) => {
  const result = await cancelBooking(c.req.param("slotId"), currentUser(c).id);
  return result.ok ? ok(c, { cancelled: true }) : fail(c, result.error, "not_found");
});
