import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

import * as schema from "./schema";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL!,
});

declare global {
  var __db__: ReturnType<typeof drizzle> | undefined;
}

export const db =
  global.__db__ ??
  drizzle(pool, {
    schema,
  });

if (process.env.NODE_ENV !== "production") {
  global.__db__ = db;
}
