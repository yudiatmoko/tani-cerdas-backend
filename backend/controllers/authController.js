import { validationResult } from "express-validator";
import {
  comparePassword,
  createUser,
  getUserByEmail,
} from "../models/authModel.js";
import { signToken } from "../middlewares/authMiddleware.js";

const handleLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const user = await getUserByEmail(email);

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    const passwordMatch = await comparePassword(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = signToken({ id: user.id, role: user.role_id });
    return res.status(200).json({
      status: true,
      message: "Login successful",
      token: token,
      role: user.role_id,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        image_url: user.image_url,
        city: user.city,
        job: user.job,
        experiences: user.experiences,
        institute: user.institute,
        rating: user.rating,
        created_at: user.created_at,
        updated_at: user.update_at,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ status: false, message: "Internal server error" });
  }
};

const handleRegister = async (req, res) => {
  const { name, email, password, role_id } = req.body;

  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    await createUser(name, email, password, role_id);
    res
      .status(201)
      .json({ status: true, message: "User registered successfully" });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ status: false, message: "Internal server error" });
  }
};

export { handleLogin, handleRegister };
