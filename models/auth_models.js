import db from "../config/db.js";

export const findUserByEmail = async (email) => {
  const query = "SELECT * FROM users WHERE email = ?";

  try {
    const [results] = await db.query(query, [email]);
    return results[0] || null;
  } catch (error) {
    console.error("Error finding user by email:", error);
    throw error;
  }
};

export const createUser = async (user) => {
  const query = `
    INSERT INTO users (name, email, password, userImage, imageMimeType)
    VALUES (?, ?, ?, ?, ?)
  `;

  try {
    const [result] = await db.query(query, [
      user.name,
      user.email,
      user.password,
      user.userImage,
      user.imageMimeType,
    ]);
    return { id: result.insertId, ...user };
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

// Optional: Get user by ID
export const findUserById = async (id) => {
  const query = "SELECT * FROM users WHERE id = ?";

  try {
    const [results] = await db.query(query, [id]);
    return results[0] || null;
  } catch (error) {
    console.error("Error finding user by id:", error);
    throw error;
  }
};
