import { relations } from "drizzle-orm";
import { uuid, pgTable, varchar, date, pgEnum, integer } from "drizzle-orm/pg-core";

const timestamps = {
  createdAt: date("createdAt").defaultNow().notNull(),
  updatedAt: date("updatedAt").defaultNow().notNull()
};

const id = uuid("id").defaultRandom().primaryKey();

export const qualityEnum = pgEnum("quality", ["RAW", "THUMBNAIL", "OPTIMIZED"]);

export const filetypeEnum = pgEnum("type", ["png", "jpeg"]);

export const UsersTable = pgTable("users", {
  id,
  ...timestamps,
  username: varchar("username").unique().notNull(),
  email: varchar("email", { length: 255 }).unique().notNull(),
  password: varchar("password", { length: 255 }).notNull()
});

export const PostsTable = pgTable("posts", {
  id,
  ...timestamps,
  title: varchar("title", { length: 255 }).notNull(),
  description: varchar("description", { length: 5_000 }).notNull(),
  authorId: uuid("authorId")
    .references(() => UsersTable.id)
    .notNull()
});

export const FilesTable = pgTable("files", {
  id,
  ...timestamps,
  type: filetypeEnum("type").notNull(),
  alt: varchar("alt", { length: 255 }).default("").notNull(),
  postId: uuid("postId").references(() => PostsTable.id)
});

export const FileVariantsTable = pgTable("fileVariants", {
  id,
  ...timestamps,
  width: integer("width").notNull(),
  height: integer("height").notNull(),
  path: varchar("path", { length: 255 }).notNull(),
  quality: qualityEnum("quality").notNull(),
  fileId: uuid("fileId")
    .references(() => FilesTable.id)
    .notNull()
});

// RELATIONSHIPS
// Relationships are already defined above at the db level, the following is for the ORM

export const UsersTableRelationships = relations(UsersTable, ({ many }) => ({
  posts: many(PostsTable)
}));

export const PostsTableRelationships = relations(PostsTable, ({ one }) => ({
  author: one(UsersTable, {
    fields: [PostsTable.authorId],
    references: [UsersTable.id]
  })
}));

export const FilesTableRelationships = relations(FilesTable, ({ one, many }) => ({
  post: one(PostsTable, {
    fields: [FilesTable.postId],
    references: [PostsTable.id]
  }),
  variants: many(FileVariantsTable)
}));

export const FileVariantsTableRelationships = relations(FileVariantsTable, ({ one }) => ({
  file: one(FilesTable, {
    fields: [FileVariantsTable.fileId],
    references: [FilesTable.id]
  })
}));
