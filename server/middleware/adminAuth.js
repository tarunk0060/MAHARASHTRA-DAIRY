import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "maharashtra-dairy-secret-key-change-in-production";

export const verifyAdminToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.adminId = decoded.id;
    req.adminEmail = decoded.email;
    req.adminRole = decoded.role;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

export const generateToken = (admin) => {
  return jwt.sign(
    { id: admin._id, email: admin.email, role: admin.role },
    JWT_SECRET,
    { expiresIn: "24h" }
  );
};

export { JWT_SECRET };
