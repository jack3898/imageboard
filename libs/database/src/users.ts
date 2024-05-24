import { Schema } from "mongoose";

export const usersSchema = new Schema(
  {
    docVersion: {
      type: Number,
      required: true,
      default: 1
    },
    username: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    }
  },
  {
    collection: "users",
    timestamps: true,
    autoIndex: true
  }
);
