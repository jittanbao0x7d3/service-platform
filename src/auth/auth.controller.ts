import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Req,
  Res,
  UseGuards
} from "@nestjs/common"
import { AuthService } from "./auth.service"
import { GoogleAuthGuard } from "../guard/google-auth.guard"

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
  @HttpCode(HttpStatus.OK)
  async activateAccount(
    @Param("token") token: string
  ): Promise<{ message: string }> {
    await this.authService.activateAccount(token)

    return {
      message: "Your account has been successfully activated!"
    }
  }

  @Post("forgot-password")
  @HttpCode(HttpStatus.OK)
  async forgotPassword(
    @Body("email") email: string
  ): Promise<{ message: string }> {
    await this.authService.forgotPassword(email)

    return {
      message: "A password reset link has been sent to your email."
    }
  }

  @Post("reset-password/:token")
  @HttpCode(HttpStatus.OK)
  async resetPassword(
    @Param("token") token: string,
    @Body("newPassword") newPassword: string
  ): Promise<{ message: string }> {
    await this.authService.resetPassword(token, newPassword)

    return {
      message: "Your password has been successfully reset. You can now log in."
    }
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
    res.redirect(
      `${process.env.FRONTEND_URL}/third-party-token/${user.access_token}`
    )
  }
}
