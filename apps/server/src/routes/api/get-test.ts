import { type Router } from "express";

export default (router: Router): void => {
  router.get("/test", async (_, res) => {
    res.sendStatus(200);
  });
};
