import { filesModel } from "@/mongo.js";
import { type File } from "@/types/generated-graphql-types.js";

export async function getFiles(): Promise<File[]> {
  return await filesModel.find({});
}
