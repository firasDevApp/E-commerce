import mongoose from "mongoose";

const postCategorySchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, unique: true, required: true },
  status: { type: String, enum: ["active","inactive"], default: "active" },
}, { timestamps: true });

const PostCategory = mongoose.model("PostCategory", postCategorySchema);
export default PostCategory;
