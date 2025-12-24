import { findUserById } from "../models/user_models.js";

// Get One User
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

    if (user.userImage) {
      const base64Image = Buffer.from(user.userImage).toString("base64");
      user.userImage = `data:image/jpeg;base64,${base64Image}`;
    }

    res.status(200).json({
      success: true,
      message: "User successfully fetched",
      user,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      error: "User details fetching failed",
      err,
    });
  }
};
