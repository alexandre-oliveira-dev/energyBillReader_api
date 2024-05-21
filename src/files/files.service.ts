import { prismaClient } from "../prisma/prismaClient";


const service = prismaClient
export class FilesService{

    async getFiles(userId:string) {
        const res = await service.file.findMany({where:{userId}})
        return res
    }
}