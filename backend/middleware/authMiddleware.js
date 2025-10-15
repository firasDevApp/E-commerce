import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const authMiddleware = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) return res.status(401).json({ message: "Access denied. No token provided." });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");

    if (!req.user) return res.status(401).json({ message: "Invalid token user not found." });

    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid or expired token." });
  }
};
export const adminMiddleware = (req, res, next) => {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ message: "You do not have permission to access this page." });
  }
  next();
};
export const userMiddleware = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: "Please log in to access this resource." });
  }
  next();
};

export const guestMiddleware = (req, res, next) => {
  if (req.user) {
    return res.status(400).json({ message: "You are already logged in." });
  }
  next();
};


