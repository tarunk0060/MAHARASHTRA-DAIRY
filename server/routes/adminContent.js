import express from "express";
import { verifyAdminToken } from "../middleware/adminAuth.js";
import {
  getContentBySection,
  getAllContent,
  updateContent,
} from "../controllers/adminContentController.js";

const router = express.Router();

router.use(verifyAdminToken);

router.get("/", getAllContent);
router.get("/:section", getContentBySection);
router.put("/:section", updateContent);

export default router;
