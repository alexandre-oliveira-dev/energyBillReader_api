import {Request, Response} from "express";
import {InvoiceService} from "./invoices.service";

const service = new InvoiceService();
export class InvoiceResolver {
  async getInvoicesByClientNumber(req: Request, res: Response) {
    const {userId, clientNumber} = req.params;
    const data = await service.getInvoicesByClientNumber(userId, clientNumber);
    return res.status(200).json(data);
  }
  async getInvoices(req: Request, res: Response) {
    const {userId} = req.params;
    const data = await service.getInvoices(userId);
    return res.status(200).json(data);
  }
}
