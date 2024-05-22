import {prismaClient} from "../prisma/prismaClient";

const service = prismaClient;

export class InvoiceService {
  async getInvoicesByClientNumber(userId: string, clientNumber: string) {
    const res = await service.invoice.findMany({
      where: {userId, clientNumber},
    });
    return res;
  }
  async getInvoices(userId: string) {
    const res = await service.invoice.findMany({
      where: {userId},
    });
    return res;
  }
}
