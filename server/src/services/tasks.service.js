import pool from "../db/index.js";
import { AppError } from "../utils/AppError.js";
import { createActivity } from "./activities.service.js";

export const createTaskForUser = async (userId, projectId, taskData) => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const { title, description, status, priority, due_date } = taskData;

    const result = await client.query(
      `
      INSERT INTO tasks
      (project_id, title, description, status, priority, due_date)
      SELECT
        $1, $2, $3, $4, $5, $6
      WHERE EXISTS (
        SELECT 1
        FROM projects
        WHERE projects.id = $1
        AND projects.user_id = $7
      )
      RETURNING *;
      `,
      [projectId, title, description, status, priority, due_date, userId],
    );

    if (result.rows.length === 0) {
      await client.query("ROLLBACK");
      return null;
    }

    const task = result.rows[0];

    await createActivity(client, userId, "created", "task", task.id);

    await client.query("COMMIT");

    return task;
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
};

export const getTasksForProject = async (userId, projectId) => {
  const projectResult = await pool.query(
    `
  SELECT id
  FROM projects
  WHERE id = $1
  AND user_id = $2;
  `,
    [projectId, userId],
  );

  if (projectResult.rows.length === 0) {
    throw new AppError("Project not found", 404);
  }

  const result = await pool.query(
    `
    SELECT tasks.*
    FROM tasks
    JOIN projects
      ON tasks.project_id = projects.id
    WHERE projects.id = $1
    AND projects.user_id = $2
    `,
    [projectId, userId],
  );

  return result.rows;
};

export const updateTaskForUser = async (userId, taskId, updateData) => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const fields = Object.keys(updateData);
    const values = Object.values(updateData);

    const setClauses = fields.map((field, index) => {
      return `${field} = $${index + 1}`;
    });

    values.push(taskId, userId);

    const result = await client.query(
      `
      UPDATE tasks
      SET ${setClauses.join(", ")},
          updated_at = CURRENT_TIMESTAMP
      WHERE tasks.id = $${fields.length + 1}
      AND EXISTS (
        SELECT 1
        FROM projects
        WHERE projects.id = tasks.project_id
        AND projects.user_id = $${fields.length + 2}
      )
      RETURNING *;
      `,
      values,
    );

    if (result.rows.length === 0) {
      await client.query("ROLLBACK");
      return null;
    }

    const task = result.rows[0];

    const action = task.status === "complete" ? "completed" : "updated";

    await createActivity(client, userId, action, "task", task.id);

    await client.query("COMMIT");

    return task;
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
};

export const deleteTaskForUser = async (userId, taskId) => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const result = await client.query(
      `
      DELETE FROM tasks
      USING projects
      WHERE tasks.id = $1
      AND tasks.project_id = projects.id
      AND projects.user_id = $2
      RETURNING tasks.*;
      `,
      [taskId, userId],
    );

    if (result.rows.length === 0) {
      await client.query("ROLLBACK");
      return null;
    }

    const task = result.rows[0];

    await createActivity(client, userId, "deleted", "task", task.id);

    await client.query("COMMIT");

    return task;
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
};
export const getAllTasksForUser = async (userId) => {
  const result = await pool.query(
    `
    SELECT tasks.*
    FROM tasks
    JOIN projects
      ON tasks.project_id = projects.id
    WHERE projects.user_id = $1
    ORDER BY tasks.created_at DESC;
    `,
    [userId],
  );

  return result.rows;
};
