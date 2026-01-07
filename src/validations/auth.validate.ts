import { z } from "zod";

export const registerSchema = z.object({
  body: z.object({
    name: z.string().min(2).nonempty("Name is required"),
    email: z.email("Invalid email format").nonempty("Email is required"),
    password: z
      .string()
      .min(6, "password must be at least 6 characters")
      .nonempty("Password is required"),
  }),
});

export const loginSchema = z.object({
  body: z.object({
    email: z.email("Invalid email format").nonempty("Email is required"),
    password: z.string().min(6).nonempty("Password is required"),
  }),
});

export const updateProfileSchema = z.object({
  body: z.object({
    name: z.string().min(2).nonempty("Name is required"),
    email: z.email("Invalid email format").nonempty("Email is required"),
  }),
});

export const changePasswordSchema = z.object({
  body: z.object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z
      .string()
      .min(6, "New password must be at least 6 characters"),
  }),
});
