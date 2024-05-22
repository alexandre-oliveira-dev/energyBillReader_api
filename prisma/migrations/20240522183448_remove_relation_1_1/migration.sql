/*
  Warnings:

  - You are about to drop the column `fileId` on the `Invoice` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "File" DROP CONSTRAINT "File_invoiceId_fkey";

-- DropIndex
DROP INDEX "Invoice_fileId_key";

-- AlterTable
ALTER TABLE "Invoice" DROP COLUMN "fileId";
