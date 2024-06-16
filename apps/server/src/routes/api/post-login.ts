import { db } from "@/db.js";
import { verifyHash } from "@/utils/pw-hash.js";
import { userJwt } from "@/utils/user.jwt.js";
import { schemas } from "@internal/shared";
import { type Router } from "express";
import { UsersTable } from "@internal/database";
import { eq } from "drizzle-orm";

export default (router: Router): void => {
  router.post("/login", async (req, res, next) => {
    try {
      const { email, password: passwordInput } = schemas.account.loginForm.parse(req.body);

      const [dbUser] = await db
        .select({
          id: UsersTable.id,
          password: UsersTable.password
        })
        .from(UsersTable)
        .where(eq(UsersTable.email, email))
        .limit(1);

      if (!dbUser) {
        return res.status(401).send("Invalid login");
      }

      const validPassword = await verifyHash(passwordInput, dbUser.password);

      if (!validPassword) {
        return res.status(401).send("Invalid login");
      }

      const jwt = await userJwt.sign({ userId: dbUser.id });

      const oneDay = 24 * 60 * 60 * 1000;
      const tomorrow = new Date(Date.now() + oneDay);

      res.cookie("session", jwt, {
        signed: true,
        expires: tomorrow,
        secure: true,
        httpOnly: true,
        sameSite: "strict"
      });

      res.sendStatus(200);
    } catch (error) {
      res.sendStatus(400);

      next(error);
    }
  });
};
