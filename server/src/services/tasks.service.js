import pool from "../db/index.js";
import { AppError } from "../utils/AppError.js";

export const createTaskForUser = async (userId, projectId, taskData) => {
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

  const { title, description, status, priority, due_date } = taskData;

  const result = await pool.query(
    `
  INSERT INTO tasks
  (project_id, title, description, status, priority, due_date)
  VALUES
  ($1, $2, $3, $4, $5, $6)
  RETURNING *;
  `,
    [projectId, title, description, status, priority, due_date],
  );
  return result.rows[0];
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
  const fields = Object.keys(updateData);
  const values = Object.values(updateData);

  const setClauses = fields.map((field, index) => {
    return `${field} = $${index + 1}`;
  });

  values.push(taskId, userId);

  console.log({
    userId,
    taskId,
    updateData,
  });

  const result = await pool.query(
    `
    UPDATE tasks
    SET ${setClauses.join(", ")},
        updated_at = CURRENT_TIMESTAMP
    FROM projects
    WHERE tasks.id = $${fields.length + 1}
    AND tasks.project_id = projects.id
    AND projects.user_id = $${fields.length + 2}
    RETURNING tasks.*;
    `,
    values,
  );

  if (result.rows.length === 0) {
    throw new AppError("Task not found", 404);
  }

  return result.rows[0];
};

export const deleteTaskForUser = async (userId, taskId) => {
  const result = await pool.query(
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
    throw new AppError("Task not found", 404);
  }

  return result.rows[0];
};
