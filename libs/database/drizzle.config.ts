import { defineConfig } from "drizzle-kit";
import { schemas } from "@internal/shared";
import { z } from "zod";

const { POSTGRES_URL } = schemas.env;

const postgresUrl = z.object({ POSTGRES_URL }).parse(process.env).POSTGRES_URL;

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/schema.ts",
  out: "./migrations",
  dbCredentials: { url: postgresUrl },
  verbose: true,
  strict: true
});
