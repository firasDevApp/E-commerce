import mongoose from "mongoose";

const postCommentSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  post_id: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
  comment: { type: String, required: true },
  status: { type: String, enum: ["active","inactive"], default: "active" },
  replied_comment: { type: String },
  parent_id: { type: mongoose.Schema.Types.ObjectId, ref: "PostComment" },
}, { timestamps: true });

const PostComment = mongoose.model("PostComment", postCommentSchema);
export default PostComment;
