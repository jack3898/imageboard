import { db } from "@/db.js";
import { type MutationChangePasswordArgs } from "@/types/generated-graphql-types.js";
import { hash, verifyHash } from "@/utils/pw-hash.js";
import { UsersTable } from "@internal/database";
import { schemas } from "@internal/shared";
import { eq } from "drizzle-orm";

export async function changePassword(
  input: Partial<MutationChangePasswordArgs>,
  userId?: string
): Promise<boolean> {
  const verifiedInput = schemas.account.editPasswordForm.safeParse({
    currentPassword: input.input?.currentPassword,
    password: input.input?.newPassword,
    verifyPassword: input.input?.newPassword
  });

  if (!verifiedInput.success) {
    console.error(verifiedInput.error);
    throw Error("Provided password change did not pass validation");
  }

  const [user] = await db
    .select({
      id: UsersTable.id,
      password: UsersTable.password
    })
    .from(UsersTable)
    .where(eq(UsersTable.id, userId ?? ""))
    .limit(1);

  const verifiedHash = await verifyHash(verifiedInput.data.currentPassword, user?.password ?? "");

  if (!verifiedHash || !user) {
    throw Error("Logged in user could not be found.");
  }

  const updated = await db
    .update(UsersTable)
    .set({ password: await hash(verifiedInput.data.password) })
    .where(eq(UsersTable.id, user.id));

  return updated.length > 0;
}
