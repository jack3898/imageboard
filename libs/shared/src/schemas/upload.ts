import { z } from "zod";

export const uploadForm = z.object({
  title: z
    .string()
    .min(3, { message: "The title is too short!" })
    .max(128, { message: "The title is too long!" }),
  file: z.array(z.instanceof(File)).nonempty({ message: "You must provide at least one file" }),
  alt: z.string().max(250, { message: "Alt text is too long" }).optional().default(""),
  description: z
    .string()
    .max(2000, { message: "The description is too long" })
    .optional()
    .default("")
});

export type UploadForm = z.infer<typeof uploadForm>;
