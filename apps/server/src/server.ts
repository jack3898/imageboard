import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import express from "express";
import { readFile } from "node:fs/promises";
import http from "node:http";
import { resolvers } from "./resolvers.js";
import { ApolloServer } from "@apollo/server";

const expressServer = express();
const httpServer = http.createServer(expressServer);

const apolloServer = new ApolloServer({
  typeDefs: await readFile("src/typedefs.graphql").then((buf) => buf.toString("utf-8")),
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })]
});

await apolloServer.start();

export { expressServer, apolloServer, httpServer };
