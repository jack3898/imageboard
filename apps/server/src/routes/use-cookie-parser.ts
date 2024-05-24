import { COOKIE_SECRET } from "@internal/shared/dist/schemas/env.js";
import cookieParser from "cookie-parser";
import { type Router } from "express";
import { z } from "zod";

const cookieSecret = z.object({ COOKIE_SECRET }).parse(process.env).COOKIE_SECRET;

export default (router: Router): void => {
  router.use(cookieParser(cookieSecret));
};
