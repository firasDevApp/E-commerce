import mongoose from "mongoose";

const settingSchema = new mongoose.Schema({
  description: { type: String, required: true },
  short_des: { type: String, required: true },
  logo: { type: String, required: true },
  photo: { type: String, required: true },
  address: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
}, { timestamps: true });

const Setting = mongoose.model("Setting", settingSchema);
export default Setting;
