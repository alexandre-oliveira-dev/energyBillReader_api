import {Prisma} from "@prisma/client";
import {prismaClient} from "../prisma/prismaClient";

const service = prismaClient;
export class UserService {
  async getUser(userEmail: string) {
    const res = await service.user.findUnique({
      where: {email: userEmail},
      include: {Invoice: true},
    });
    return res;
  }

  async createUser(body: Prisma.UserCreateInput) {
    const res = await service.user.create({
      data: body,
    });
    return res;
  }
}
