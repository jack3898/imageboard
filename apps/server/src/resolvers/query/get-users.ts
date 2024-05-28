import { type PublicUser, type LoggedInUser } from "@/types/generated-graphql-types.js";
import { type GqlContext } from "@/types/graphql-context.js";
import { usersModel } from "@internal/database";

export async function getLoggedInUser(
  _: unknown,
  __: unknown,
  context: GqlContext
): Promise<LoggedInUser | null> {
  if (!context.req.user?.userId) {
    return null;
  }

  const user = await usersModel.findById(context.req.user.userId).select("+email");

  if (!user) {
    return null;
  }

  return {
    ...user.toObject({ getters: true }),
    __typename: "LoggedInUser"
  };
}

export async function getPublicUser(id: string): Promise<PublicUser | null> {
  const user = await usersModel.findById(id);

  if (!user) {
    return null;
  }

  return {
    ...user.toObject({ getters: true }),
    __typename: "PublicUser"
  };
}
