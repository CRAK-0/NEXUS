import pool from "../db/index.js";
import { AppError } from "../utils/AppError.js";

// CREATE
export const createNoteForUser = async (userId, noteData) => {
  const { title, content } = noteData;

  const result = await pool.query(
    `
    INSERT INTO notes
    (user_id, title, content)
    VALUES
    ($1, $2, $3)
    RETURNING *;
    `,
    [userId, title, content],
  );

  return result.rows[0];
};

// GET ALL
export const getNotesForUser = async (userId) => {
  const result = await pool.query(
    `
    SELECT *
    FROM notes
    WHERE user_id = $1
    ORDER BY created_at DESC;
    `,
    [userId],
  );

  return result.rows;
};

// UPDATE
export const updateNoteForUser = async (userId, noteId, updateData) => {
  const fields = Object.keys(updateData);
  const values = Object.values(updateData);

  const setClauses = fields.map((field, index) => {
    return `${field} = $${index + 1}`;
  });

  values.push(noteId, userId);

  const result = await pool.query(
    `
    UPDATE notes
    SET ${setClauses.join(", ")},
        updated_at = CURRENT_TIMESTAMP
    WHERE id = $${fields.length + 1}
    AND user_id = $${fields.length + 2}
    RETURNING *;
    `,
    values,
  );

  if (result.rows.length === 0) {
    throw new AppError("Note not found", 404);
  }

  return result.rows[0];
};

// DELETE
export const deleteNoteForUser = async (userId, noteId) => {
  const result = await pool.query(
    `
    DELETE FROM notes
    WHERE id = $1
    AND user_id = $2
    RETURNING *;
    `,
    [noteId, userId],
  );

  if (result.rows.length === 0) {
    throw new AppError("Note not found", 404);
  }

  return result.rows[0];
};
