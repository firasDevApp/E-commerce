import express from "express";
import { authMiddleware, adminMiddleware } from "../middleware/authMiddleware.js";
import {
    getOrders,
    getOrderById,
    createOrder,
    updateOrder,
    deleteOrder,
    trackOrder,
    generatePdf
} from "../controllers/orderController.js";

const router = express.Router();

// User
router.post("/", authMiddleware, createOrder);
router.get("/track", authMiddleware, trackOrder);

// Admin
router.get("/", authMiddleware, adminMiddleware, getOrders);
router.get("/:id", authMiddleware, adminMiddleware, getOrderById);
router.put("/:id", authMiddleware, adminMiddleware, updateOrder);
router.delete("/:id", authMiddleware, adminMiddleware, deleteOrder);
router.get("/pdf/:id", authMiddleware, adminMiddleware, generatePdf);

export default router;
