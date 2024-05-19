import { apiRouter } from "@/server.js";

apiRouter.get("/test", async (_, res) => {
  res.sendStatus(200);
});
