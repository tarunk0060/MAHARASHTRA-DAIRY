import express from "express";
import mongoose from "mongoose";
import Contact from "../models/Contact.js";

const router = express.Router();

// POST /api/contact
router.post("/", async (req, res) => {
  const { name, email, phone, subject, message } = req.body || {};

  if (!name || !email || !message) {
    return res.status(400).json({ message: "Name, email and message are required." });
  }
  if (!/^\S+@\S+\.\S+$/.test(email)) {
    return res.status(400).json({ message: "Please enter a valid email address." });
  }
  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({ message: "Database unavailable. Please call or email us directly." });
  }

  try {
    const saved = await Contact.create({ name, email, phone, subject, message });
    res.status(201).json({ message: "Thank you! We will get back to you soon.", id: saved._id });
  } catch (err) {
    res.status(500).json({ message: "Could not save your message.", error: err.message });
  }
});

// GET /api/contact  (simple admin view of enquiries)
router.get("/", async (req, res) => {
  try {
    const list = await Contact.find().sort({ createdAt: -1 }).limit(100);
    res.json(list);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
