import Admin from "../models/Admin.js";
import { generateToken } from "../middleware/adminAuth.js";

export const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required." });
  }

  try {
    const admin = await Admin.findOne({ email: email.toLowerCase() });

    if (!admin || !admin.isActive) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    const isPasswordValid = await admin.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    const token = generateToken(admin);
    res.json({
      message: "Login successful",
      token,
      admin: admin.toJSON(),
    });
  } catch (err) {
    res.status(500).json({ message: "Login failed", error: err.message });
  }
};

export const getAdminProfile = async (req, res) => {
  try {
    const admin = await Admin.findById(req.adminId);
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }
    res.json(admin.toJSON());
  } catch (err) {
    res.status(500).json({ message: "Could not fetch profile", error: err.message });
  }
};

export const logoutAdmin = (req, res) => {
  res.json({ message: "Logout successful" });
};
