import { z } from "zod";
import { schemas } from "@internal/shared";

const { NODE_ENV, FRONTEND_PORT, UNSAFE_BACKEND_URL } = schemas.env;

export const env = z
  .object({
    NODE_ENV,
    FRONTEND_PORT,
    UNSAFE_BACKEND_URL
  })
  .parse(process.env);
