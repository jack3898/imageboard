import { Schema } from "mongoose";

export const filesSchema = new Schema(
  {
    docVersion: {
      type: Number,
      required: true,
      default: 1
    },
    path: {
      type: String,
      required: true
    },
    user: {
      type: Schema.ObjectId,
      ref: "user"
    }
  },
  {
    collection: "files",
    timestamps: true,
    autoIndex: true
  }
);
