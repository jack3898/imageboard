import { usersModel } from "@/mongo.js";
import { type User } from "@/types/generated-graphql-types.js";
import { type GqlContext } from "@/types/graphql-context.js";

export async function getUser(_: unknown, __: unknown, context: GqlContext): Promise<User | null> {
  if (!context.req.user?.userId) {
    return null;
  }

  return await usersModel.findById(context.req.user.userId);
}
