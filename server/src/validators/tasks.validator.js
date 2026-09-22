import { z } from "zod";

export const taskProjectIdSchema = z.object({
  projectId: z.coerce.number().int().min(1),
});

export const taskBodySchema = z.object({
  title: z.string().min(1).max(100),
  description: z.string().max(255).nullable().default(null),
  status: z.enum(["todo", "in_progress", "complete"]).default("todo"),
  priority: z.enum(["high", "medium", "low"]).default("medium"),
  due_date: z.string().date().nullable().default(null),
});
export const taskIdSchema = z.object({
  id: z.coerce.number().int().min(1),
});
export const taskUpdateSchema = z
  .object({
    title: z.string().min(1).max(100).optional(),
    description: z.string().max(255).nullable().optional(),
    status: z.enum(["todo", "in_progress", "complete"]).optional(),
    priority: z.enum(["high", "medium", "low"]).optional(),
    due_date: z.string().date().nullable().optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field is required for update",
  });
