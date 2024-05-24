import { type Router } from "express";
import useCookieParser from "./use-cookie-parser.js";
import useCors from "./use-cors.js";
import useGraphql from "./use-graphql.js";
import useHelmet from "./use-helmet.js";
import useJson from "./use-json.js";
import useApiRoute from "./api/router.js";

export default (parentRouter: Router): void => {
  useHelmet(parentRouter);
  useCors(parentRouter);
  useCookieParser(parentRouter);
  useJson(parentRouter);
  useGraphql(parentRouter);

  useApiRoute(parentRouter);
};
