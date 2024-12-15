import express from "express";
import {
    handleDeleteAkun,
    handleGetAkunById,
    handleGetAkunByName,
    handleGetAkunByRole,
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
router.get("/name/:name", authenticateToken, authorizeRoles(1), handleGetAkunByName);

router.get("/role/:role_id", authenticateToken, handleGetAkunByRole);

// Route untuk memperbarui field pada akun
router.put(
    "/akun/:id",
    authenticateToken,
    authorizeRoles(2, 3), // Role 2: pakar, Role 3: user
    handleUpdateAkunFields
);

router.delete("/:id", authenticateToken, authorizeRoles(1), handleDeleteAkun)

export default router;
