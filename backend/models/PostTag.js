import mongoose from "mongoose";

const postTagSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, unique: true, required: true },
  status: { type: String, enum: ["active","inactive"], default: "active" },
}, { timestamps: true });

const PostTag = mongoose.model("PostTag", postTagSchema);
export default PostTag;
