import { drizzle } from "drizzle-orm/postgres-js";
import { schema } from "@internal/database";
import postgres from "postgres";
import { env } from "./env.js";

const client = postgres(env.POSTGRES_URL, { max: 1 });

export const db = drizzle(client, { schema, logger: true });
