import { z } from "zod";

export const title = z
  .string()
  .min(3, { message: "The title is too short!" })
  .max(128, { message: "The title is too long!" });

export const file = z
  .array(z.instanceof(File))
  .nonempty({ message: "You must provide at least one file" });

export const uploadForm = z.object({
  title,
  file
});
