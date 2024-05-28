import { type ImageFile } from "@/types/generated-graphql-types.js";
import { filesModel } from "@internal/database";

export async function getImageFiles(): Promise<ImageFile[]> {
  const files = await filesModel.find({ kind: "image" }).limit(100);

  return files.map((file) => ({
    ...file.toObject({ getters: true }),
    __typename: "ImageFile"
  }));
}

export async function getImageFile(id: string): Promise<ImageFile | null> {
  const file = await filesModel.findOne({ _id: id, kind: "image" });

  if (!file) {
    return null;
  }

  return {
    ...file.toObject({ getters: true }),
    __typename: "ImageFile"
  };
}
