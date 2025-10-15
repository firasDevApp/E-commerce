import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import {
    getReviews,
    getReviewById,
    createReview,
    updateReview,
    deleteReview
} from "../controllers/reviewController.js";

const router = express.Router();

// Public
router.get("/", getReviews);
router.get("/:id", getReviewById);

// User
router.post("/:productId", authMiddleware, createReview);
router.put("/:id", authMiddleware, updateReview);
router.delete("/:id", authMiddleware, deleteReview);

export default router;
