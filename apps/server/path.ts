import { dirname, resolve } from "path";
import { fileURLToPath } from "url";

const self = dirname(fileURLToPath(import.meta.url));

export const BACKEND_SCHEMA_FILE = resolve(self, "src", "typedefs.graphql");
