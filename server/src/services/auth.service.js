import bcrypt from "bcrypt";
import pool from "../db/index.js";
import { AppError } from "../utils/AppError.js";

export const registerUser = async (username, email, password) => {
  // check email

  const verifyEmail = await pool.query(
    `SELECT id FROM users WHERE email = $1`,
    [email],
  );

  if (verifyEmail.rows.length > 0) {
    throw new AppError("Email already registered", 409);
  }

  // hash password
  const hashedPassword = await bcrypt.hash(password, 12);
  // insert user
  const result = await pool.query(
    `
    INSERT INTO users
    (username, email, password)
    VALUES
    ($1, $2, $3)
    RETURNING id, username, email, created_at`,
    [username, email, hashedPassword],
  );
  // return safe user
  return result.rows[0];
};
export const loginUser = async (email, password) => {
  const result = await pool.query(
    `
    SELECT id, username, email, password
    FROM users
    WHERE email = $1;
    `,
    [email],
  );

  if (result.rows.length === 0) {
    throw new AppError("Invalid email or password", 401);
  }

  const user = result.rows[0];

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new AppError("Invalid email or password", 401);
  }

  return {
    id: user.id,
    username: user.username,
    email: user.email,
  };
};
export const getUserById = async (userId) => {
  const result = await pool.query(
    `
    SELECT id, username, email, created_at
    FROM users
    WHERE id = $1;
    `,
    [userId],
  );

  if (result.rows.length === 0) {
    throw new AppError("User not found", 404);
  }

  return result.rows[0];
};
