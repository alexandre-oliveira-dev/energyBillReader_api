import { Prisma } from "@prisma/client";
import { prismaClient } from "../prisma/prismaClient";

const service = prismaClient
export class FileProcessService{

    async processFile(body:Prisma.InvoiceCreateInput) {
       const res = await service.invoice.create({
            data:body
       })
        return res
    }
    async createFile(body:Prisma.FileCreateInput) {
        await service.file.create({
            data:body
        })
    }
}