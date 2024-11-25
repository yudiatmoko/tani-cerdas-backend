import express from "express";
import {
  handleAddEvent,
  handleDeleteEventById,
  handleGetAllEvents,
  handleGetEventById,
  handleUpdateEventById,
} from "../controllers/eventController.js";
import { body } from "express-validator";
import {
  authenticateToken,
  authorizeRoles,
} from "../middlewares/authMiddleware.js";
import uploadMiddleware from "../middlewares/uploadFilesMiddleware.js";

const router = express.Router();

// Mendapatkan semua event
router.get("/", authenticateToken, handleGetAllEvents);

// Menambahkan event baru
router.post(
  "/",
  authenticateToken,
  authorizeRoles(1, 2), // Hanya role 1 dan 2 yang diizinkan
  uploadMiddleware,
  [
    body("title").notEmpty().withMessage("Title is required"),
    body("description").notEmpty().withMessage("Description is required"),
    body("date").notEmpty().withMessage("Date is required"),
    body("location").notEmpty().withMessage("Location is required"),
  ],
  handleAddEvent
);

// Mendapatkan event berdasarkan ID
router.get("/:id", authenticateToken, handleGetEventById);

// Memperbarui event berdasarkan ID
router.put(
  "/:id",
  authenticateToken,
  authorizeRoles(1, 2),
  uploadMiddleware,
  [
    body("title").notEmpty().withMessage("Title is required"),
    body("description").notEmpty().withMessage("Description is required"),
    body("date").notEmpty().withMessage("Date is required"),
    body("location").notEmpty().withMessage("Location is required"),
  ],
  handleUpdateEventById
);

// Menghapus event berdasarkan ID
router.delete(
  "/:id",
  authenticateToken,
  authorizeRoles(1, 2),
  handleDeleteEventById
);

export default router;
