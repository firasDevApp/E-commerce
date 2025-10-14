import mongoose from "mongoose";

const bannerSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, unique: true, required: true },
  photo: { type: String },
  description: { type: String },
  status: { type: String, enum: ["active","inactive"], default: "inactive" },
}, { timestamps: true });

const Banner = mongoose.model("Banner", bannerSchema);
export default Banner;
