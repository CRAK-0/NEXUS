import { z } from "zod";

export const projectQuerySchema = z.object({
  status: z.enum(["pending", "complete"]).nullable().default(null),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),
  sort: z.enum(["name", "created_at", "updated_at"]).default("created_at"),
  order: z.enum(["asc", "desc"]).default("desc"),
  search: z.string().nullable().default(null),
});

export const projectBodySchema = z.object({
  name: z.string().min(1).max(100),
  description: z.string().max(255).nullable().default(null),
  status: z.enum(["pending", "complete"]).default("pending"),
});

export const projectUpdateSchema = z.object({
  name: z.string().min(1).max(100).optional(),
  description: z.string().max(255).nullable().optional(),
  status: z.enum(["pending", "complete"]).optional(),
});
export const projectIdSchema = z.object({
  id: z.coerce.number().int().min(1),
});
