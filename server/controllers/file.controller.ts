import { Request, Response, NextFunction } from "express";
import fileService from "../services/file.service";

class FileController {
  async upload(req: Request, res: Response, next: NextFunction) {
  try {

     console.log("BODY:", req.body);
    console.log("FILES:", req.files);

    const files = req.files as Express.Multer.File[];

    if (!files || files.length === 0) {
      throw new Error("No files uploaded");
    }

    const uploadedFiles = await Promise.all(
      files.map((file) =>
        fileService.upload(file, req.user!.id)
      )
    );

    return res.status(201).json({
      success: true,
      data: uploadedFiles,
    });
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