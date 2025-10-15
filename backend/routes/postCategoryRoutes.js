import express from "express";
import { authMiddleware, adminMiddleware } from "../middleware/authMiddleware.js";
import {
    getPostCategories,
    getPostCategoryById,
    createPostCategory,
    updatePostCategory,
    deletePostCategory
} from "../controllers/postCategoryController.js";

const router = express.Router();

// Public
router.get("/", getPostCategories);
router.get("/:id", getPostCategoryById);

// Admin
router.post("/", authMiddleware, adminMiddleware, createPostCategory);
router.put("/:id", authMiddleware, adminMiddleware, updatePostCategory);
router.delete("/:id", authMiddleware, adminMiddleware, deletePostCategory);

export default router;
