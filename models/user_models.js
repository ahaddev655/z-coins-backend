import db from "../config/db.js";

/* =========================
   FIND USER BY ID
========================= */
export const findUserById = async (id) => {
  const [rows] = await db.query(
    "SELECT id, fullName, email, password, userImage FROM users WHERE id = ?",
    [id]
  );
  return rows[0] || null;
};

/* =========================
   FIND ALL USERS
========================= */
export const findUsers = async (id) => {
  const [rows] = await db.query(
    "SELECT id, fullName, email, password, isBlocked, isActive, userImage FROM users",
    [id]
  );
  return rows[0] || null;
};

/* =========================
   DELETE USER BY ID
========================= */
export const deleteUserById = async (id) => {
  const [result] = await db.query("DELETE FROM users WHERE id = ?", [id]);

  return result.affectedRows > 0;
};

/* =========================
   UPDATE USER PROFILE
========================= */
export const updateUserById = async (id, data) => {
  const { fullName, email, userImage } = data;

  const [result] = await db.query(
    `UPDATE users 
     SET fullName = ?, email = ?, userImage = ?
     WHERE id = ?`,
    [fullName, email, userImage, id]
  );

  if (result.affectedRows === 0) return null;

  return findUserById(id);
};

/* =========================
   UPDATE PASSWORD
========================= */
export const updateUserPasswordById = async (id, hashedPassword) => {
  const [result] = await db.query(
    "UPDATE users SET password = ? WHERE id = ?",
    [hashedPassword, id]
  );

  return result.affectedRows > 0;
};

/* =========================
   BLOCK USER
========================= */
export const blockUserById = async (id) => {
  const [result] = await db.query(
    "UPDATE users SET isBlocked = 1 WHERE id = ?",
    [id]
  );

  return result.affectedRows > 0;
};
