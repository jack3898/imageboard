/* eslint-disable @typescript-eslint/no-unused-vars */
import { type Response, type Router } from "express";

export default (router: Router): void => {
  router.use((err: unknown, _: unknown, res: Response, __: unknown) => {
    console.error(err);

    if (!res.headersSent) {
      res.sendStatus(500);
    }
  });
};
