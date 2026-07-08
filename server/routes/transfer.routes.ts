import { Router } from "express";
import transferController from "../controllers/transfer.controller";

const router = Router();

// Create Transfer
router.post("/", transferController.createTransfer);

// Get Transfer Details
router.get(
  "/download/:token",
  transferController.downloadTransfer
);

router.get(
  "/:token",
  transferController.getTransfer
);

export default router;