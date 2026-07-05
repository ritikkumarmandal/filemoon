import prisma from "../lib/prisma";
import crypto from "crypto";

class FileService {
  async upload(file: Express.Multer.File, userId: string) {
    return prisma.file.create({
      data: {
        fileName: file.filename,
        originalName: file.originalname,
        fileType: file.mimetype,
        fileSize: file.size,
        storageKey: file.filename,
        fileUrl: `/uploads/${file.filename}`,
        uploadedById: userId,
      },
    });
  }

  async getUserFiles(userId: string) {
    return prisma.file.findMany({
      where: {
        uploadedById: userId,
        isDeleted: false,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  // ✅ NEW: Soft Delete File
  async deleteFile(fileId: string, userId: string) {
    const file = await prisma.file.findUnique({
      where: { id: fileId },
    });

    if (!file) {
      throw new Error("File not found");
    }

    if (file.uploadedById !== userId) {
      throw new Error("Unauthorized to delete this file");
    }

    return prisma.file.update({
      where: { id: fileId },
      data: {
        isDeleted: true,
      },
    });
  }
  // 🔥 NEW: Create Share Link
  async createShareLink(fileId: string, userId: string, expiresInHours?: number) {
    const file = await prisma.file.findUnique({
      where: { id: fileId },
    });

    if (!file) throw new Error("File not found");
    if (file.uploadedById !== userId) throw new Error("Unauthorized");

    const token = crypto.randomBytes(24).toString("hex");

    const expiresAt = expiresInHours
      ? new Date(Date.now() + expiresInHours * 60 * 60 * 1000)
      : null;

    return prisma.sharedFile.create({
      data: {
        token,
        fileId,
        expiresAt,
      },
    });
  }

  // 🔥 NEW: Get File by Share Token (Public)
  async getSharedFile(token: string) {
    const shared = await prisma.sharedFile.findUnique({
      where: { token },
      include: { file: true },
    });

    if (!shared) throw new Error("Invalid link");

    if (shared.expiresAt && shared.expiresAt < new Date()) {
      throw new Error("Link expired");
    }

    if (shared.file.isDeleted) {
      throw new Error("File not available");
    }

    // increment downloads
    await prisma.sharedFile.update({
      where: { token },
      data: {
        downloads: { increment: 1 },
      },
    });

    return shared.file;
  }

}

export default new FileService();