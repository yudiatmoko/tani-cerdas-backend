import express from "express";
import { body } from "express-validator";
import {
  handleAddCourseModules,
  handleDeleteCourseModule,
  handleGetAllCourseModules,
  handleGetCourseModulesByCourseId,
  handleUpdateCourseModulesById,
} from "../controllers/courseModulesController.js";
import {
  authenticateToken,
  authorizeRoles,
} from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", handleGetAllCourseModules);
router.post(
  "/",
  authenticateToken,
  authorizeRoles(1, 2),
  [
    body("course_id").notEmpty().withMessage("Course id is required"),
    body("module_id").notEmpty().withMessage("Module id is required"),
  ],
  handleAddCourseModules
);
router.get("/(:id)", authenticateToken, handleGetCourseModulesByCourseId);
router.put(
  "/(:id)",
  authenticateToken,
  authorizeRoles(1, 2),
  [
    body("course_id").notEmpty().withMessage("Course id is required"),
    body("module_id").notEmpty().withMessage("Module id is required"),
  ],
  handleUpdateCourseModulesById
);
router.delete(
  "/(:id)",
  authenticateToken,
  authorizeRoles(1, 2),
  handleDeleteCourseModule
);

export default router;
