import { uuid, pgTable, varchar } from "drizzle-orm/pg-core";

export const userSchema = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  username: varchar("username")
});
