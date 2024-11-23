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
router.get("/", authenticateToken, authorizeRoles(1,2), handleGetAllBookings);
router.get("/:id", authenticateToken, handleGetBookingById);
router.put("/:id/status", authenticateToken, authorizeRoles(2,1), handleUpdateBookingStatus);
router.delete("/:id", authenticateToken, authorizeRoles(1), handleDeleteBooking);

export default router;