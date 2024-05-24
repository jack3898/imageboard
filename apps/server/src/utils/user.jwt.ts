import { schemas } from "@internal/shared";
import { z } from "zod";
import { JWT } from "./jwt.js";

const jwtSecret = z.object({ JWT_SECRET: schemas.env.JWT_SECRET }).parse(process.env).JWT_SECRET;

export const userJwt = new JWT(
  jwtSecret,
  z.object({
    username: z.string()
  })
);
