import { usersModel } from "@/mongo.js";
import { verifyHash } from "@/utils/pw-hash.js";
import { userJwt } from "@/utils/user.jwt.js";
import { schemas } from "@internal/shared";
import { type Router } from "express";

export default (router: Router): void => {
  router.post("/login", async (req, res, next) => {
    try {
      const { email, password: passwordInput } = schemas.account.accountForm.parse(req.body);
      const dbUser = await usersModel.findOne({ email });

      if (!dbUser) {
        return res.status(400).send("Invalid login");
      }

      const validPassword = verifyHash(passwordInput, dbUser.password);

      if (!validPassword) {
        return res.status(400).send("Invalid login");
      }

      const jwt = await userJwt.sign({ username: dbUser.username });

      const oneDay = 24 * 60 * 60 * 1000;
      const tomorrow = new Date(Date.now() + oneDay);

      res.cookie("session", jwt, { signed: true, expires: tomorrow });

      res.sendStatus(200);
    } catch (error) {
      next(error);
    }
  });
};
