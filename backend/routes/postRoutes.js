import express from "express";
import { authMiddleware, adminMiddleware } from "../middleware/authMiddleware.js";
import {
    getPosts,
    getPostById,
    createPost,
    updatePost,
    deletePost
} from "../controllers/postController.js";

const router = express.Router();

// Public
router.get("/", getPosts);
router.get("/:id", getPostById);

// Admin
router.post("/", authMiddleware, adminMiddleware, createPost);
router.put("/:id", authMiddleware, adminMiddleware, updatePost);
router.delete("/:id", authMiddleware, adminMiddleware, deletePost);

export default router;
