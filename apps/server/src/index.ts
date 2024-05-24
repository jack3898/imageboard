import { initTestUser } from "@/utils/init-test-user.js";
import { env } from "./env.js";
import { expressServer, httpServer } from "./server.js";
import registerAppRoutes from "@/routes/router.js";

await initTestUser();

await new Promise<void>((resolve) =>
  httpServer.listen({ port: env.UNSAFE_BACKEND_URL.port }, resolve)
);

registerAppRoutes(expressServer);

console.info("Server online on port:", env.UNSAFE_BACKEND_URL.port);
