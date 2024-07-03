import { db } from "@/db.js";
import { type PublicUser, type LoggedInUser } from "@/types/generated-graphql-types.js";
import { UsersTable } from "@internal/database";
import { eq } from "drizzle-orm";

export async function getLoggedInUser(userId?: string): Promise<LoggedInUser | null> {
  if (!userId) {
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
    .where(eq(UsersTable.id, userId))
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
