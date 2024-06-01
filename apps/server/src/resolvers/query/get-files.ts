import { db } from "@/db.js";
import { FileVariantsTable, FilesTable } from "@internal/database";
import { eq } from "drizzle-orm";
import { type FileVariant, type File } from "@/types/generated-graphql-types.js";

export async function getFileByPostId(postId?: string): Promise<File | null> {
  if (!postId) {
    return null;
  }

  return db.query.FilesTable.findFirst({ where: eq(FilesTable.postId, postId) }).then(
    (res) => res ?? null
  );
}

export async function getFileVariants(id: string): Promise<FileVariant[]> {
  return db.query.FileVariantsTable.findMany({ where: eq(FileVariantsTable.fileId, id) });
}
