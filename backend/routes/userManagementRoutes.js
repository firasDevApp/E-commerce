import express from "express";
import { authMiddleware, adminMiddleware } from "../middleware/authMiddleware.js";
import {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/userManagementController.js";
import multer from "multer";

const storage = multer.diskStorage({}); // store in temp memory
const upload = multer({ storage });

const router = express.Router();

// Public or Admin only — à toi de décider
router.get("/", getUsers);
router.get("/:id", getUserById);
router.post("/", upload.single("photo"), createUser);
router.put("/:id", upload.single("photo"), updateUser);
router.delete("/:id", deleteUser);

export default router;
