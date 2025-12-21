import mysql from "mysql2/promise"; // Use promise version
import dbConfig from "./db.config.js";

// Create a connection
const db = await mysql.createConnection({
  host: dbConfig.host,
  user: dbConfig.user,
  password: dbConfig.password,
  database: dbConfig.database,
  port: dbConfig.port,
});

console.log("✅ MySQL Database connected");

export default db;
