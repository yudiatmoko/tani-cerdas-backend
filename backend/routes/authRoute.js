import express from "express";
import { handleLogin, handleRegister } from "../controllers/authController.js";
import { body } from "express-validator";

const router = express.Router();

router.post(
  "/register",
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").notEmpty().withMessage("Email is required"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  handleRegister
);
router.post(
  "/login",
  [
    body("email").notEmpty().withMessage("Email is required"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  handleLogin
);

// for private
// router.get("/protected", authenticateToken, (req, res) => {
//   res.json({ message: "You have access to this protected route", user: req.user });
// });

export default router;
