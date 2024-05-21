import { Prisma } from "@prisma/client";
import { prismaClient } from "../prisma/prismaClient";



const service = prismaClient
export class FileProcessService{

    async processFile(body:Prisma.InvoiceCreateInput) {
        console.log("🚀 ~ FileProcessService ~ processFile ~ body:", body)
       const res = await service.invoice.create({
            data:body
       })
        return res
    }
    async createFile(body:Prisma.FileCreateInput) {
        console.log("🚀 ~ FileProcessService ~ processFile ~ body:", body)
        await service.file.create({
            data:body
        })
    }
}