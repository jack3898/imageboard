import { db } from "@/db.js";
import { type Post } from "@/types/generated-graphql-types.js";
import { PostsTable } from "@internal/database";
import { eq } from "drizzle-orm";

export async function getPosts(): Promise<Post[]> {
  return db.query.PostsTable.findMany({ limit: 100 });
}

export async function getPost(id: string): Promise<Post | null> {
  const [post] = await db.select().from(PostsTable).where(eq(PostsTable.id, id)).limit(1);

  return post ?? null;
}
