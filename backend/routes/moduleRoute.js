import express from "express";
import { body } from "express-validator";
import {
  handleAddModule,
  handleDeleteModuleById,
  handleGetAllModules,
  handleGetModuleById,
  handleUpdateModuleById,
} from "../controllers/moduleController.js";
import {
  authenticateToken,
  authorizeRoles,
} from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", handleGetAllModules);
router.post(
  "/",
  authenticateToken,
  authorizeRoles(1, 2),
  [body("title").notEmpty().withMessage("Title is required")],
  handleAddModule
);
router.get("/(:id)", authenticateToken, handleGetModuleById);
router.put(
  "/(:id)",
  authenticateToken,
  authorizeRoles(1, 2),
  [body("title").notEmpty().withMessage("Title is required")],
  handleUpdateModuleById
);
router.delete(
  "/(:id)",
  authenticateToken,
  authorizeRoles(1, 2),
  handleDeleteModuleById
);

export default router;
