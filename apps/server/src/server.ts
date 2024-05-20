import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import express from "express";
import { readFile } from "node:fs/promises";
import http from "node:http";
import { resolvers } from "./resolvers.js";
import { ApolloServer } from "@apollo/server";
import { env } from "./env.js";

const expressServer = express();
const httpServer = http.createServer(expressServer);

const apolloServer = new ApolloServer({
  typeDefs: await readFile("src/typedefs.graphql").then((buf) => buf.toString("utf-8")),
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  introspection: true
});

await apolloServer.start();
await new Promise<void>((resolve) =>
  httpServer.listen({ port: env.UNSAFE_BACKEND_URL.port }, resolve)
);

const apiRouter = express.Router();

export { apiRouter, expressServer, apolloServer };
