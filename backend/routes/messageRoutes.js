import express from "express";
import { authMiddleware, adminMiddleware } from "../middleware/authMiddleware.js";
import {
    getMessages,
    getMessageById,
    createMessage,
    updateMessage,
    deleteMessage,
    getLatestFiveMessages
} from "../controllers/messageController.js";

const router = express.Router();

// Public
router.post("/", createMessage);

// Admin
router.get("/", authMiddleware, adminMiddleware, getMessages);
router.get("/five", authMiddleware, adminMiddleware, getLatestFiveMessages);
router.get("/:id", authMiddleware, adminMiddleware, getMessageById);
router.put("/:id", authMiddleware, adminMiddleware, updateMessage);
router.delete("/:id", authMiddleware, adminMiddleware, deleteMessage);

export default router;
