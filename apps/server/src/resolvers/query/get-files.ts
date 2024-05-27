import { filesModel } from "@/mongo.js";
import { type File } from "@/types/generated-graphql-types.js";

export async function getFiles(): Promise<File[]> {
  const files = await filesModel.find({}).limit(250);

  return files.map((f) => f.toObject({ getters: true }));
}
