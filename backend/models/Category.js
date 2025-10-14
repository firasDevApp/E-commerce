import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, unique: true, required: true },
  summary: { type: String },
  photo: { type: String },
  is_parent: { type: Boolean, default: true },
  parent_id: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  added_by: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  status: { type: String, enum: ["active", "inactive"], default: "inactive" },
}, { timestamps: true });

const Category = mongoose.model("Category", categorySchema);
export default Category;
