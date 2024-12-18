import express from "express";
import {
    handleDeleteAkun,
    handleGetAkunById,
    handleGetAkunByName,
    handleGetAkunByRole,
    handleGetAllAkun,
    handleUpdateAkun,
    handleGetAkunImage
} from "../controllers/akunController.js";
import { authenticateToken, authorizeRoles } from "../middlewares/authMiddleware.js";
import { body } from "express-validator";
import uploadMiddleware from "../middlewares/uploadFilesMiddleware.js";

const router = express.Router();

// Route untuk mendapatkan semua akun
router.get("/", authenticateToken, authorizeRoles(1), handleGetAllAkun);

// Route untuk mendapatkan akun berdasarkan ID



router.get("/name/:name", authenticateToken, authorizeRoles(1), handleGetAkunByName);

router.get("/role/:role_id", authenticateToken, handleGetAkunByRole);

// Route untuk mendapatkan gambar akun berdasarkan ID
router.get(
    "/image/:id",
    authenticateToken, // Middleware autentikasi
    (req, res, next) => {
      // Middleware validasi ID
      const { id } = req.params;
      if (!id || isNaN(id)) {
        return res.status(400).json({ error: "ID harus diberikan dan berupa angka" });
      }
      next();
    },
    handleGetAkunImage // Controller untuk mendapatkan data gambar akun
  );

// Route untuk mendapatkan akun berdasarkan nama
router.get("/:id", authenticateToken, handleGetAkunById);
// Route untuk memperbarui field pada akun
router.put(
    "/:id",  // Parameter ID pada URL
    authenticateToken,  // Middleware untuk autentikasi token
    uploadMiddleware,   // Middleware untuk mengunggah file (gambar)
    [
        body("name").notEmpty().withMessage("Name is required"),
        body("city").notEmpty().withMessage("City is required"),
        body("job").notEmpty().withMessage("Job is required"),
        body("institute").notEmpty().withMessage("Institute is required"),
        body("experiences")
            .isInt({ min: 0 })
            .withMessage("Experience must be a positive integer"),
    ],
    handleUpdateAkun  // Controller untuk menangani pembaruan akun
);

router.delete("/:id", authenticateToken, authorizeRoles(1), handleDeleteAkun)

export default router;
