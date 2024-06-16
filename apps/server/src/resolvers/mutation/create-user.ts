import { db } from "@/db.js";
import { type MutationCreateUserArgs, type LoggedInUser } from "@/types/generated-graphql-types.js";
import { hash } from "@/utils/pw-hash.js";
import { UsersTable } from "@internal/database";
import { schemas } from "@internal/shared";

export async function createUser(newUser: Partial<MutationCreateUserArgs>): Promise<LoggedInUser> {
  const verifiedUser = schemas.account.signupForm.safeParse({
    ...newUser.user,
    verifyEmail: newUser.user?.email,
    verifyPassword: newUser.user?.password
  });

  if (!verifiedUser.success) {
    console.error(verifiedUser.error);
    throw Error("New user is invalid");
  }

  const user = verifiedUser.data;

  const [dbUser] = await db
    .insert(UsersTable)
    .values({
      username: user.username,
      email: user.email,
      password: await hash(user.password)
    })
    .returning({
      id: UsersTable.id,
      username: UsersTable.username,
      email: UsersTable.email,
      createdAt: UsersTable.createdAt,
      updatedAt: UsersTable.updatedAt
    })
    .catch((error) => {
      console.error(error);

      return [undefined];
    });

  if (!dbUser) {
    throw Error("There was a problem creating the user");
  }

  return dbUser;
}
