import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set. Copy .env.example to .env.local and fill it in.");
}

// The HTTP driver (not the WebSocket pool) is the right choice on Vercel:
// each serverless invocation makes a stateless request, so there is no
// connection pool to exhaust under burst traffic.
const sql = neon(process.env.DATABASE_URL);

export const db = drizzle(sql, { schema });
export { schema };
