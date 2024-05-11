import { z } from "zod";
import { BACKEND_PORT, CORS_ORIGIN, NODE_ENV } from "@internal/env";

export const env = z
  .object({
    NODE_ENV,
    BACKEND_PORT,
    CORS_ORIGIN,
  })
  .parse(process.env);
