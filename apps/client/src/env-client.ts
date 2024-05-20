import { object } from "zod"; // Not 'z' import, helps with tree-shaking
import { UNSAFE_BACKEND_URL } from "@internal/env";

export const envClient = object({
  UNSAFE_BACKEND_URL
}).parse({
  // You need to include the whole `import.meta.env["NAME"]` for Vite to pick it up and replace it at comp time.
  UNSAFE_BACKEND_URL: import.meta.env["UNSAFE_BACKEND_URL"]
});
