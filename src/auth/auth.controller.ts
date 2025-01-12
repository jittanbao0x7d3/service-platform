import {
  Controller,
  Post,
  Body,
  UseGuards,
  HttpCode,
  HttpStatus,
  Get,
  Req,
  Res,
  Param
} from "@nestjs/common"
import { AuthService } from "./auth.service"
import { JwtAuthGuard } from "src/guard/jwt-auth.guard"
import { GoogleAuthGuard } from "../guard/google-auth.guard"
import { use } from "passport"

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("register")
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() body: any) {
    return this.authService.register(
      body.email,
      body.firstName,
      body.lastName,
      body.password
    )
  }

  @Post("login")
  @HttpCode(HttpStatus.OK)
  async login(@Body() body: any) {
    const user = await this.authService.validateUser(body.email, body.password)
    if (!user) {
      return {
        status: "error",
        message: "Invalid credentials"
      }
    }
    return this.authService.login(user)
  }

  @Post("activate/:token")
  async activateAccount(@Param("token") token: string): Promise<void> {
    await this.authService.activateAccount(token)
  }

  @Post("forgot-password")
  async forgotPassword(@Body("email") email: string): Promise<void> {
    await this.authService.forgotPassword(email)
  }

  @Post("reset-password/:token")
  async resetPassword(
    @Param("token") token: string,
    @Body("newPassword") newPassword: string
  ): Promise<void> {
    await this.authService.resetPassword(token, newPassword)
  }

  @Get("profile/:userId")
  async getProfile(@Param("userId") userId: string): Promise<void> {
    return this.authService.getProfile(userId)
  }

  @Get("google")
  @UseGuards(GoogleAuthGuard)
  async googleAuth(@Req() req) {}

  @Get("google/callback")
  @UseGuards(GoogleAuthGuard)
  async googleAuthRedirect(@Res() res, @Req() req) {
    // Redirect to client URL
    const user = await this.authService.login(req.user)
    res.redirect(`http://localhost:3000/third-party-token/${user.access_token}`)
  }
}
