import { db } from "@/db.js";
import { type Post } from "@/types/generated-graphql-types.js";
import { PostsTable } from "@internal/database";
import { eq } from "drizzle-orm";

export async function deletePost(postId: string): Promise<Post | null> {
  const [result] = await db.delete(PostsTable).where(eq(PostsTable.id, postId)).returning();

  return result ?? null;
}
