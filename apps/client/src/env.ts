import { z } from "zod";
import { FRONTEND_PORT, NODE_ENV } from "@internal/env";

export const env = z
  .object({
    NODE_ENV,
    FRONTEND_PORT,
  })
  .parse(process.env);
