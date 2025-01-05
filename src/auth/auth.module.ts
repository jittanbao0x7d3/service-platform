import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/guard/jwt.strategy';
import { UserSchema } from 'src/models/user.schema';
import { GoogleStrategy } from '../guard/google.strategy';
import { GoogleAuthGuard } from '../guard/google-auth.guard';
import * as passport from 'passport';
import * as dotenv from 'dotenv';
dotenv.config();

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '60m' },
    }),
    PassportModule.register({ defaultStrategy: 'google', session: true }),
  ],
  providers: [AuthService, JwtStrategy, GoogleStrategy, GoogleAuthGuard],
  controllers: [AuthController],
})
export class AuthModule {
  constructor() {
    passport.serializeUser((user, done) => {
      done(null, user);
    });

    passport.deserializeUser((user, done) => {
      done(null, user);
    });
  }
}
