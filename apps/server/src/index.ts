import { server } from "@/express-server.js";
import { env } from "./env.js";

import "@/middleware/use-cors.js";
import "@/middleware/get-test.js";
import "@/middleware/use-json.js";

server.listen(env.BACKEND_PORT, () => {
  console.info("Server online on port:", env.BACKEND_PORT);
});
