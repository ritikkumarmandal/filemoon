import { Request, Response, NextFunction } from "express";
import fileService from "../services/file.service";

class FileController {
  async upload(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.file) throw new Error("No file uploaded");

      const file = await fileService.upload(req.file, req.user!.id);

      res.json({ success: true, data: file });
    } catch (err) {
      next(err);
    }
  }

  async getMyFiles(req: Request, res: Response, next: NextFunction) {
    try {
      const files = await fileService.getUserFiles(req.user!.id);
      res.json({ success: true, data: files });
    } catch (err) {
      next(err);
    }
  }

  async deleteFile(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await fileService.deleteFile(
  req.params.id as string,
  req.user!.id
);
      res.json({ success: true, data: result });
    } catch (err) {
      next(err);
    }
  }

  // 🔥 NEW: Create Share Link
  async createShareLink(req: Request, res: Response, next: NextFunction) {
    try {
      const { fileId, expiresInHours } = req.body;

      const share = await fileService.createShareLink(
        fileId,
        req.user!.id,
        expiresInHours
      );

      res.json({
        success: true,
        shareUrl: `${process.env.BASE_URL}/api/files/share/${share.token}`,
      });
    } catch (err) {
      next(err);
    }
  }
}

export default new FileController();