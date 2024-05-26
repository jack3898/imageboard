import express, { type Router } from "express";
import registerFileRoute from "./get-file.js";
import registerTestRoute from "./get-test.js";
import registerLoginRoute from "./post-login.js";
import registerLogoutRoute from "./post-logout.js";
import registerUploadRoute from "./post-upload.js";

export default (parentRouter: Router): void => {
  const router = express.Router();

  parentRouter.use("/api", router);

  registerTestRoute(router);
  registerFileRoute(router);
  registerLoginRoute(router);
  registerLogoutRoute(router);
  registerUploadRoute(router);
};
