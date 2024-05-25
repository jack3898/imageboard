import { type Router } from "express";
import useCookieParser from "../middleware/use-cookie-parser.js";
import useCors from "../middleware/use-cors.js";
import useHelmet from "../middleware/use-helmet.js";
import useJson from "../middleware/use-json.js";
import useApiRoute from "./api/router.js";
import useApolloRoute from "./graphql/router.js";
import useError from "@/middleware/use-error.js";

export default (parentRouter: Router): void => {
  useHelmet(parentRouter);
  useCors(parentRouter);
  useCookieParser(parentRouter);
  useJson(parentRouter);

  useApolloRoute(parentRouter);
  useApiRoute(parentRouter);

  useError(parentRouter);
};
