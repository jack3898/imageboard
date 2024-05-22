import { env } from "@/env.js";
import { expressServer } from "@/server.js";
import helmet from "helmet";

expressServer.use(
  helmet({
    crossOriginResourcePolicy: {
      policy: env.NODE_ENV === "development" ? "cross-origin" : "same-origin"
    }
  })
);
