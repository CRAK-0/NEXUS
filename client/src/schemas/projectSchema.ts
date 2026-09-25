import { z } from "zod";

export const projectSchema = z.object({
  name: z.string().min(1, "Project name is required").max(100),
  description: z.string().max(255).optional(),
});

export type ProjectFormData = z.infer<typeof projectSchema>;