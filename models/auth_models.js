import db from "../config/db.js";

// Find user by email
export const findUserByEmail = async (email) => {
  const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
  return rows[0] || null;
};

// Create new user
export const createUser = async ({
  fullName,
  email,
  password,
  userImage,
}) => {
  const [result] = await db.query(
    "INSERT INTO users (fullName, email, password, userImage) VALUES (?, ?, ?, ?)",
    [fullName, email, password, userImage]
  );

  return result;
};
