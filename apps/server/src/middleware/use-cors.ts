import { env } from "@/env.js";
import { expressServer } from "@/server.js";
import cors from "cors";

expressServer.use(
  cors({
    origin: env.CORS_ORIGIN,
    credentials: true,
  }),
);
