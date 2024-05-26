import { usersModel } from "@/mongo.js";
import { schemas } from "@internal/shared";
import { z } from "zod";
import { hash } from "@/utils/pw-hash.js";

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

  await usersModel.findOne({ username: env.TEST_USERNAME }).then(async (result) => {
    if (!result) {
      const passwordHash = await hash(env.TEST_PASSWORD);

      usersModel.create({
        username: env.TEST_USERNAME,
        password: passwordHash,
        email: env.TEST_EMAIL
      });

      console.info(
        `ℹ️ Test account "${env.TEST_USERNAME}" created successfully. Please remove this account from your .env.`
      );

      return;
    }

    if (env.TEST_USERNAME) {
      console.warn(
        "⚠️  Test credentials detected in environment when test user is already created. Please remove the test credentials."
      );
    }
  });
}
