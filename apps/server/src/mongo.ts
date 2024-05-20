import mongoose from "mongoose";
import { env } from "./env.js";
import { filesSchema, usersSchema } from "@internal/database";

await mongoose.connect(env.MONGO_URL).catch(() => {
  console.error("It seems mongo is not available at", env.MONGO_URL);
  console.error("Please check your connection!");

  process.exit(1);
});

export const usersModel = mongoose.model("user", usersSchema);
export const filesModel = mongoose.model("file", filesSchema);

usersModel.findOne().then((result) => {
  if (!result) {
    usersModel.create({ username: "anonymous" });
  }
});
