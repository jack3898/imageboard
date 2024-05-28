import { Types } from "mongoose";
import { z } from "zod";
import { docVersionValidationSchema, timestampValidationSchema } from "./common.js";

export const imageVariantValidationSchema = z
  .object({
    type: z.enum(["png", "jpeg"]),
    quality: z.enum(["raw"]),
    path: z.string(),
    width: z.number(),
    height: z.number()
  })
  .extend(timestampValidationSchema);

export type ImageVariantValidationSchema = z.infer<typeof imageVariantValidationSchema>;

export const filesValidationSchema = z
  .object({
    title: z.string(),
    docVersion: z.number(),
    tags: z.array(z.string()),
    user: z.union([z.instanceof(Types.ObjectId), z.string()]),
    description: z.string().optional(),
    kind: z.enum(["image", "unknown"]).optional()
  })
  .extend(docVersionValidationSchema)
  .extend(timestampValidationSchema);

export type FilesValidationSchema = z.infer<typeof filesValidationSchema>;

export const imagesValidationSchema = z
  .object({
    imageVariants: z.array(imageVariantValidationSchema),
    alt: z.string().optional().default("")
  })
  .and(filesValidationSchema);

export type ImagesValidationSchema = z.infer<typeof imagesValidationSchema>;
