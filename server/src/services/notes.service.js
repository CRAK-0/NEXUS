import pool from "../db/index.js";
import { AppError } from "../utils/AppError.js";
import { createActivity } from "./activities.service.js";

// CREATE
export const createNoteForUser = async (userId, noteData) => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const { title, content } = noteData;

    const result = await client.query(
      `
      INSERT INTO notes
      (user_id, title, content)
      VALUES
      ($1, $2, $3)
      RETURNING *;
      `,
      [userId, title, content],
    );

    const note = result.rows[0];

    await createActivity(client, userId, "created", "note", note.id);

    await client.query("COMMIT");

    return note;
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
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
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const fields = Object.keys(updateData);
    const values = Object.values(updateData);

    const setClauses = fields.map((field, index) => {
      return `${field} = $${index + 1}`;
    });

    values.push(noteId, userId);

    const result = await client.query(
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
      await client.query("ROLLBACK");
      return null;
    }

    const note = result.rows[0];

    await createActivity(client, userId, "updated", "note", note.id);

    await client.query("COMMIT");

    return note;
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
};

// DELETE
export const deleteNoteForUser = async (userId, noteId) => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const result = await client.query(
      `
      DELETE FROM notes
      WHERE id = $1
      AND user_id = $2
      RETURNING *;
      `,
      [noteId, userId],
    );

    if (result.rows.length === 0) {
      await client.query("ROLLBACK");
      return null;
    }

    const note = result.rows[0];

    await createActivity(client, userId, "deleted", "note", note.id);

    await client.query("COMMIT");

    return note;
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
};
