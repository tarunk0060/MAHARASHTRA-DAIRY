import express from "express";
import mongoose from "mongoose";
import Product from "../models/Product.js";
import products from "../data/products.js";

const router = express.Router();

// GET /api/products?category=milk|byproduct
router.get("/", async (req, res) => {
  const { category } = req.query;
  try {
    if (mongoose.connection.readyState === 1) {
      const filter = category ? { category } : {};
      const items = await Product.find(filter).sort({ createdAt: 1 });
      if (items.length) return res.json(items);
    }
    // Fallback to built-in data if DB is empty or offline
    const list = category ? products.filter((p) => p.category === category) : products;
    res.json(list);
  } catch (err) {
    res.status(500).json({ message: "Could not load products", error: err.message });
  }
});

export default router;
