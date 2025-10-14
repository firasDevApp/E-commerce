import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  order_number: { type: String, unique: true, required: true },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  sub_total: { type: Number, required: true },
  shipping_id: { type: mongoose.Schema.Types.ObjectId, ref: "Shipping" },
  coupon: { type: Number },
  total_amount: { type: Number, required: true },
  quantity: { type: Number, required: true },
  payment_method: { type: String, enum: ["cod","paypal"], default: "cod" },
  payment_status: { type: String, enum: ["paid","unpaid"], default: "unpaid" },
  status: { type: String, enum: ["new","process","delivered","cancel"], default: "new" },
  first_name: String,
  last_name: String,
  email: String,
  phone: String,
  country: String,
  post_code: String,
  address1: String,
  address2: String,
}, { timestamps: true });

const Order = mongoose.model("Order", orderSchema);
export default Order;
