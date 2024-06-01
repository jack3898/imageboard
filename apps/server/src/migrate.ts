import { runMigration } from "@internal/database";

await runMigration();

console.info("🚀 Migration completed successfully.");
