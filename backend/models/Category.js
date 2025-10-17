import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    title: String,
    slug: { type: String, unique: true },
    summary: String,
    photo: String,
    is_parent: { type: Boolean, default: true },
    parent: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    status: { type: String, enum: ["active", "inactive"], default: "inactive" },
  },
  { timestamps: true }
);

categorySchema.virtual("children", {
  ref: "Category",
  localField: "_id",
  foreignField: "parent",
});

categorySchema.virtual("products", {
  ref: "Product",
  localField: "_id",
  foreignField: "category",
});

export default mongoose.model("Category", categorySchema);
