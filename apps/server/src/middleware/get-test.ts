import { expressServer } from "@/server.js";

expressServer.get("/test", (_, res) => {
  res.send({
    message: "Hi from the backend!",
  });
});
