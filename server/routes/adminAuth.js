import express from "express";
import rateLimit from "express-rate-limit";
import { loginAdmin, getAdminProfile, logoutAdmin } from "../controllers/adminAuthController.js";
import { verifyAdminToken } from "../middleware/adminAuth.js";

const router = express.Router();

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: "Too many login attempts, please try again later.",
  standardHeaders: true,
  legacyHeaders: false,
});

router.post("/login", loginLimiter, loginAdmin);
router.get("/me", verifyAdminToken, getAdminProfile);
router.post("/logout", verifyAdminToken, logoutAdmin);

export default router;
