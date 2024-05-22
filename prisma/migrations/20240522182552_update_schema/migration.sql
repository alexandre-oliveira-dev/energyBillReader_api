/*
  Warnings:

  - A unique constraint covering the columns `[fileId]` on the table `Invoice` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `fileId` to the `Invoice` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Invoice" ADD COLUMN     "fileId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Invoice_fileId_key" ON "Invoice"("fileId");

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_fileId_fkey" FOREIGN KEY ("fileId") REFERENCES "File"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
