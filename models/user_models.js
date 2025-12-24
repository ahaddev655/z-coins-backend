import db from "../config/db.js";

// Find user by id
export const findUserById = async (id) => {
  const [rows] = await db.query(
    "SELECT fullName, email, mobileNumber, userImage FROM users WHERE id = ?",
    [id]
  );
  return rows[0] || null;
};
