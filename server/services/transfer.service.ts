import prisma from "../lib/prisma";
import crypto from "crypto";

interface CreateTransferInput {
  senderName: string;
  senderEmail: string;
  receiverName?: string;
  receiverEmail: string;
  subject?: string;
  message?: string;
  fileIds: string[];
  expiresInHours?: number;
}

class TransferService {
  async createTransfer(data: CreateTransferInput) {
    const {
      senderName,
      senderEmail,
      receiverName,
      receiverEmail,
      subject,
      message,
      fileIds,
      expiresInHours,
    } = data;

    // Check all files exist
    const files = await prisma.file.findMany({
      where: {
        id: {
          in: fileIds,
        },
        isDeleted: false,
      },
    });

    if (files.length !== fileIds.length) {
      throw new Error("One or more files not found");
    }

    const token = crypto.randomBytes(24).toString("hex");

    const expiresAt = expiresInHours
      ? new Date(Date.now() + expiresInHours * 60 * 60 * 1000)
      : null;

    const transfer = await prisma.transfer.create({
      data: {
        token,
        senderName,
        senderEmail,
        receiverName,
        receiverEmail,
        subject,
        message,
        expiresAt,

        files: {
          create: fileIds.map((fileId) => ({
            file: {
              connect: {
                id: fileId,
              },
            },
          })),
        },
      },
      include: {
        files: {
          include: {
            file: true,
          },
        },
      },
    });

    return transfer;
  }

  async getTransfer(token: string) {
    const transfer = await prisma.transfer.findUnique({
      where: {
        token,
      },
      include: {
        files: {
          include: {
            file: true,
          },
        },
      },
    });

    if (!transfer) {
      throw new Error("Transfer not found");
    }

    if (
      transfer.expiresAt &&
      transfer.expiresAt < new Date()
    ) {
      throw new Error("Transfer expired");
    }

    return transfer;
  }

  async increaseDownloadCount(token: string) {
    return prisma.transfer.update({
      where: {
        token,
      },
      data: {
        downloadCount: {
          increment: 1,
        },
      },
    });
  }
}

export default new TransferService();