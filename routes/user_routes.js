import express from "express";
import { getOneUser } from "../controllers/user_controllers.js";

const router = express.Router();

router.get("/one-user/:id", getOneUser);

export default router;
