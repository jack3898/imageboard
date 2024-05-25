import express, { type Router } from "express";
import useApolloServer from "@/middleware/use-apollo-server.js";

export default (parentRouter: Router): void => {
  const router = express.Router();

  parentRouter.use("/graphql", router);

  useApolloServer(router);
};
