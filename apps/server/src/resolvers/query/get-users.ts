import { db } from "@/db.js";
import { type PublicUser, type LoggedInUser } from "@/types/generated-graphql-types.js";
import { type GqlContext } from "@/types/graphql-context.js";
import { UsersTable } from "@internal/database";
import { eq } from "drizzle-orm";

export async function getLoggedInUser(
  _: unknown,
  __: unknown,
  context: GqlContext
): Promise<LoggedInUser | null> {
  if (!context.req.user?.userId) {
    return null;
  }

  const [user] = await db
    .select({
      id: UsersTable.id,
      username: UsersTable.username,
      email: UsersTable.email,
      createdAt: UsersTable.createdAt,
      updatedAt: UsersTable.updatedAt
    })
    .from(UsersTable)
    .where(eq(UsersTable.id, context.req.user.userId))
    .limit(1);

  if (!user) {
    return null;
  }

  return {
    ...user,
    __typename: "LoggedInUser"
  };
}

export async function getPublicUser(id: string): Promise<PublicUser | null> {
  const [user] = await db
    .select({
      id: UsersTable.id,
      username: UsersTable.username,
      createdAt: UsersTable.createdAt,
      updatedAt: UsersTable.updatedAt
    })
    .from(UsersTable)
    .where(eq(UsersTable.id, id))
    .limit(1);

  if (!user) {
    return null;
  }

  return {
    ...user,
    __typename: "PublicUser"
  };
}
