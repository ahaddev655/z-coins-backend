import express from "express";
import { register, login } from "../controllers/auth_controllers.js";

const router = express.Router();

router.post("/register", uploadImage, register);
router.post("/login", login);

export default router;
