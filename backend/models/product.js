import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, unique: true, required: true },
  summary: { type: String },
  description: { type: String },
  photo: { type: String },
  stock: { type: Number, default: 1 },
  size: { type: String, default: "M" },
  condition: { type: String, enum: ["default", "new", "hot"], default: "default" },
  status: { type: String, enum: ["active", "inactive"], default: "inactive" },
  price: { type: Number, required: true },
  discount: { type: Number },
  is_featured: { type: Boolean, default: false },
  cat_id: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  child_cat_id: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  brand_id: { type: mongoose.Schema.Types.ObjectId, ref: "Brand" },
}, { timestamps: true });

const Product = mongoose.model("Product", productSchema);
export default Product;
