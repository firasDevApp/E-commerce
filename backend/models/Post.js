import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, unique: true, required: true },
  summary: { type: String, required: true },
  description: { type: String },
  quote: { type: String },
  photo: { type: String },
  tags: { type: String },
  post_cat_id: { type: mongoose.Schema.Types.ObjectId, ref: "PostCategory" },
  post_tag_id: { type: mongoose.Schema.Types.ObjectId, ref: "PostTag" },
  added_by: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  status: { type: String, enum: ["active","inactive"], default: "active" },
}, { timestamps: true });

const Post = mongoose.model("Post", postSchema);
export default Post;
