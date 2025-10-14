import mongoose from "mongoose";

const shippingSchema = new mongoose.Schema({
  type: { type: String, required: true },
  price: { type: Number, required: true },
  status: { type: String, enum: ["active","inactive"], default: "active" },
}, { timestamps: true });

const Shipping = mongoose.model("Shipping", shippingSchema);
export default Shipping;
