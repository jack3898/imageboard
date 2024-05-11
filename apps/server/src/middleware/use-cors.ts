import { env } from "@/env.js";
import { server } from "@/express-server.js";
import cors from "cors";

server.use(
  cors({
    origin: env.CORS_ORIGIN,
    credentials: true,
  }),
);
