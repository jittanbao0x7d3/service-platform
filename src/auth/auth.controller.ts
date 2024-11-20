import { Body, Controller, Post } from "@nestjs/common"
import { AuthService } from "./auth.service"
import { LoginDto } from "./dto/login.dto"

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("login")
  login(@Body() login: LoginDto) {
    return this.authService.login(login.username, login.password)
  }
}
