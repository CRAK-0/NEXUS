import { z } from "zod";

export const noteBodySchema = z.object({
  title: z.string().min(1).max(100),
  content: z.string().max(255).nullable().default(null),
});
export const noteIdSchema = z.object({
  id: z.coerce.number().int().min(1),
});
export const noteUpdateSchema = z
  .object({
    title: z.string().min(1).max(100).optional(),
    content: z.string().max(255).nullable().optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field is required for update",
  });
