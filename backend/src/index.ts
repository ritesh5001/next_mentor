import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { secureHeaders } from "hono/secure-headers";

import { allowedOrigins } from "@/lib/env";
import { authRoutes } from "@/routes/auth";
import { catalogRoutes } from "@/routes/catalog";
import { commerceRoutes } from "@/routes/commerce";
import { learnRoutes } from "@/routes/learn";
import { affiliateRoutes } from "@/routes/affiliate";
import { engagementRoutes } from "@/routes/engagement";
import { certificateRoutes } from "@/routes/certificates";
import { adminRoutes } from "@/routes/admin";
import { webhookRoutes } from "@/routes/webhooks";
import { cronRoutes } from "@/routes/cron";

/**
 * NextMentor API — deploys to Render as a long-lived Node service.
 *
 * Owns the database. The Vercel frontend holds no database credentials and
 * reaches everything here over HTTP with a Bearer token.
 */
const app = new Hono();

app.use("*", logger());
app.use("*", secureHeaders());

/**
 * CORS.
 *
 * Origins come from an env var rather than a wildcard: this API accepts a
 * Bearer token, and `*` would let any site on the internet script a logged-in
 * user's browser against it.
 */
app.use(
  "/api/*",
  cors({
    origin: (origin) => (allowedOrigins().includes(origin) ? origin : null),
    allowMethods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization"],
    maxAge: 86400,
  }),
);

/** Render pings this to decide whether the instance is live. */
app.get("/health", (c) =>
  c.json({ ok: true, service: "nextmentor-api", ts: new Date().toISOString() }),
);

app.route("/api/auth", authRoutes);
app.route("/api", catalogRoutes);
app.route("/api", commerceRoutes);
app.route("/api", learnRoutes);
app.route("/api", affiliateRoutes);
app.route("/api", engagementRoutes);
app.route("/api/certificates", certificateRoutes);
app.route("/api/admin", adminRoutes);

// Webhooks are authenticated by signature, so they sit outside /api and outside
// CORS — they are called server-to-server, never from a browser.
app.route("/webhooks", webhookRoutes);
app.route("/cron", cronRoutes);

app.notFound((c) => c.json({ ok: false, error: "Not found", code: "not_found" }, 404));

app.onError((err, c) => {
  // Log the detail, return a generic message: a stack trace in a browser is a
  // free map of the server for anyone probing it.
  console.error("[api] Unhandled error", err);
  return c.json({ ok: false, error: "Something went wrong.", code: "server_error" }, 500);
});

const port = Number(process.env.PORT ?? 4000);

serve({ fetch: app.fetch, port }, (info) => {
  console.info(`[api] listening on :${info.port}`);
  console.info(`[api] CORS origins: ${allowedOrigins().join(", ")}`);
});

export type AppType = typeof app;
export { app };
