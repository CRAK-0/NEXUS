import pool from "../db/index.js";
export const globalSearch = async (userId, query) => {
  const searchTerm = `%${query}%`;

  const projectsResult = await pool.query(
    ` SELECT id, name, description, status FROM projects WHERE user_id = $1 AND ( name ILIKE $2 OR description ILIKE $2 ) ORDER BY created_at DESC `,

    [userId, searchTerm],
  );

  const tasksResult = await pool.query(
    ` 
    SELECT tasks.id, tasks.project_id, tasks.title, tasks.description, tasks.status, tasks.priority FROM tasks JOIN projects ON tasks.project_id = projects.id WHERE projects.user_id = $1 AND ( tasks.title ILIKE $2 OR tasks.description ILIKE $2 ) ORDER BY tasks.created_at DESC 
    `,
    [userId, searchTerm],
  );
  const notesResult = await pool.query(
    `
     SELECT id, title, content FROM notes WHERE user_id = $1 AND ( title ILIKE $2 OR content ILIKE $2 ) ORDER BY created_at DESC `,
    [userId, searchTerm],
  );

  return {
    projects: projectsResult.rows,
    tasks: tasksResult.rows,
    notes: notesResult.rows,
  };
};
