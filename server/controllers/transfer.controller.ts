import { Request, Response, NextFunction } from "express";
import transferService from "../services/transfer.service";
import mailService from "../services/mail.service";
import AdmZip from "adm-zip";
import path from "path";

class TransferController {
  // Create Transfer
  async createTransfer(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const transfer = await transferService.createTransfer(req.body);

      const downloadLink = `${process.env.CLIENT_URL}/transfer/${transfer.token}`;

      // Receiver Email
      await mailService.sendTransferMail(
        transfer.receiverEmail,
        transfer.senderName,
        transfer.subject || "",
        transfer.message || "",
        downloadLink
      );

      // Sender Confirmation Email
      await mailService.sendConfirmationMail(
        transfer.senderEmail,
        transfer.senderName,
        transfer.receiverEmail,
        downloadLink
      );

      return res.status(201).json({
        success: true,
        data: transfer,
        downloadLink,
      });
    } catch (err) {
      next(err);
    }
  }

  // Get Transfer Details
  async getTransfer(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const transfer = await transferService.getTransfer(
        String(req.params.token)
      );

      return res.json({
        success: true,
        data: transfer,
      });
    } catch (err) {
      next(err);
    }
  }

  // Download ZIP
  async downloadTransfer(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const token = String(req.params.token);

      const transfer = await transferService.getTransfer(token);

      await transferService.increaseDownloadCount(token);

      const zip = new AdmZip();

      for (const item of transfer.files) {
        const file = item.file;

        const filePath = path.join(
          process.cwd(),
          "uploads",
          file.fileName
        );

        zip.addLocalFile(
          filePath,
          "",
          file.originalName
        );
      }

      const zipBuffer = zip.toBuffer();

      res.setHeader(
        "Content-Type",
        "application/zip"
      );

      res.setHeader(
        "Content-Disposition",
        'attachment; filename="FileMoon.zip"'
      );

      return res.send(zipBuffer);
    } catch (err) {
      next(err);
    }
  }
}

export default new TransferController();