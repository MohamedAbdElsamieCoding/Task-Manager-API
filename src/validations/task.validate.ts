import { z } from "zod";
import { Priority } from "../types/priority";

export const createTaskSchema = z.object({
  body: z.object({
    title: z
      .string()
      .nonempty("Title is required")
      .min(3, "Title must be at least 3 character")
      .max(100),
    content: z.string().optional(),
    completed: z.boolean().optional(),
    priority: z
      .enum([Priority.HIGH, Priority.LOW, Priority.MEDIUM])
      .default(Priority.MEDIUM),
    dueTo: z.date(),
  }),
});

export const updateTaskSchema = z.object({
  body: z.object({
    title: z.string().min(3).max(100).optional(),
    content: z.string().optional(),
    completed: z.boolean().optional(),
    priority: z
      .enum([Priority.HIGH, Priority.LOW, Priority.MEDIUM])
      .default(Priority.MEDIUM)
      .optional(),
    dueTo: z.date().optional(),
  }),
});
