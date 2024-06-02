import { db } from "@/db.js";
import { FileVariantsTable, FilesTable } from "@internal/database";
import { inArray } from "drizzle-orm";
import { type FileVariant, type File } from "@/types/generated-graphql-types.js";
import DataLoader from "dataloader";

const fileDataloader = new DataLoader(async (postIds: readonly string[]) => {
  const results = await db
    .select()
    .from(FilesTable)
    .where(inArray(FilesTable.postId, [...postIds]));

  return postIds.map((key) => results.find(({ postId }) => postId === key) ?? null);
});

export function getFileByPostId(postId?: string): Promise<File | null> {
  if (!postId) {
    return Promise.resolve(null);
  }

  return fileDataloader.load(postId);
}

const fileVariantsDataloader = new DataLoader(async (fileIds: readonly string[]) => {
  const results = await db
    .select()
    .from(FileVariantsTable)
    .where(inArray(FileVariantsTable.fileId, [...fileIds]));

  return fileIds.map((key) => results.filter(({ fileId }) => fileId === key));
});

export function getFileVariants(fileId: string): Promise<FileVariant[]> {
  return fileVariantsDataloader.load(fileId);
}
