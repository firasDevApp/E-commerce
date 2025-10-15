import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    order_number: { type: String, unique: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    sub_total: Number,
    shipping: { type: mongoose.Schema.Types.ObjectId, ref: "Shipping" },
    total_amount: Number,
    quantity: Number,
    payment_method: { type: String, enum: ["cod", "paypal"], default: "cod" },
    payment_status: { type: String, enum: ["paid", "unpaid"], default: "unpaid" },
    status: { type: String, enum: ["new", "process", "delivered", "cancel"], default: "new" },
    first_name: String,
    last_name: String,
    email: String,
    phone: String,
    country: String,
    post_code: String,
    address1: String,
    address2: String,
  },
  { timestamps: true }
);

orderSchema.virtual("items", {
  ref: "Cart",
  localField: "_id",
  foreignField: "order",
});

export default mongoose.model("Order", orderSchema);
