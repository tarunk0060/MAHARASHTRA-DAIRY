import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    marathiName: String,
    category: { type: String, enum: ["milk", "byproduct"], required: true },
    description: String,
    benefits: [String],
    sizes: [String],
    price: String,
    emoji: String,
<<<<<<< HEAD
    available: { type: Boolean, default: true },
=======
>>>>>>> 38d7a37777b9d115dc3d5e863763fb47065e9b33
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
