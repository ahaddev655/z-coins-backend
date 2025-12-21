import db from "../config/db.js";

const userTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(100),
      email VARCHAR(100) UNIQUE,
      password VARCHAR(255),
      isActive BOOLEAN DEFAULT TRUE,
      isBlocked BOOLEAN DEFAULT FALSE,
      role VARCHAR(20) DEFAULT 'trader',
      userImage VARCHAR(255),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;
  await db.query(query);
};

export default userTable;
