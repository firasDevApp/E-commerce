import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  product_id: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
  order_id: { type: mongoose.Schema.Types.ObjectId, ref: "Order" },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  price: { type: Number, required: true },
  status: { type: String, enum: ["new","progress","delivered","cancel"], default: "new" },
  quantity: { type: Number, required: true },
  amount: { type: Number, required: true },
}, { timestamps: true });

const Cart = mongoose.model("Cart", cartSchema);
export default Cart;
