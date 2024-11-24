import express from "express";
import akunModelController from "../controllers/akunModelController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Route yang dapat diakses oleh semua pengguna
router.get("/akun", akunModelController.getAllAkun); // Mendapatkan semua akun
router.get("/akun/:id", akunModelController.getAkunById); // Mendapatkan akun berdasarkan ID
router.get("/akun/by-name", akunModelController.getAkunByName); // Mendapatkan akun berdasarkan nama

// Route yang hanya bisa diakses oleh user dan pakar
router.put(
    "/akun/:id",
    authMiddleware.authenticate, // Harus login
    authMiddleware.authorizeRoles(1, 2), // Hanya untuk user (1) dan pakar (2)
    akunModelController.updateAkunFields // Memperbarui data akun
);

export default router;
