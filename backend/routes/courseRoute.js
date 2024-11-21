import express from "express";
import {
  handleAddCourse,
  handleDeleteCourseById,
  handleGetAllCourses,
  handleGetCourseById,
  handleUpdateCourseById,
} from "../controllers/courseController.js";
import { body } from "express-validator";
import {
  authenticateToken,
  authorizeRoles,
} from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", authenticateToken, handleGetAllCourses);
router.post(
  "/",
  authenticateToken,
  authorizeRoles(1, 2),
  [
    body("title").notEmpty().withMessage("Title is required"),
    body("description").notEmpty().withMessage("Description is required"),
    body("video_url").notEmpty().withMessage("Video URL is required"),
    body("image_url").notEmpty().withMessage("Image URL is required"),
    body("duration")
      .isInt({ min: 1 })
      .withMessage("Duration must be a positive integer"),
    body("level").notEmpty().withMessage("Level is required"),
  ],
  handleAddCourse
);
router.get("/(:id)", authenticateToken, handleGetCourseById);
router.put(
  "/(:id)",
  authenticateToken,
  authorizeRoles(1, 2),
  [
    body("title").notEmpty().withMessage("Title is required"),
    body("description").notEmpty().withMessage("Description is required"),
    body("video_url").notEmpty().withMessage("Video URL is required"),
    body("image_url").notEmpty().withMessage("Image URL is required"),
    body("duration")
      .isInt({ min: 1 })
      .withMessage("Duration must be a positive integer"),
    body("level").notEmpty().withMessage("Level is required"),
  ],
  handleUpdateCourseById
);
router.delete(
  "/(:id)",
  authenticateToken,
  authorizeRoles(1, 2),
  handleDeleteCourseById
);

export default router;
