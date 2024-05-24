import express, { type Router } from "express";
import registerFileRoute from "./get-file.js";
import registerTestRoute from "./get-test.js";
import registerLoginRoute from "./post-login.js";
import registerUploadRoute from "./post-upload.js";
import registerTestAuthRoute from "./get-test-auth.js";

export default (parentRouter: Router): void => {
  const router = express.Router();

  parentRouter.use("/api", router);

  registerTestRoute(router);
  registerTestAuthRoute(router);
  registerFileRoute(router);
  registerLoginRoute(router);
  registerUploadRoute(router);
};
