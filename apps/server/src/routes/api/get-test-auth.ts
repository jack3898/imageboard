import { userJwt } from "@/utils/user.jwt.js";
import { type Router } from "express";

export default (router: Router): void => {
  router.get("/test-auth", async (req, res, next) => {
    try {
      const signedCookies = req.signedCookies;
      const verifiedJwt = await userJwt.verify(signedCookies.session).catch(() => null);

      if (verifiedJwt) {
        return res.status(200).send(verifiedJwt);
      } else {
        res.sendStatus(401);
      }
    } catch (error) {
      next(error);
    }
  });
};
