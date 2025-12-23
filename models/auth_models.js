import db from "../config/db.js";

// Find user by email
export const findUserByEmail = async (email) => {
  const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
  return rows[0] || null;
};

// Create new user
export const createUser = async ({ name, email, password, userImage }) => {
  const [result] = await db.query(
    "INSERT INTO users (name, email, password, userImage) VALUES (?, ?, ?, ?)",
    [name, email, password, userImage],
  );

  return { id: result.insertId, name, email };
};

// Find user by ID
export const findUserById = async (id) => {
  const [rows] = await db.query("SELECT * FROM users WHERE id = ?", [id]);
  return rows[0] || null;
};
