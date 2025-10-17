import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, sparse: true },
  password: { type: String },
  photo: { type: String },
  role: { type: String, enum: ["admin", "user"], default: "user" },
  status: { type: String, enum: ["active", "inactive"], default: "active" },
}, { timestamps: true });

const User = mongoose.model("User", userSchema);
export default User;
