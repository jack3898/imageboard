import mongoose, { Schema } from "mongoose";
import { type UsersValidationSchema } from "../validation/users.js";

export const usersSchema = new Schema<UsersValidationSchema>(
  {
    docVersion: { type: Number, required: true, default: 1 },
    username: { type: String, required: true },
    email: { type: String, require: true, select: false },
    password: { type: String, required: true, select: false }
  },
  {
    collection: "users",
    timestamps: true
  }
);

export const usersModel = mongoose.model("user", usersSchema);