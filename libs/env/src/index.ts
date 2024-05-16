import { z } from "zod";

export const NODE_ENV = z.enum(["production", "development"]);
export const UNSAFE_BACKEND_PORT = z.number({ coerce: true }).min(1).max(65535);
export const FRONTEND_PORT = UNSAFE_BACKEND_PORT; // 🤷‍♂️ they're the same
export const CORS_ORIGIN = z.string().url();
