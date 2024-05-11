import { server } from "@/express-server.js";

server.get("/test", (_, res) => {
  res.send({
    message: "Hi from the backend!",
  });
});
