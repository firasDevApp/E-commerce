import express from "express";
import { authMiddleware, adminMiddleware } from "../middleware/authMiddleware.js";
import {
    getShippings,
    getShippingById,
    createShipping,
    updateShipping,
    deleteShipping
} from "../controllers/shippingController.js";

const router = express.Router();

// Public
router.get("/", getShippings);
router.get("/:id", getShippingById);

// Admin
router.post("/", authMiddleware, adminMiddleware, createShipping);
router.put("/:id", authMiddleware, adminMiddleware, updateShipping);
router.delete("/:id", authMiddleware, adminMiddleware, deleteShipping);

export default router;
