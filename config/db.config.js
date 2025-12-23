import dotenv from "dotenv";

dotenv.config();

const dbConfig = {
  host: process.env.DB_HOST || "mysql-sa-blogs.alwaysdata.net",
  user: process.env.DB_USER || "sa-blogs",
  password: process.env.DB_PASSWORD || "3104944Tony",
  database: process.env.DB_NAME || "sa-blogs_z-coins_db",
};

export default dbConfig;
