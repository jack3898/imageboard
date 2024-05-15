import { env } from "@/env.js";
import { apolloServer, expressServer } from "@/server.js";
import { expressMiddleware } from "@apollo/server/express4";
import cors from "cors";
import express from "express";

expressServer.use(
  "/graphql",
  cors<cors.CorsRequest>({
    origin: env.CORS_ORIGIN,
    credentials: true,
  }),
  express.json(),
  expressMiddleware(apolloServer),
);
