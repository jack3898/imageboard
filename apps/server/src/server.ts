import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import express from "express";
import { readFile } from "node:fs/promises";
import http from "node:http";
import { resolvers } from "./resolvers.js";
import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginLandingPageLocalDefault } from "@apollo/server/plugin/landingPage/default";
import { env } from "./env.js";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { upperDirectiveTransformer } from "./directives/upper.js";
import { type GraphQLSchema } from "graphql";
import { authDirectiveTransformer } from "./directives/auth.js";

const expressServer = express();
const httpServer = http.createServer(expressServer);
const typeDefs = await readFile("src/typedefs.graphql").then((buf) => buf.toString("utf-8"));
const schema = makeExecutableSchema({ typeDefs, resolvers });

const transformedSchema = [
  (schema: GraphQLSchema): GraphQLSchema => upperDirectiveTransformer(schema, "upper"),
  (schema: GraphQLSchema): GraphQLSchema => authDirectiveTransformer(schema, "authenticated")
].reduce((schema, next) => next(schema), schema);

const apolloServer = new ApolloServer({
  schema: transformedSchema,
  introspection: env.NODE_ENV === "development",
  plugins: [
    ApolloServerPluginDrainHttpServer({ httpServer }),
    ApolloServerPluginLandingPageLocalDefault({ includeCookies: true })
  ]
});

await apolloServer.start();

export { expressServer, apolloServer, httpServer };
