import express from "express";
import { register, login, googleRegister } from "../controllers/auth_controllers.js";
import { upload } from "./../middleware/uploadImage.js";

const router = express.Router();

/* =========================
   AUTH ROUTES
========================= */

// Register
router.post("/register", upload.single("userImage"), register);

// Login
router.post("/login", login);

// Google Register
router.post("/google-register", googleRegister);

export default router;
