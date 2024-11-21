import express from "express";
import { body } from "express-validator";
import {
  handleAddUserCourses,
  handleDeleteUserCourseByUserAndCourse,
  handleGetAllUserCourses,
  handleGetUserCoursesByUserId,
  handleUpdateUserCourseByUserAndCourse,
} from "../controllers/userCourseController.js";
import { authenticateToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", handleGetAllUserCourses);
router.post(
  "/",
  authenticateToken,
  [
    body("user_id").notEmpty().withMessage("User id is required"),
    body("course_id").notEmpty().withMessage("Course id is required"),
  ],
  handleAddUserCourses
);
router.get("/(:id)", authenticateToken, handleGetUserCoursesByUserId);
router.put("/(:id)", authenticateToken, handleUpdateUserCourseByUserAndCourse);
router.delete(
  "/(:id)",
  authenticateToken,
  handleDeleteUserCourseByUserAndCourse
);

export default router;
