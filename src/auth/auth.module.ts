import { Module } from "@nestjs/common"
import { AuthController } from "./auth.controller"
import { AuthService } from "./auth.service"
import { UsersModule } from "../users/users.module"
import { PasswordService } from "./password/password.service"
import { ConfigModule } from "@nestjs/config"
import { jwtConstants } from "./constants"
import { JwtModule } from "@nestjs/jwt"
import { PassportModule } from "@nestjs/passport"
import { LocalStrategy } from "./strategy/local.strategy"

@Module({
  imports: [
    UsersModule,
    ConfigModule,
    PassportModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: {
        expiresIn: jwtConstants.expiration,
        algorithm: "HS256"
      }
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, PasswordService, LocalStrategy]
})
export class AuthModule {}
