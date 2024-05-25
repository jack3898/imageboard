import { userJwt } from "@/utils/user.jwt.js";
import { type RequestHandler } from "express";

// Augment the request object to include the user
declare module "express-serve-static-core" {
  export interface Request {
    user?: {
      userId: string;
    };
  }
}

export function auth(): RequestHandler {
  const handler: RequestHandler = async (req, res, next) => {
    try {
      const signedCookies = req.signedCookies;

      if (!signedCookies.session) {
        return res.sendStatus(403);
      }

      const user = await userJwt.verify(signedCookies.session);

      req.user = user;

      next();
    } catch (error) {
      res.sendStatus(403);

      return next(error);
    }
  };

  return handler;
}
