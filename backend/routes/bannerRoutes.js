import express from "express";
import { authMiddleware, adminMiddleware } from "../middleware/authMiddleware.js";
import {
    getBanners,
    getBannerById,
    createBanner,
    updateBanner,
    deleteBanner
} from "../controllers/bannerController.js";

const router = express.Router();

// Public
router.get("/", getBanners);
router.get("/:id", getBannerById);

// Admin
router.post("/", authMiddleware, adminMiddleware, createBanner);
router.put("/:id", authMiddleware, adminMiddleware, updateBanner);
router.delete("/:id", authMiddleware, adminMiddleware, deleteBanner);

export default router;
