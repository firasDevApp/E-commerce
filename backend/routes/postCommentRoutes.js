import express from "express";
import { authMiddleware, adminMiddleware } from "../middleware/authMiddleware.js";
import {
    getComments,
    getCommentById,
    createComment,
    updateComment,
    deleteComment
} from "../controllers/postCommentController.js";

const router = express.Router();

// Public
router.get("/", getComments); // récupérer tous les commentaires
router.get("/:id", getCommentById); // récupérer un commentaire spécifique

// User actions
router.post("/:postId", authMiddleware, createComment); // créer un commentaire sur un post
router.put("/:id", authMiddleware, updateComment); // modifier son commentaire
router.delete("/:id", authMiddleware, deleteComment); // supprimer son commentaire

// Admin actions
router.put("/admin/:id", authMiddleware, adminMiddleware, updateComment); // admin peut modifier n'importe quel commentaire
router.delete("/admin/:id", authMiddleware, adminMiddleware, deleteComment); // admin peut supprimer n'importe quel commentaire

export default router;
