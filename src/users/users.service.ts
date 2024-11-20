import { Injectable } from "@nestjs/common"
import { PrismaService } from "../prisma.service"
import { Users } from "@prisma/client"

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async byEmail(email: string): Promise<Users> {
    return this.prisma.users.findFirst({
      where: { email }
    })
  }
}
