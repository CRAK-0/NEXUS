import pool from "../db/index.js";

export const getProjectsForUser = async (
  userId,
  status,
  search,
  page,
  limit,
  sort,
  order,
) => {
  const offset = (page - 1) * limit;

  const countResult = await pool.query(
    `SELECT COUNT(*)
    FROM projects
    WHERE user_id = $1
    AND ($2::varchar IS NULL OR status = $2)
    AND ($3::text IS NULL OR name ILIKE $3)`,
    [userId, status, search],
  );

  const total = Number(countResult.rows[0].count);
  const totalPages = Math.ceil(total / limit);

  const allowedSortFields = {
    name: "name",
    created_at: "created_at",
    updated_at: "updated_at",
  };

  const allowedSortOrders = {
    asc: "ASC",
    desc: "DESC",
  };

  const sortField = allowedSortFields[sort];
  const sortOrder = allowedSortOrders[order];

  if (!sortField || !sortOrder) {
    throw new Error("Invalid sorting parameters");
  }

  const result = await pool.query(
    `
   SELECT *
   FROM projects
   WHERE user_id = $1
   AND ($2::varchar IS NULL OR status = $2)
   AND ($3::text IS NULL OR name ILIKE $3)
   ORDER BY ${sortField} ${sortOrder}
   LIMIT $4
   OFFSET $5
  `,
    [userId, status, search, limit, offset],
  );

  return {
    projects: result.rows,
    pagination: {
      page,
      limit,
      total,
      totalPages,
    },
  };
};

export const createProjectForUser = async (
  userId,
  name,
  description,
  status,
) => {
  const insertValues = await pool.query(
    `INSERT INTO projects
    (user_id, name, description, status)
    VALUES
    ($1, $2, $3, $4)
    RETURNING *;
      `,
    [userId, name, description, status],
  );
  return {
    projects: insertValues.rows[0],
  };
};
