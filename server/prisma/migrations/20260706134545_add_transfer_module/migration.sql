-- CreateTable
CREATE TABLE "Transfer" (
    "id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "senderName" TEXT NOT NULL,
    "senderEmail" TEXT NOT NULL,
    "receiverName" TEXT,
    "receiverEmail" TEXT NOT NULL,
    "subject" TEXT,
    "message" TEXT,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "expiresAt" TIMESTAMP(3),
    "downloadCount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Transfer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TransferFile" (
    "id" TEXT NOT NULL,
    "transferId" TEXT NOT NULL,
    "fileId" TEXT NOT NULL,

    CONSTRAINT "TransferFile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Transfer_token_key" ON "Transfer"("token");

-- CreateIndex
CREATE UNIQUE INDEX "TransferFile_transferId_fileId_key" ON "TransferFile"("transferId", "fileId");

-- AddForeignKey
ALTER TABLE "TransferFile" ADD CONSTRAINT "TransferFile_transferId_fkey" FOREIGN KEY ("transferId") REFERENCES "Transfer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TransferFile" ADD CONSTRAINT "TransferFile_fileId_fkey" FOREIGN KEY ("fileId") REFERENCES "File"("id") ON DELETE CASCADE ON UPDATE CASCADE;
