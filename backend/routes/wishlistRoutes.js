import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import {
    getWishlists,
    addWishlist,
    deleteWishlist
} from "../controllers/wishlistController.js";

const router = express.Router();

// User
router.get("/", authMiddleware, getWishlists);
router.post("/:productId", authMiddleware, addWishlist);
router.delete("/:id", authMiddleware, deleteWishlist);

export default router;
