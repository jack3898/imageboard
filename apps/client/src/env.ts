import { z } from "zod";
import { schemas } from "@internal/shared";

const { NODE_ENV, FRONTEND_PORT, UNSAFE_BACKEND_URL, TEST_EMAIL, TEST_PASSWORD } = schemas.env;

export const env = z
  .object({
    NODE_ENV,
    FRONTEND_PORT,
    UNSAFE_BACKEND_URL,
    TEST_EMAIL,
    TEST_PASSWORD
  })
  .parse(process.env);
