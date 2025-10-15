import express from "express";
import { authMiddleware, adminMiddleware } from "../middleware/authMiddleware.js";
import {
    getBanners,
    getBannerById,
    createBanner,
    updateBanner,
    deleteBanner
} from "../controllers/bannerController.js";
import multer from "multer";

const storage = multer.diskStorage({}); // store in temp memory
const upload = multer({ storage });


const router = express.Router();

// Public
router.get("/", getBanners);
router.get("/:id", getBannerById);

// Admin
router.post("/", upload.single("photo"), createBanner); 
router.put("/:id", upload.single("photo"), updateBanner);
router.delete("/:id", deleteBanner);

export default router;
