import { type Router } from "express";

export default (router: Router): void => {
  router.post("/logout", async (_, res) => {
    res.clearCookie("session");

    res.sendStatus(200);
  });
};
