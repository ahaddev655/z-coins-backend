import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { findUserByEmail, createUser } from "../models/auth_models.js";
import db from "../config/db.js";

/* ================= REGISTER ================= */
export const register = async (req, res) => {
  try {
    const { fullName, email, password, mobileNumber } = req.body;

    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({
        success: false,
        error: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const userImage = req.file ? req.file.buffer : null;

    const newUser = await createUser({
      fullName,
      email,
      password: hashedPassword,
      mobileNumber,
      userImage,
    });

    const token = jwt.sign(
      { id: newUser.id, email: newUser.email },
      process.env.JWT_SECRET
    );

    const [role] = await db.query(`SELECT role FROM users WHERE email = ?`, [
      email,
    ]);

    const [id] = await db.query(`SELECT id FROM users WHERE email = ?`, [
      email,
    ]);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      token,
      id: id[0]?.id,
      role: role[0]?.role,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      error: "User registration failed",
      err,
    });
  }
};

/* ================= LOGIN ================= */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(401).json({
        success: false,
        error: "User not found",
      });
    }

    if (user.isBlocked) {
      return res.status(403).json({
        success: false,
        error: "Account has been blocked by admin",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        error: "Invalid password",
      });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET
    );

    const [role] = await db.query(`SELECT role FROM users WHERE email = ?`, [
      email,
    ]);

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      role: role[0]?.role || null,
      id: user.id,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: "Login failed",
      err,
    });
  }
};
