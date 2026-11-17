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
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
