import {
  createNoteForUser,
  getNotesForUser,
  updateNoteForUser,
  deleteNoteForUser,
} from "../services/notes.service.js";

// CREATE
export const createNote = async (req, res, next) => {
  try {
    const noteData = req.validated.body;

    const userId = req.user.id;

    const note = await createNoteForUser(userId, noteData);

    res.status(201).json({
      success: true,
      note,
    });
  } catch (error) {
    next(error);
  }
};

// GET
export const getNotes = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const notes = await getNotesForUser(userId);

    res.json({
      success: true,
      notes,
    });
  } catch (error) {
    next(error);
  }
};

// PATCH
export const updateNote = async (req, res, next) => {
  try {
    const { id } = req.validated.params;
    const updateData = req.validated.body;

    const userId = req.user.id;

    const note = await updateNoteForUser(userId, id, updateData);

    res.json({
      success: true,
      note,
    });
  } catch (error) {
    next(error);
  }
};

// DELETE
export const deleteNote = async (req, res, next) => {
  try {
    const { id } = req.validated.params;

    const userId = req.user.id;

    const note = await deleteNoteForUser(userId, id);

    res.json({
      success: true,
      note,
    });
  } catch (error) {
    next(error);
  }
};
