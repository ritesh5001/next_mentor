import { Pool as NeonPool, neonConfig } from "@neondatabase/serverless";
import ws from "ws";
import { drizzle as drizzleNeon, type NeonDatabase } from "drizzle-orm/neon-serverless";
import { drizzle as drizzleNode } from "drizzle-orm/node-postgres";
import { Pool as NodePool } from "pg";

import * as schema from "./schema";

const url = process.env.DATABASE_URL;
if (!url) {
  throw new Error("DATABASE_URL is not set. Copy .env.example to .env.local and fill it in.");
}

const isNeon = /\.neon\.tech|neon\.database/i.test(url);

/**
 * Two drivers, chosen by connection string — both of which support real
 * interactive transactions.
 *
 * We deliberately do NOT use `drizzle-orm/neon-http`. Its `.transaction()`
 * type-checks perfectly and then throws "No transactions support in neon-http
 * driver" at runtime. The Razorpay webhook has to write the order row and the
 * enrollment row atomically — a partial write there means a customer who paid
 * and cannot watch the course — so a driver that only fails at runtime is not
 * an option, however good the cold-start numbers look.
 *
 * `neon-serverless` speaks the Postgres protocol over a WebSocket, keeps real
 * transaction support, and still works inside a serverless function.
 * Locally we use node-postgres so `pnpm dev` needs no cloud database at all.
 */
if (isNeon && typeof globalThis.WebSocket === "undefined") {
  // Node 22+ ships a global WebSocket; older runtimes need the polyfill.
  neonConfig.webSocketConstructor = ws;
}

// Held on globalThis so Next's dev-server hot reload reuses one pool instead of
// opening a new one on every edit until max_connections is exhausted.
const globalForDb = globalThis as unknown as { __nmPool?: NeonPool | NodePool };

function createDb(): NeonDatabase<typeof schema> {
  if (isNeon) {
    const pool = (globalForDb.__nmPool ??= new NeonPool({ connectionString: url })) as NeonPool;
    return drizzleNeon(pool, { schema });
  }

  const pool = (globalForDb.__nmPool ??= new NodePool({
    connectionString: url,
    max: process.env.NODE_ENV === "production" ? 10 : 3,
  })) as NodePool;

  // node-postgres and neon-serverless expose the same Drizzle surface for
  // everything this app does (select / insert / update / delete / transaction),
  // so collapsing them to one type keeps every call site driver-agnostic.
  return drizzleNode(pool, { schema }) as unknown as NeonDatabase<typeof schema>;
}

export const db = createDb();
export { schema };
