import { z } from "zod";
import { regex } from "../index.js";

export const email = z.string().email();

export const username = z
  .string()
  .min(3, { message: "A username must be 3 characters or more" })
  .max(16, { message: "A username must be 16 characters or less" })
  .regex(regex.USERNAME);

export const password = z
  .string()
  .min(8, { message: "The password must be 8 characters or more" })
  .max(72, { message: "The password is too long" })
  .regex(regex.PASSWORD, {
    message: "The provided password is invalid"
  });

export const loginForm = z.object({
  email,
  password
});

export const signupForm = z
  .object({
    username,
    email,
    verifyEmail: email,
    password,
    verifyPassword: password
  })
  .refine((schema) => schema.password === schema.verifyPassword, {
    message: "Passwords do not match",
    path: ["password"]
  })
  .refine((schema) => schema.email === schema.verifyEmail, {
    message: "Emails do not match",
    path: ["email"]
  });

export type AccountForm = z.infer<typeof loginForm>;
