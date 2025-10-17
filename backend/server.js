import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";

// Routes imports
import authRoutes from "./routes/authRoutes.js";
import userManagementRoutes from "./routes/userManagementRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import brandRoutes from "./routes/brandRoutes.js";
import bannerRoutes from "./routes/bannerRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import postCategoryRoutes from "./routes/postCategoryRoutes.js";
import postTagRoutes from "./routes/postTagRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import wishlistRoutes from "./routes/wishlistRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import shippingRoutes from "./routes/shippingRoutes.js";

import reviewRoutes from "./routes/productReviewRoutes.js";



dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Connexion MongoDB
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => console.error("❌ MongoDB connection failed:", err));

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/users-management", userManagementRoutes);
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/brands", brandRoutes);
app.use("/api/banners", bannerRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/post-categories", postCategoryRoutes);
app.use("/api/post-tags", postTagRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/carts", cartRoutes);
app.use("/api/wishlists", wishlistRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/shippings", shippingRoutes);

app.use("/api/reviews", reviewRoutes);

// Server start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
