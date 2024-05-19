import { apiRouter, expressServer } from "@/server.js";

expressServer.use("/api", apiRouter);
