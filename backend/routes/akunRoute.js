import express from "express";
import {
    handleGetAkunById,
    handleGetAkunByName,
    handleGetAllAkun,
    handleUpdateAkunFields,
} from "../controllers/akunController.js";
import { authenticateToken, authorizeRoles } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Route untuk mendapatkan semua akun
router.get("/", authenticateToken, authorizeRoles(1), handleGetAllAkun);

// Route untuk mendapatkan akun berdasarkan ID
router.get("/:id", authenticateToken, authorizeRoles(1), handleGetAkunById);

// Route untuk mendapatkan akun berdasarkan nama
router.get("/akun/by-name", authenticateToken, authorizeRoles(1), handleGetAkunByName);

// Route untuk memperbarui field pada akun
router.put(
    "/akun/:id",
    authenticateToken,
    authorizeRoles(2, 3), // Role 2: pakar, Role 3: user
    handleUpdateAkunFields
);

export default router;
