import { db } from "@/db.js";
import { type Post } from "@/types/generated-graphql-types.js";
import { PostsTable } from "@internal/database";
import { eq, like, or } from "drizzle-orm";

export async function getPosts(filter?: string): Promise<Post[]> {
  return db
    .select()
    .from(PostsTable)
    .where(
      filter
        ? or(like(PostsTable.title, `%${filter}%`), like(PostsTable.description, `%${filter}%`))
        : undefined
    )
    .limit(50);
}

export async function getPost(id: string): Promise<Post | null> {
  return db.query.PostsTable.findFirst({ where: eq(PostsTable.id, id) }).then((res) => res ?? null);
}
