import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import productRoutes from "./routes/products.js";
import contactRoutes from "./routes/contact.js";
import adminAuthRoutes from "./routes/adminAuth.js";
import adminProductRoutes from "./routes/adminProducts.js";
import adminContactRoutes from "./routes/adminContacts.js";
import adminContentRoutes from "./routes/adminContent.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5002;
const MONGO_URI =
  process.env.MONGO_URI || "mongodb://127.0.0.1:27017/maharashtra_dairy";

app.use(cors({ origin: process.env.CLIENT_URL || "*" }));
app.use(express.json());

app.get("/api/health", (req, res) =>
  res.json({ status: "ok", db: mongoose.connection.readyState === 1 })
);

app.use("/api/products", productRoutes);
app.use("/api/contact", contactRoutes);

// Admin routes
app.use("/api/admin/auth", adminAuthRoutes);
app.use("/api/admin/products", adminProductRoutes);
app.use("/api/admin/contacts", adminContactRoutes);
app.use("/api/admin/content", adminContentRoutes);

// Serve the built React app in production
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const clientDist = path.join(__dirname, "../client/dist");
app.use(express.static(clientDist));
app.get(/^\/(?!api).*/, (req, res) =>
  res.sendFile(path.join(clientDist, "index.html"), (err) => {
    if (err) res.status(404).send("Build the client first: cd client && npm run build");
  })
);

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err.message));

app.listen(PORT, () =>
  console.log(`🐄 Maharashtra Dairy API running on http://localhost:${PORT}`)
);
