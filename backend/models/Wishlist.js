import mongoose from "mongoose";

const wishlistSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    cart: { type: mongoose.Schema.Types.ObjectId, ref: "Cart" },
    price: Number,
    quantity: Number,
    amount: Number,
  },
  { timestamps: true }
);

export default mongoose.model("Wishlist", wishlistSchema);
