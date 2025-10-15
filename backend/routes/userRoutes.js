import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import {
    getUserProfile,
    updateUserProfile,
    getUserOrders,
    getUserOrder,
    deleteUserOrder,
    getUserReviews,
    deleteUserReview,
    editUserReview,
    updateUserReview,
    getUserComments,
    deleteUserComment,
    editUserComment,
    updateUserComment,
    changePassword
} from "../controllers/userController.js";

const router = express.Router();

// Profile
router.get("/profile", authMiddleware, getUserProfile);
router.post("/profile/:id", authMiddleware, updateUserProfile);

// Orders
router.get("/order", authMiddleware, getUserOrders);
router.get("/order/:id", authMiddleware, getUserOrder);
router.delete("/order/:id", authMiddleware, deleteUserOrder);

// Product Reviews
router.get("/reviews", authMiddleware, getUserReviews);
router.delete("/reviews/:id", authMiddleware, deleteUserReview);
router.get("/reviews/:id/edit", authMiddleware, editUserReview);
router.patch("/reviews/:id", authMiddleware, updateUserReview);

// Post Comments
router.get("/comments", authMiddleware, getUserComments);
router.delete("/comments/:id", authMiddleware, deleteUserComment);
router.get("/comments/:id/edit", authMiddleware, editUserComment);
router.patch("/comments/:id", authMiddleware, updateUserComment);

// Password
router.post("/change-password", authMiddleware, changePassword);

export default router;
