import { type ImageFile } from "@/types/generated-graphql-types.js";
import { type z } from "zod";

export async function getImageFiles(): Promise<ImageFile[]> {
  throw Error("Not yet converted to Drizzle");

  const files = await filesModel.find().limit(100);

  return files.map((file) => file.toObject({ getters: true }));
}

export async function getFile(id: string): Promise<ImageFile | null> {
  throw Error("Not yet converted to Drizzle");

  const file = await filesModel.findById(id);

  if (!file) {
    return null;
  }

  return file.toObject({ getters: true });
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function resolveFileType(kind: string) {
  switch (kind as FileKind) {
    case "image":
      return "ImageFile";
    case "unknown":
    default:
      return "AbstractFile";
  }
}
