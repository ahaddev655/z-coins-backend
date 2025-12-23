import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import userTable from "./schemas/user_table.js";
import db from "./config/db.js";
import { handleUploadErrors } from "./middleware/uploadImage.js"; // Add this

// Load environment variables
dotenv.config();

// Initialize database tables
userTable();

// Routes
import authRoutes from "./routes/auth_routes.js";

const app = express();
const server = http.createServer(app);

// Socket.io setup
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/auth", authRoutes);

// Upload error handling middleware (should be after routes that use upload)
app.use(handleUploadErrors);

// Test route
app.get("/", (req, res) => {
  res.send("Server is running");
});

// Socket.io events
io.on("connection", (socket) => {
  console.log("Socket connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("Socket disconnected:", socket.id);
  });
});

// Start server
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
