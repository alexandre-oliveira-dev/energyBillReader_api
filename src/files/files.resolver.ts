import { Request, Response } from "express"
import { FilesService } from "./files.service"


const service = new FilesService()
export class FileResolver{
  async getFiles(req: Request, res: Response) {
        const {userId} = req.params
      const files = await service.getFiles(userId)
      return res.json(files)
    }
}