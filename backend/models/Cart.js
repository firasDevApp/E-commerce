import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    order: { type: mongoose.Schema.Types.ObjectId, ref: "Order" },
    price: Number,
    status: { type: String, enum: ["new", "progress", "delivered", "cancel"], default: "new" },
    quantity: Number,
    amount: Number,
  },
  { timestamps: true }
);

export default mongoose.model("Cart", cartSchema);
