import express from "express";
import { verifyAdminToken } from "../middleware/adminAuth.js";
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getDashboardStats,
} from "../controllers/adminProductController.js";

const router = express.Router();

router.use(verifyAdminToken);

router.get("/stats", getDashboardStats);
router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.post("/", createProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

export default router;
