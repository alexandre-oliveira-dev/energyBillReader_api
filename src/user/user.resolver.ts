import {Request, Response} from "express";
import {UserService} from "./user.service";
import {Prisma} from "@prisma/client";

const service = new UserService();
export class UserResolver {
  async getUser(req: Request, res: Response) {
    try {
      const {userEmail} = req.params;
      const user = await service.getUser(userEmail);
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  async createUser(req: Request, res: Response) {
    try {
      const {body} = req;
      const data = await service.createUser(body);
      return res.status(200).json(data);
    } catch (err) {
      return res.status(500).json(err);
    }
  }
}
