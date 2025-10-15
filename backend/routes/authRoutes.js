import express from "express";
import {
    login,
    register,
    logout,
    socialLoginRedirect,
    socialLoginCallback,
    resetPassword
} from "../controllers/authController.js";

const router = express.Router();

// Auth
router.post("/login", login);
router.post("/register", register);
router.post("/logout", logout);

// Social login
router.get("/login/:provider", socialLoginRedirect);
router.get("/login/:provider/callback", socialLoginCallback);

// Reset password
router.post("/password-reset", resetPassword);

export default router;
