import express from "express";
import { authMiddleware, adminMiddleware } from "../middleware/authMiddleware.js";
import {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
} from "../controllers/productController.js";
import multer from "multer";

const storage = multer.diskStorage({}); // store in temp memory
const upload = multer({ storage });

const router = express.Router();

// Public
router.get("/", getProducts);
router.get("/:id", getProductById);

// Admin
router.post("/", upload.array("photos", 5), createProduct);
router.put("/:id",  upload.array("photos", 5), updateProduct);
router.delete("/:id", deleteProduct);

export default router;
