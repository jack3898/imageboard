import { db } from "@/db.js";
import { FileVariantsTable, FilesTable } from "@internal/database";
import { eq } from "drizzle-orm";
import { type FileVariant, type File } from "@/types/generated-graphql-types.js";

export async function getFileByPostId(postId?: string): Promise<File | null> {
  if (!postId) {
    return null;
  }

  const file = await db.query.FilesTable.findFirst({ where: eq(FilesTable.postId, postId) });

  // Will remove later
  // @ts-expect-error Quality enum is not assignable to the string union, but they're the same
  return file ?? null;
}

export async function getFileVariants(id: string): Promise<FileVariant[]> {
  // Will remove later
  // @ts-expect-error Quality enum is not assignable to the string union, but they're the same
  return db.select().from(FileVariantsTable).where(eq(FileVariantsTable.fileId, id));
}
