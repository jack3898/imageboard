import { apolloServer } from "@/server.js";
import { type GqlContext } from "@/types/graphql-context.js";
import { expressMiddleware } from "@apollo/server/express4";
import { type Router } from "express";

export default (router: Router): void => {
  router.use(
    expressMiddleware(apolloServer, {
      context: async ({ req, res }): Promise<GqlContext> => ({ req, res })
    })
  );
};
