import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import { dirname, resolve } from "path";
import postgres from "postgres";
import { fileURLToPath } from "url";
import { z } from "zod";
import { schemas } from "@internal/shared";

const { POSTGRES_URL } = schemas.env;

const self = dirname(fileURLToPath(import.meta.url));
const postgresUrl = z.object({ POSTGRES_URL }).parse(process.env).POSTGRES_URL;
const migrationsFolder = resolve(self, "..", "migrations");

export async function runMigration(): Promise<void> {
  const migrationClient = postgres(postgresUrl, { max: 1 });

  await migrate(drizzle(migrationClient), { migrationsFolder });
  await migrationClient.end();
}
