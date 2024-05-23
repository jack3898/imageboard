import { z } from "zod";
import { schemas } from "@internal/shared";

const { NODE_ENV, UNSAFE_BACKEND_URL, CORS_ORIGIN, MONGO_URL, STORAGE_DRIVER } = schemas.env;

export const env = z
  .object({
    NODE_ENV,
    UNSAFE_BACKEND_URL,
    CORS_ORIGIN,
    MONGO_URL
  })
  .and(STORAGE_DRIVER)
  .parse(process.env);
