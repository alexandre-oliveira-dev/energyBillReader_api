import {Request, Response} from "express";
import {FilesService} from "./files.service";
import {s3} from "../aws/s3";

const service = new FilesService();
export class FileResolver {
  async getFiles(req: Request, res: Response) {
    const {userId} = req.params;
    const files = await service.getFiles(userId);
    return res.json(files);
  }

  async delete(req: Request, res: Response) {
    const {fileId} = req.params;
    return res.json(await service.del(fileId));
    /*   .then(async value => {
      console.log("🚀 ~ FileResolver ~ returnawaitservice.del ~ value:", value);
      await s3
        .deleteObject({
          Bucket: "energybillreader",
          Key: `files/${value?.userId}/${value.fileName}`,
        })
        .promise()
        .then(() => {
          return res.status(200).json({message: `pdf: ${value.fileName}`});
        })
        .catch(err => {
          return res.json(err);
        });
    }); */
  }
}
