import { uuid, pgTable, varchar, date } from "drizzle-orm/pg-core";

export const UsersTable = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  username: varchar("username").unique().notNull(),
  email: varchar("email", { length: 255 }).unique().notNull(),
  password: varchar("password", { length: 255 }).notNull(),
  createdAt: date("createdAt").defaultNow(),
  updatedAt: date("updatedAt").defaultNow()
});
