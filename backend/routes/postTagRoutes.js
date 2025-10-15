import express from "express";
import { authMiddleware, adminMiddleware } from "../middleware/authMiddleware.js";
import {
    getPostTags,
    getPostTagById,
    createPostTag,
    updatePostTag,
    deletePostTag
} from "../controllers/postTagController.js";

const router = express.Router();

// Public
router.get("/", getPostTags);
router.get("/:id", getPostTagById);

// Admin
router.post("/", authMiddleware, adminMiddleware, createPostTag);
router.put("/:id", authMiddleware, adminMiddleware, updatePostTag);
router.delete("/:id", authMiddleware, adminMiddleware, deletePostTag);

export default router;
