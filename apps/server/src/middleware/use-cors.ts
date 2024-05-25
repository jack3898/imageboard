import { env } from "@/env.js";
import cors from "cors";
import { type Router } from "express";

export default (router: Router): void => {
  router.use(
    cors({
      origin: env.CORS_ORIGIN,
      credentials: true
    })
  );
};
