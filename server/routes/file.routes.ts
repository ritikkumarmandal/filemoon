import { Router } from "express";
import fileController from "../controllers/file.controller";
import upload from "../middleware/upload.middleware";
import { protect } from "../middleware/auth.middleware";

const router = Router();

router.post(
  "/upload",
  protect,
  upload.array("files", 100),
  fileController.upload
);
router.get("/", protect, fileController.getMyFiles);

router.delete("/:id", protect, fileController.deleteFile);

router.post("/share", protect, fileController.createShareLink);

export default router;