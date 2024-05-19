import { env } from "./env.js";

import "@/middleware/post-upload.js";
import "@/middleware/use-graphql.js";
import "@/middleware/use-cors.js";
import "@/middleware/get-test.js";
import "@/middleware/use-json.js";

console.info("Server online on port:", env.UNSAFE_BACKEND_URL.port);
