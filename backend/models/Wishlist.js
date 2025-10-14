import mongoose from "mongoose";

const wishlistSchema = new mongoose.Schema({
  product_id: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
  cart_id: { type: mongoose.Schema.Types.ObjectId, ref: "Cart" },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  amount: { type: Number, required: true },
}, { timestamps: true });

const Wishlist = mongoose.model("Wishlist", wishlistSchema);
export default Wishlist;
