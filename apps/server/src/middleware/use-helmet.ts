import { env } from "@/env.js";
import { expressServer } from "@/server.js";
import helmet from "helmet";

expressServer.use(
  helmet({
    crossOriginResourcePolicy: {
      policy: env.NODE_ENV === "development" ? "cross-origin" : "same-origin"
    },
    // If true in development, Apollo Studio does not load and maybe other third-party dev tooling in the future
    contentSecurityPolicy: env.NODE_ENV !== "development"
  })
);
