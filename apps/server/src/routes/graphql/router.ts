import express, { type Router } from "express";
import useApolloServer from "@/middleware/use-apollo-server.js";
import { auth } from "@/middleware/use-auth.js";

export default (parentRouter: Router): void => {
  const router = express.Router();

  parentRouter.use("/graphql", router);

  router.use(auth({ enforce: false }));

  useApolloServer(router);
};
