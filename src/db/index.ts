import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

// Fallback to the user's live Neon database if Environment Variable is not set
const databaseUrl =
  process.env.DATABASE_URL ||
  "postgresql://neondb_owner:npg_eWzyx3FB7Akm@ep-lucky-sun-ao5679tu.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require";

if (!databaseUrl) {
  throw new Error("DATABASE_URL is required");
}

const globalForDb = globalThis as typeof globalThis & {
  __arenaNextJsPostgresqlPool?: Pool;
};

const isLocal = databaseUrl.includes("127.0.0.1") || databaseUrl.includes("localhost");

export const pool =
  globalForDb.__arenaNextJsPostgresqlPool ??
  new Pool({
    connectionString: databaseUrl,
    ssl: isLocal ? false : { rejectUnauthorized: false },
    max: 10,
    connectionTimeoutMillis: 10000,
  });

if (process.env.NODE_ENV !== "production") {
  globalForDb.__arenaNextJsPostgresqlPool = pool;
}

export const db = drizzle(pool);
