import express from "express";
import { authMiddleware, adminMiddleware } from "../middleware/authMiddleware.js";
import {
    getCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory,
    getChildByParent
} from "../controllers/categoryController.js";
import multer from "multer";

const storage = multer.diskStorage({}); // store in temp memory
const upload = multer({ storage });

const router = express.Router();

// Public
router.get("/", getCategories);
router.get("/:id", getCategoryById);

// Admin
router.post("/", upload.single("photo"), createCategory);
router.put("/:id", upload.single("photo"), updateCategory);
router.delete("/:id",  deleteCategory);

// Ajax for sub category
router.post("/:id/child",  getChildByParent);

export default router;
