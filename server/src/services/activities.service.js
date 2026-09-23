import pool from "../db/index.js";

export const createActivity = async (
  client,
  userId,
  action,
  entityType,
  entityId,
) => {
  const result = await client.query(
    `
    INSERT INTO activities
    (user_id, action, entity_type, entity_id)
    VALUES
    ($1, $2, $3, $4)
    RETURNING *;
    `,
    [userId, action, entityType, entityId],
  );

  return result.rows[0];
};
export const getActivitiesForUser = async (userId) => {
  const result = await pool.query(
    `
    SELECT *
    FROM activities
    WHERE user_id = $1
    ORDER BY created_at DESC;
    `,
    [userId],
  );

  return result.rows;
};
