import { db } from "@/db.js";
import { type Post } from "@/types/generated-graphql-types.js";
import { PostsTable } from "@internal/database";
import { eq, like, or } from "drizzle-orm";

export async function getPosts(loggedInUserId: string, filter?: string): Promise<Post[]> {
  const posts = await db
    .select()
    .from(PostsTable)
    .where(
      filter
        ? or(like(PostsTable.title, `%${filter}%`), like(PostsTable.description, `%${filter}%`))
        : undefined
    )
    .limit(50);

  return posts.map((post) => ({
    ...post,
    isOwner: post.authorId === loggedInUserId
  }));
}

export async function getPost(loggedInUserId: string, id: string): Promise<Post | null> {
  const post = await db.query.PostsTable.findFirst({ where: eq(PostsTable.id, id) });

  if (!post) {
    return null;
  }

  return {
    ...post,
    isOwner: loggedInUserId === post.authorId
  };
}
