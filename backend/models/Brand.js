import mongoose from "mongoose";

const brandSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, unique: true, required: true },
  status: { type: String, enum: ["active", "inactive"], default: "active" },
}, { timestamps: true });

const Brand = mongoose.model("Brand", brandSchema);
export default Brand;
