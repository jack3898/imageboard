import { db } from "@/db.js";
import { type Post } from "@/types/generated-graphql-types.js";
import { PostsTable } from "@internal/database";
import { eq, and } from "drizzle-orm";

export async function deletePost(postId: string, userId: string): Promise<Post | null> {
  const [result] = await db
    .delete(PostsTable)
    .where(and(eq(PostsTable.id, postId), eq(PostsTable.authorId, userId)))
    .returning();

  return result ?? null;
}
