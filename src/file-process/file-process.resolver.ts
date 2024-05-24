import {Request, Response} from "express";
import {FileProcessService} from "./file-process.service";
import pdf from "pdf-parse";
import {s3} from "../aws/s3";

const service = new FileProcessService();
export class FileProcessResolver {
  async fileProcess(req: Request, res: Response) {
    const {file, params} = req;
    const fileName = file?.originalname;
    const userId = params.userId;

    if (file?.buffer) {
      pdf(file.buffer).then(async data => {
        const lines = data.text.split("\n").map((item, index) => ({
          line: index + 1,
          content: item.trim(),
        }));
        //N° cliente
        const refIndexnumberClient = lines.find(line =>
          line.content.includes("Nº DO CLIENTE")
        )?.line;
        const numberClient =
          refIndexnumberClient &&
          lines[
            lines.findIndex(i => i.line === refIndexnumberClient) + 1
          ].content.split(/\s+/)[0];

        //Month reference
        const refIndexMonthReference = lines.find(line =>
          line.content.includes("Referente a")
        )?.line;
        const monthReference =
          refIndexMonthReference &&
          lines[
            lines.findIndex(i => i.line === refIndexMonthReference) + 1
          ].content.split(/\s+/)[0];

        //eeQtd
        const refIndexEeQtd = lines.find(line =>
          line.content.includes("Energia ElétricakWh")
        )?.line;
        const eeQtd =
          refIndexEeQtd &&
          lines[lines.findIndex(i => i.line === refIndexEeQtd)].content.split(
            /\s+/
          )[2];
        const eeValue =
          refIndexEeQtd &&
          lines[lines.findIndex(i => i.line === refIndexEeQtd)].content.split(
            /\s+/
          )[4];

        //es
        const refIndexEs = lines
          .find(line => line.content.includes("Energia SCEE"))
          ?.content.split("kWh")[1];
        const esQtd = refIndexEs?.trim().split(/\s+/)[0];
        const esValue = refIndexEs?.trim().split(/\s+/)[2];

        //ec
        const refIndexEc = lines
          .find(line => line.content.includes("Energia compensada GD IkWh"))
          ?.content.split("Energia compensada GD IkWh")[1];
        const ecQtd = refIndexEc && refIndexEc?.trim()?.split(/\s+/)[0];
        const ecValue = refIndexEc?.trim().split(/\s+/)[2];

        //contr.publica municipal
        const refIndexCPM = lines
          .find(line => line.content.includes("Contrib Ilum Publica Municipal"))
          ?.content.split("Contrib Ilum Publica Municipal")[1];

        //total
        const refIndexTotal = lines
          .find(line => line.content.includes("TOTAL"))
          ?.content.split("TOTAL")[1];

        const insert = await Promise.all([
          service
            .processFile({
              clientNumber: String(numberClient),
              monthReference: String(monthReference),
              esQtd: Number(esQtd) || 0,
              esValue: String(esValue) || "0",
              ecQtd: Number(ecQtd) || 0,
              ecValue: String(ecValue) || "0",
              eeQtd: Number(eeQtd) || 0,
              eeValue: String(eeValue) || "0",
              contrPubMunicipalValue: String(refIndexCPM),
              total: refIndexTotal,
              user: {connect: {id: userId}},
            })
            .then(async data => {
              s3.upload({
                Bucket: "energybillreader",
                Key: `files/${data?.userId}/${file.originalname}`,
                ContentType: file.mimetype,
                Body: file.buffer,
                ACL: "public-read",
              })
                .promise()
                .then(async val => {
                  await service.createFile({
                    fileName: String(fileName),
                    patch: String(fileName),
                    url: val.Location,
                    invoiceId: data.id,
                    user: {
                      connect: {
                        id: data.userId,
                      },
                    },
                  });
                })
                .catch(err => console.log(err));
            }),
        ]);
        return res.status(200).json(insert);
      });
    }
  }
}
