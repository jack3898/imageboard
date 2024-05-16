import { z } from "zod";
import { UNSAFE_BACKEND_PORT, FRONTEND_PORT, NODE_ENV } from "@internal/env";

export const env = z
  .object({
    NODE_ENV,
    FRONTEND_PORT,
    UNSAFE_BACKEND_PORT,
  })
  .parse(process.env);
