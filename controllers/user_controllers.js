import bcrypt from "bcrypt";
import {
  findUserById,
  updateUserById,
  deleteUserById,
  updateUserPasswordById,
  blockUserById,
  findUsers,
} from "../models/user_models.js";

/* =========================
   GET ONE USER
========================= */
export const getOneUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await findUserById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Convert image buffer to base64
    if (user.userImage) {
      user.userImage = `data:image/jpeg;base64,${Buffer.from(
        user.userImage
      ).toString("base64")}`;
    }

    res.status(200).json({
      success: true,
      message: "User successfully fetched",
      user,
    });
  } catch (err) {
    console.error("Get User Error:", err);
    res.status(500).json({
      success: false,
      error: "User details fetching failed",
      err,
    });
  }
};

/* =========================
   DELETE USER
========================= */
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await deleteUserById(id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User successfully deleted",
    });
  } catch (err) {
    console.error("Delete User Error:", err);
    res.status(500).json({
      success: false,
      error: "User deletion failed",
      err,
    });
  }
};

/* =========================
   EDIT / UPDATE USER
========================= */
export const editUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { fullName, email, mobileNumber } = req.body;

    const userImage = req.file ? req.file.buffer : null;

    const updatedUser = await updateUserById(id, {
      fullName,
      email,
      mobileNumber,
      userImage,
    });

    // Check if user exists first
    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Convert image buffer to base64 if it exists
    if (updatedUser.userImage) {
      updatedUser.userImage = `data:image/jpeg;base64,${Buffer.from(
        updatedUser.userImage
      ).toString("base64")}`;
    }

    res.status(200).json({
      success: true,
      message: "User successfully updated",
      user: updatedUser,
    });
  } catch (err) {
    console.error("Edit User Error:", err);
    res.status(500).json({
      success: false,
      error: "User update failed",
      err,
    });
  }
};


/* =========================
   CHANGE PASSWORD
========================= */
export const changePasswordUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { password } = req.body;

    const user = await findUserById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await updateUserPasswordById(id, hashedPassword);

    res.status(200).json({
      success: true,
      message: "Password successfully changed",
    });
  } catch (err) {
    console.error("Change Password Error:", err);
    res.status(500).json({
      success: false,
      error: "Change password API failed",
      err
    });
  }
};

/* =========================
   BLOCK USER
========================= */
export const blockUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await blockUserById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User successfully blocked",
    });
  } catch (err) {
    console.error("User block API Error:", err);
    res.status(500).json({
      success: false,
      error: "User block failed",
      err,
    });
  }
};

/* =========================
   GET ALL USERS
========================= */
export const findAllUsers = async (req, res) => {
  try {
    const user = await findUsers();

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "No users found in the table...",
      });
    }

    res.status(200).json({
      success: true,
      message: "All users fetched",
      user,
    });
  } catch (err) {
    console.error("All users fetching API error:", err);
    res.status(500).json({
      success: false,
      error: "Failed in fetching all users",
      err,
    });
  }
};
