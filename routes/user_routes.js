import express from "express";
import {
  getOneUser,
  deleteUser,
  editUser,
  changePasswordUser,
  findAllUsers,
  blockUser,
} from "../controllers/user_controllers.js";

const router = express.Router();

/* =========================
   USER ROUTES
========================= */

// Get all users
router.get("/all-users", findAllUsers);

// Get single user
router.get("/one-user/:id", getOneUser);

// Update user profile
router.put("/edit-user/:id", editUser);

// Change password
router.put("/change-password/:id", changePasswordUser);

// Delete user
router.delete("/delete-user/:id", deleteUser);

// Block user
router.put("/block-user/:id", blockUser);

export default router;
