import { defineConfig } from "drizzle-kit";
import { schemas } from "@internal/shared";
import { z } from "zod";

const { POSTGRES_URL, NODE_ENV } = schemas.env;

const env = z.object({ POSTGRES_URL, NODE_ENV }).parse(process.env);

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/schema.ts",
  out: "./migrations",
  dbCredentials: { url: env.POSTGRES_URL },
  verbose: env.NODE_ENV === "development",
  strict: env.NODE_ENV === "development"
});
