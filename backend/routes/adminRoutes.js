import express from "express";
import { authMiddleware, adminMiddleware } from "../middleware/authMiddleware.js";
import {
    dashboard,
    getProfile,
    updateProfile,
    changePassword
} from "../controllers/adminController.js";

const router = express.Router();

// Admin dashboard
router.get("/", authMiddleware, adminMiddleware, dashboard);

// Profile
router.get("/profile", authMiddleware, adminMiddleware, getProfile);
router.post("/profile/:id", authMiddleware, adminMiddleware, updateProfile);

// Change password
router.post("/change-password", authMiddleware, adminMiddleware, changePassword);

export default router;
