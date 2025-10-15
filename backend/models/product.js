import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: String,
    slug: { type: String, unique: true },
    summary: String,
    description: String,
    photo: String,
    stock: { type: Number, default: 1 },
    size: { type: String, default: "M" },
    condition: { type: String, enum: ["default", "new", "hot"], default: "default" },
    status: { type: String, enum: ["active", "inactive"], default: "inactive" },
    price: Number,
    discount: Number,
    is_featured: { type: Boolean, default: false },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    sub_category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    brand: { type: mongoose.Schema.Types.ObjectId, ref: "Brand" },
  },
  { timestamps: true }
);

productSchema.virtual("reviews", {
  ref: "ProductReview",
  localField: "_id",
  foreignField: "product",
});

export default mongoose.model("Product", productSchema);
