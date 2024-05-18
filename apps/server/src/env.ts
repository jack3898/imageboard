import { z } from "zod";
import { UNSAFE_BACKEND_URL, CORS_ORIGIN, NODE_ENV } from "@internal/env";

export const env = z
  .object({
    NODE_ENV,
    UNSAFE_BACKEND_URL,
    CORS_ORIGIN,
  })
  .parse(process.env);
