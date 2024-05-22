import {prismaClient} from "../prisma/prismaClient";

const service = prismaClient;
export class FilesService {
  async getFiles(userId: string) {
    const res = await service.file.findMany({where: {userId}});

    const data = await Promise.all(
      res.map(async element => {
        const ivoice = await service.invoice.findUnique({
          where: {id: element.invoiceId},
        });

        return {
          ...element,
          invoice: {
            clientNumber: ivoice?.clientNumber,
            monthRef: ivoice?.monthReference,
            total: ivoice?.total,
          },
        };
      })
    );
    return data;
  }

  async del(fileId: string) {
    console.log("🚀 ~ FilesService ~ delete ~ fileId:", fileId);
    return await service.file.delete({where: {id: fileId}});
  }
}
