import express from "express";
import { verifyAdminToken } from "../middleware/adminAuth.js";
import {
  getAllContacts,
  getContactById,
  updateContact,
  deleteContact,
  getContactStats,
} from "../controllers/adminContactController.js";

const router = express.Router();

router.use(verifyAdminToken);

router.get("/stats", getContactStats);
router.get("/", getAllContacts);
router.get("/:id", getContactById);
router.patch("/:id", updateContact);
router.delete("/:id", deleteContact);

export default router;
