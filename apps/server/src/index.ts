import { initTestUser } from "@/utils/init-test-user.js";

import "@/middleware/use-helmet.js";
import "@/middleware/use-graphql.js";
import "@/middleware/use-cors.js";
import "@/middleware/use-api.js";
import "@/routes/api/get-test.js";
import "@/routes/api/post-upload.js";
import "@/routes/api/get-file.js";
import "@/middleware/use-json.js";

await initTestUser();
