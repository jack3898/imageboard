import { env } from "@/env.js";
import { type Router } from "express";
import helmet from "helmet";

export default (router: Router): void => {
  router.use(
    helmet({
      crossOriginResourcePolicy: {
        policy: env.NODE_ENV === "development" ? "cross-origin" : "same-origin"
      },
      // If true in development, Apollo Studio does not load and maybe other third-party dev tooling in the future
      contentSecurityPolicy: env.NODE_ENV !== "development"
    })
  );
};
