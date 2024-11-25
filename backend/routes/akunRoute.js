import express from "express";
import akunModelController from "../controllers/akunModelController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/akun", akunModelController.getAllAkun);
router.get("/akun/:id", akunModelController.getAkunById);
router.get("/akun/by-name", akunModelController.getAkunByName);
router.put(
    "/akun/:id",
    authMiddleware.authenticate, 
    authMiddleware.authorizeRoles(1, 2),
    akunModelController.updateAkunFields 
);

export default router;
