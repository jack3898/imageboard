import { schemas } from "@internal/shared";
import { z } from "zod";
import { hash } from "@/utils/pw-hash.js";
import { db } from "@/db.js";
import { UsersTable } from "@internal/database";

export async function initTestUser(): Promise<void> {
  const envCredentialsCheck = z
    .object({
      TEST_EMAIL: schemas.env.TEST_EMAIL,
      TEST_USERNAME: schemas.env.TEST_USERNAME,
      TEST_PASSWORD: schemas.env.TEST_PASSWORD
    })
    .safeParse(process.env);

  if (envCredentialsCheck.error) {
    return;
  }

  const env = envCredentialsCheck.data;

  const usersEmpty = await db.query.UsersTable.findFirst().then((u) => !u);

  if (!usersEmpty) {
    return;
  }

  const passwordHash = await hash(env.TEST_PASSWORD);

  await db.insert(UsersTable).values({
    username: env.TEST_USERNAME,
    password: passwordHash,
    email: env.TEST_EMAIL
  });

  console.info(
    `ℹ️ Test account "${env.TEST_USERNAME}" created successfully. Please remove this account from your .env.`
  );
}
