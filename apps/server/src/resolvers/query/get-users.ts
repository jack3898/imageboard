import { usersModel } from "@/mongo.js";
import { type User } from "@/types/generated-graphql-types.js";

export async function getUsers(): Promise<User[]> {
  return await usersModel.find({});
}
