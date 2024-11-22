import express from "express";
import {
    handleCreateBooking,
    handleGetAllBookings,
    handleGetBookingById,
    handleUpdateBookingStatus,
    handleDeleteBooking,
} from "../controllers/bookingController.js";
import { authenticateToken, authorizeRoles } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", authenticateToken, handleCreateBooking);
router.get("/", authenticateToken, authorizeRoles("admin","pakar"), handleGetAllBookings);
router.get("/:id", authenticateToken, handleGetBookingById);
router.put("/:id/status", authenticateToken, authorizeRoles("pakar"), handleUpdateBookingStatus);
router.delete("/:id", authenticateToken, authorizeRoles("admin"), handleDeleteBooking);

export default router;