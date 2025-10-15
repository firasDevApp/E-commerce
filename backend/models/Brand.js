import mongoose from "mongoose";

const brandSchema = new mongoose.Schema(
  {
    title: String,
    slug: { type: String, unique: true },
    status: { type: String, enum: ["active", "inactive"], default: "active" },
  },
  { timestamps: true }
);

brandSchema.virtual("products", {
  ref: "Product",
  localField: "_id",
  foreignField: "brand",
});

export default mongoose.model("Brand", brandSchema);
