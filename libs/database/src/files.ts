import { Schema } from "mongoose";

type VariantType = "raw";

export const RAW_VARIANT = "raw" satisfies VariantType;

const variant = new Schema(
  {
    type: { type: String, required: true },
    path: { type: String, required: true },
    width: { type: Number, required: true },
    height: { type: Number, required: true }
  },
  {
    id: true
  }
);

export const filesSchema = new Schema(
  {
    title: { type: String, required: true },
    docVersion: { type: Number, required: true, default: 1 },
    variants: [variant],
    tags: { type: [String], default: [] },
    user: { type: Schema.ObjectId, ref: "user" }
  },
  {
    collection: "files",
    timestamps: true,
    autoIndex: true
  }
);
