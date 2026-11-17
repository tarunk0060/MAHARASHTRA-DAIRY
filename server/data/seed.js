import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "../models/Product.js";
import products from "./products.js";

dotenv.config();

const MONGO_URI =
  process.env.MONGO_URI || "mongodb://127.0.0.1:27017/maharashtra_dairy";

try {
  await mongoose.connect(MONGO_URI);
  await Product.deleteMany({});
  await Product.insertMany(products);
  console.log(`✅ Seeded ${products.length} products`);
} catch (err) {
  console.error("❌ Seed failed:", err.message);
} finally {
  await mongoose.disconnect();
}
