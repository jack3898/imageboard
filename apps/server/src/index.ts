import { initTestUser } from "@/utils/init-test-user.js";
import { env } from "./env.js";
import { expressServer, httpServer } from "./server.js";
import registerAppRoutes from "@/routes/router.js";

const port = env.UNSAFE_BACKEND_URL.port;

await new Promise<void>((resolve) => httpServer.listen({ port }, resolve));

await initTestUser();
registerAppRoutes(expressServer);

console.info(`✅  API server online ➜  http://localhost:${port}/`);
console.info(`✅  GraphQL ➜  http://localhost:${port}/graphql/`);
