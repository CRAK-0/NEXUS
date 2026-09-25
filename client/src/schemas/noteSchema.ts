import { z } from "zod";

export const noteSchema = z.object({
  title: z
    .string()
    .min(1, "Note title is required")
    .max(100),

  content: z
    .string()
    .min(1, "Note content is required")
    .max(255),
});

export type NoteFormData =
  z.infer<typeof noteSchema>;