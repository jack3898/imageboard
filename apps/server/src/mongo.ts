import mongoose from "mongoose";
import { env } from "./env.js";
import { usersSchema } from "@internal/database";

await mongoose.connect(env.MONGO_URL);

export const usersModel = mongoose.model("users", usersSchema);
