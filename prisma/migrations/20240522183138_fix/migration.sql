-- DropForeignKey
ALTER TABLE "Invoice" DROP CONSTRAINT "Invoice_fileId_fkey";

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES "Invoice"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
