import express from "express";
import { fileURLToPath } from "node:url";
import path, { dirname } from "node:path";
import { env } from "./env.js";

/**
 * FOR PRODUCTION
 *
 * This is a super simple express server meant to be accessed via a reverse proxy like Caddy or Nginx.
 * In development, just use the Vite development server and ignore this file.
 */

export const server = express();

const __dirname = dirname(fileURLToPath(import.meta.url));

server.use(express.static(path.join("dist")));

server.get("/*", (_, res) => {
  res.sendFile(path.join(__dirname, "..", "dist", "index.html"));
});

server.listen(env.FRONTEND_PORT, () => {
  console.info("SPA server online on port:", env.FRONTEND_PORT);
});
