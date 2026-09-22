import { Router } from "express";

import {
  createNote,
  getNotes,
  updateNote,
  deleteNote,
} from "../controllers/notes.controller.js";

import { validate } from "../middlewares/validate.js";

import {
  noteBodySchema,
  noteIdSchema,
  noteUpdateSchema,
} from "../validators/notes.validator.js";

const router = Router();

// GET /api/notes
router.get("/", getNotes);

// POST /api/notes
router.post("/", validate(noteBodySchema, "body"), createNote);

// PATCH /api/notes/:id
router.patch(
  "/:id",
  validate(noteIdSchema, "params"),
  validate(noteUpdateSchema, "body"),
  updateNote,
);

// DELETE /api/notes/:id
router.delete("/:id", validate(noteIdSchema, "params"), deleteNote);

export default router;
