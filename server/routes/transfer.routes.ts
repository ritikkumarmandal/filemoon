import { Router } from "express";
import transferController from "../controllers/transfer.controller";

const router = Router();

// Create Transfer
router.post("/", transferController.createTransfer);

// Get Transfer Details
router.get("/:token", transferController.getTransfer);

// Download Transfer
router.get(
  "/download/:token",
  transferController.downloadTransfer
);

export default router;