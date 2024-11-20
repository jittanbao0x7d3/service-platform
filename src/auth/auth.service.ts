import { Injectable, UnauthorizedException } from "@nestjs/common"
import { UsersService } from "../users/users.service"
import { JwtService } from "@nestjs/jwt"
import { PasswordService } from "./password/password.service"

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly passwordService: PasswordService
  ) {}

  async login(email: string, pass: string): Promise<any> {
    const user = await this.usersService.byEmail(email)
    const isAuthorized = await this.passwordService.check(pass, user.password)
    if (!isAuthorized) {
      throw new UnauthorizedException()
    }
    const payload = {
      identity: user.email
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userInfor } = user

    return {
      accessToken: this.jwtService.sign(payload),
      user: userInfor
    }
  }
}
