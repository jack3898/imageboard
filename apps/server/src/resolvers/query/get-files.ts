import { type ImageFile } from "@/types/generated-graphql-types.js";
import { filesModel } from "@internal/database";

export async function getImageFiles(): Promise<ImageFile[]> {
  const files = await filesModel
    .find({
      kind: "image"
    })
    .limit(250);

  return files.map((f) => ({
    ...f.toObject({ getters: true }),
    __typename: "ImageFile"
  }));
}
