import { z } from "zod";
import { docVersionValidationSchema, timestampValidationSchema } from "./common.js";

export const usersValidationSchema = z
  .object({
    username: z.string(),
    email: z.string(),
    password: z.string()
  })
  .extend(timestampValidationSchema)
  .extend(docVersionValidationSchema);

export type UsersValidationSchema = z.infer<typeof usersValidationSchema>;
