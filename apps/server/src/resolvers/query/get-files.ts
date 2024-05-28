import { type ImageFile } from "@/types/generated-graphql-types.js";
import { filesModel, type validation } from "@internal/database";
import { type z } from "zod";

export async function getImageFiles(): Promise<ImageFile[]> {
  const files = await filesModel.find().limit(100);

  return files.map((file) => file.toObject({ getters: true }));
}

export async function getFile(id: string): Promise<ImageFile | null> {
  const file = await filesModel.findById(id);

  if (!file) {
    return null;
  }

  return file.toObject({ getters: true });
}

type FileKind = z.infer<typeof validation.filesValidationSchema.shape.kind>;

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
