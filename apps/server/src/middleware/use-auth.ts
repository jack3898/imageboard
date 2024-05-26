import { userJwt } from "@/utils/user.jwt.js";
import { type RequestHandler } from "express";

// Augment the request object to include the user
declare module "express-serve-static-core" {
  export interface Request {
    user?: { userId: string } | undefined;
  }
}

/**
 * Add user to `req` when authenticated.
 * If `enforce` is set to false, then this middleware permits unauthenticated access, but will add the user to `req` if authenticated.
 */
export function auth({ enforce = true }: { enforce?: boolean } = {}): RequestHandler {
  const handler: RequestHandler = async (req, res, next) => {
    try {
      const signedCookies = req.signedCookies;

      if (!signedCookies.session && enforce) {
        return res.sendStatus(403);
      }

      req.user = await userJwt.verify(signedCookies.session);

      next();
    } catch (error) {
      if (enforce) {
        res.sendStatus(403);

        return next(error);
      }

      return next();
    }
  };

  return handler;
}
