import { apolloServer } from "@/server.js";
import { expressMiddleware } from "@apollo/server/express4";
import { type Router } from "express";

export default (router: Router): void => {
  router.use(expressMiddleware(apolloServer));
};
