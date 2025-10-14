import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  subject: { type: String, required: true },
  email: { type: String, required: true },
  photo: { type: String },
  phone: { type: String },
  message: { type: String, required: true },
  read_at: { type: Date },
}, { timestamps: true });

const Message = mongoose.model("Message", messageSchema);
export default Message;
