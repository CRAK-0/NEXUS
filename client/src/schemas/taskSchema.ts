import { z } from "zod";

export const taskSchema = z.object({
  title: z
    .string()
    .min(1, "Task title is required")
    .max(100),

  description: z
    .string()
    .max(255)
    .optional(),

  status: z.enum([
    "todo",
    "in_progress",
    "complete",
  ]),

  priority: z.enum([
    "low",
    "medium",
    "high",
  ]),

  due_date: z
    .string()
    .optional(),
});

export type TaskFormData =
  z.infer<typeof taskSchema>;