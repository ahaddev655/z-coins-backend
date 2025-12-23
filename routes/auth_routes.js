import express from "express";
import { register, login } from "../controllers/auth_controllers.js";
import { upload } from "./../middleware/uploadImage.js";

const router = express.Router();

router.post("/register", upload.single("userImage"), register);
router.post("/login", login);

export default router;
