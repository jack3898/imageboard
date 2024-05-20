import { z } from "zod";
import {
  UNSAFE_BACKEND_URL,
  CORS_ORIGIN,
  NODE_ENV,
  MONGO_URL,
  STORAGE_DRIVER
} from "@internal/env";

export const env = z
  .object({
    NODE_ENV,
    UNSAFE_BACKEND_URL,
    CORS_ORIGIN,
    MONGO_URL
  })
  .and(STORAGE_DRIVER)
  .parse(process.env);
