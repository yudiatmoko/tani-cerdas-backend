import express from "express";
import { 
    handleCreateEvent, 
    handleGetAllEvents, 
    handleGetEventById, 
    handleUpdateEventById, 
    handleDeleteEventById 
} from "../controllers/eventController.js";  // Ensure the correct import

import { authenticateToken, authorizeRoles } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Use handleCreateEvent instead of handleAddEvent
router.post("/", authenticateToken, authorizeRoles(1, 2), handleCreateEvent);  // Fixed here
router.get("/", authenticateToken, authorizeRoles(1, 2), handleGetAllEvents);
router.get("/:id", authenticateToken, handleGetEventById);
router.put("/:id", authenticateToken, authorizeRoles(1, 2), handleUpdateEventById);
router.delete("/:id", authenticateToken, authorizeRoles(1, 2), handleDeleteEventById);

export default router;
