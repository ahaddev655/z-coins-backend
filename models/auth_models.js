import db from "../config/db.js";

export const findUserByEmail = (email, callback) => {
  const query = "SELECT * FROM users WHERE email = ?";
  db.query(query, [email], callback);
};

export const createUser = (user, callback) => {
  const query = `
    INSERT INTO users (name, email, password, userImage)
    VALUES (?, ?, ?, ?)
  `;

  db.query(
    query,
    [user.name, user.email, user.password, user.userImage],
    callback
  );
};
