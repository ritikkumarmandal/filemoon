import { Router } from "express";
import fileService from "../services/file.service";

const router = Router();

router.get("/share/:token", async (req, res) => {
  try {
    const file = await fileService.getSharedFile(req.params.token);

    return res.download(
      file.fileUrl.replace("/uploads/", "uploads/")
    );
  } catch (err: any) {
    return res.status(400).json({ success: false, message: err.message });
  }
});

export default router;