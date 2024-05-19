import { z } from "zod";

export const NODE_ENV = z.enum(["production", "development"]);

export const UNSAFE_BACKEND_URL = z
  .string()
  .url()
  .transform((v) => new URL(v));

export const FRONTEND_PORT = z.number({ coerce: true }).min(0).max(25565);

export const CORS_ORIGIN = z.string().url();

export const MONGO_URL = z.string().url();
