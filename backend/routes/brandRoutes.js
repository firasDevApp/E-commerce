import express from "express";
import { authMiddleware, adminMiddleware } from "../middleware/authMiddleware.js";
import {
    getBrands,
    getBrandById,
    createBrand,
    updateBrand,
    deleteBrand
} from "../controllers/brandController.js";

const router = express.Router();

// Public
router.get("/", getBrands);
router.get("/:id", getBrandById);

// Admin
router.post("/",  createBrand);
router.put("/:id", updateBrand);
router.delete("/:id",  deleteBrand);

export default router;
