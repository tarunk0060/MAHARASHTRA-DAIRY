import mongoose from "mongoose";
import dotenv from "dotenv";
import Admin from "../models/Admin.js";

dotenv.config();

const MONGO_URI =
  process.env.MONGO_URI || "mongodb://127.0.0.1:27017/maharashtra_dairy";

const DEFAULT_ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@maharashtradairy.com";
const DEFAULT_ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "Admin@123456";
const DEFAULT_ADMIN_NAME = process.env.ADMIN_NAME || "Administrator";

async function seedAdmin() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("🔄 Connected to MongoDB");

    const existingAdmin = await Admin.findOne({
      email: DEFAULT_ADMIN_EMAIL.toLowerCase(),
    });

    if (existingAdmin) {
      console.log(`✅ Admin already exists: ${existingAdmin.email}`);
      await mongoose.disconnect();
      return;
    }

    const newAdmin = new Admin({
      name: DEFAULT_ADMIN_NAME,
      email: DEFAULT_ADMIN_EMAIL.toLowerCase(),
      passwordHash: DEFAULT_ADMIN_PASSWORD,
      role: "superadmin",
      isActive: true,
    });

    await newAdmin.save();

    console.log(`✅ Admin created successfully`);
    console.log(`📧 Email: ${newAdmin.email}`);
    console.log(`🔐 Password: ${DEFAULT_ADMIN_PASSWORD}`);
    console.log(`⚠️  Please change the password after first login!`);

    await mongoose.disconnect();
  } catch (err) {
    console.error("❌ Seed failed:", err.message);
    process.exit(1);
  }
}

seedAdmin();
