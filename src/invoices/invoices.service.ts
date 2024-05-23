import {prismaClient} from "../prisma/prismaClient";

const service = prismaClient;

export class InvoiceService {
  async getInvoicesByClientNumber(userId: string, clientNumber: any) {
    if (clientNumber !== undefined || clientNumber !== null) {
      const res = await service.invoice.findMany({
        where: {userId, clientNumber: {equals: clientNumber}},
      });
      return res;
    }
  }
  async getInvoices(userId: string) {
    const res = await service.invoice.findMany({
      where: {userId},
    });
    return res;
  }
  async deleteInvoice(invoiceId: string) {
    const res = await service.invoice.delete({
      where: {id: invoiceId},
    });
    return res;
  }
}
