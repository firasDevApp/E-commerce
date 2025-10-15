import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: String,
    slug: { type: String, unique: true },
    summary: String,
    description: String,
    quote: String,
    photo: String,
    tags: String,
    post_cat: { type: mongoose.Schema.Types.ObjectId, ref: "PostCategory" },
    post_tag: { type: mongoose.Schema.Types.ObjectId, ref: "PostTag" },
    added_by: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    status: { type: String, enum: ["active", "inactive"], default: "active" },
  },
  { timestamps: true }
);

postSchema.virtual("comments", {
  ref: "PostComment",
  localField: "_id",
  foreignField: "post",
});

export default mongoose.model("Post", postSchema);
