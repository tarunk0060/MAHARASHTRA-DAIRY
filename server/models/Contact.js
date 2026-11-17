import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, trim: true },
    subject: { type: String, trim: true },
    message: { type: String, required: true, trim: true },
<<<<<<< HEAD
    isRead: { type: Boolean, default: false },
    isResolved: { type: Boolean, default: false },
=======
>>>>>>> 38d7a37777b9d115dc3d5e863763fb47065e9b33
  },
  { timestamps: true }
);

export default mongoose.model("Contact", contactSchema);
