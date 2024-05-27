import { z } from "zod";

export const timestampValidationSchema = {
  createdAt: z.date().optional(),
  updatedAt: z.date().optional()
};

export const docVersionValidationSchema = {
  docVersion: z.literal(1).optional() // In the future this will be an enum type
};
