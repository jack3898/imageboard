import { initTestUser } from "@/utils/init-test-user.js";
import { env } from "./env.js";
import { expressServer, httpServer } from "./server.js";
import registerAppRoutes from "@/routes/router.js";
import mongoose from "mongoose";

const port = env.UNSAFE_BACKEND_URL.port;

await new Promise<void>((resolve) => httpServer.listen({ port }, resolve));

await mongoose.connect(env.MONGO_URL).catch(() => {
  console.error("It seems mongo is not available at", env.MONGO_URL);
  console.error("Please check your connection!");

  process.exit(1);
});

await initTestUser();
registerAppRoutes(expressServer);

console.info(`✅  API server online ➜  http://localhost:${port}/`);
