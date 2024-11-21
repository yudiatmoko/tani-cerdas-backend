import express from "express";
import {
  handleGetAllCourses,
  handleGetEducationById,
} from "../controllers/educationController.js";

const router = express.Router();

router.get("/", handleGetAllCourses);
router.get("/(:id)", handleGetEducationById);

export default router;
