import {prismaClient} from "../prisma/prismaClient";

const service = prismaClient;
export class FilesService {
  async getFiles(userId: string) {
    const res = await service.file.findMany({where: {userId}});
    return res;
    /*  const invoicedata = res.map(async item => {
      await service.invoice
        .findUnique({
          where: {id: item.invoiceId},
        })
        .then(invoice => {
          return invoice;
        });
    });
      console.log("🚀 ~ FilesService ~ invoicedata ~ invoicedata:", invoicedata);
        return {
          file: res,
          invoice: invoicedata[0],
        }; */
  }
}
