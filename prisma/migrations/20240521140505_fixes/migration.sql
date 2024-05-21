/*
  Warnings:

  - You are about to drop the column `clientName` on the `Invoice` table. All the data in the column will be lost.
  - Added the required column `clientNumber` to the `Invoice` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Invoice" DROP COLUMN "clientName",
ADD COLUMN     "clientNumber" TEXT NOT NULL,
ADD COLUMN     "total" DOUBLE PRECISION NOT NULL DEFAULT 0;
