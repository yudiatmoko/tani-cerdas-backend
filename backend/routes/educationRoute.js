import express from "express";
import {
  handleGetAllCourses,
  handleGetEducationById,
} from "../controllers/educationController.js";
import { authenticateToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", handleGetAllCourses);
router.get("/(:id)", authenticateToken, handleGetEducationById);

export default router;
