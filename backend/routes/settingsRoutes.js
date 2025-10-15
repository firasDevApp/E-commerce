import express from "express";
import { authMiddleware, adminMiddleware } from "../middleware/authMiddleware.js";
import {
    getSettings,
    updateSettings
} from "../controllers/settingsController.js";

const router = express.Router();

// Public
router.get("/", getSettings); // récupérer les settings (frontend)

// Admin
router.post("/", authMiddleware, adminMiddleware, updateSettings); // mettre à jour les settings

export default router;
