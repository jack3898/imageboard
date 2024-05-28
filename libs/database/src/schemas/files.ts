import mongoose, { Schema } from "mongoose";
import {
  type FilesValidationSchema,
  type ImagesValidationSchema,
  type ImageVariantValidationSchema
} from "../validation/files.js";

const imageVariant = new Schema<ImageVariantValidationSchema>(
  {
    type: { type: String, enum: ["png", "jpeg"], required: true },
    quality: { type: String, enum: ["raw"], required: true },
    path: { type: String, required: true },
    width: { type: Number, required: true },
    height: { type: Number, required: true }
  },
  {
    id: true
  }
);

const filesSchema = new Schema<FilesValidationSchema>(
  {
    title: { type: String, required: true },
    docVersion: { type: Number, required: true, default: 1 },
    tags: { type: [String], default: [] },
    user: { type: Schema.ObjectId, ref: "user" },
    description: { type: String, default: "" }
  },
  {
    collection: "files",
    timestamps: true,
    autoIndex: true,
    discriminatorKey: "kind"
  }
);

export const filesModel = mongoose.model("file", filesSchema);

// The idea is videos and other media types will have their own discriminator

export const imagesModel = filesModel.discriminator<ImagesValidationSchema>(
  "image",
  new Schema({
    imageVariants: [imageVariant],
    alt: { type: String, default: "" }
  })
);
