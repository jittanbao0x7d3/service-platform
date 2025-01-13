import { Injectable } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import { Model } from "mongoose"
import { User, UserDocument } from "src/models/user.schema"
import bcrypt from "bcryptjs"
import { JwtService } from "@nestjs/jwt"
import { MailService } from "./mail.service"
import { randomBytes } from "crypto"

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
    private mailService: MailService
  ) {}

  async register(
    email: string,
    firstName: string,
    lastName: string,
    password: string
  ): Promise<any> {
    // Check if user already exists
    const userExists = await this.userModel
      .findOne({ email })
      .exec()
      .then((user) => !!user)
    if (userExists) {
      return {
        status: "error",
        message: "User already exists"
      }
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const user = new this.userModel({
      firstName,
      lastName,
      email,
      password: hashedPassword
    })
    await user.save()

    const token = this.jwtService.sign({ email })
    const url = `${process.env.FRONTEND_URL}/activate/${token}`
    await this.mailService.sendMail({
      to: email,
      subject: "Account Activation",
      text: `Click the link to activate your account: ${url}`
    })

    return {
      status: "success",
      message: "User registered successfully"
    }
  }

  async activateAccount(token: string): Promise<void> {
    const { email } = this.jwtService.verify(token)
    const user = await this.userModel.findOne({ email })
    if (user) {
      user.isActive = true
      await user.save()
    }
  }

  async forgotPassword(email: string): Promise<void> {
    const user = await this.userModel.findOne({ email })
    if (user) {
      const token = this.jwtService.sign({ email })
      user.resetPasswordToken = token
      user.resetPasswordExpires = new Date(Date.now() + 3600000) // 1 hour
      await user.save()

      const url = `${process.env.FRONTEND_URL}/reset-password/${token}`

      await this.mailService.sendMail({
        to: email,
        subject: "Password Reset",
        text: `Click the link to reset your password: ${url}`
      })
    }
  }

  async resetPassword(token: string, newPassword: string): Promise<void> {
    const { email } = this.jwtService.verify(token)
    const user = await this.userModel.findOne({
      email,
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: new Date() }
    })

    if (user) {
      user.password = await bcrypt.hash(newPassword, 10)
      user.resetPasswordToken = null
      user.resetPasswordExpires = null
      await user.save()
    }
  }

  async login(user: any) {
    // Login with Google
    const existedUser = await this.userModel
      .findOne({ email: user.email })
      .exec()

    if (!existedUser && user.accessToken) {
      const newUser = new this.userModel({
        firstName: user.name.givenName,
        lastName: user.name.familyName,
        email: user.email,
        password: await bcrypt.hash(randomBytes(16).toString("hex"), 10),
        isActive: true
      })
      await newUser.save()
      user = newUser
    }

    const payload = { email: user.email, sub: user._id }
    return {
      access_token: this.jwtService.sign(payload),
      user: !existedUser ? user : existedUser
    }
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userModel.findOne({ email }).exec()
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user.toObject()
      return result
    }
    return null
  }

  async getProfile(email: string): Promise<any> {
    const user = await this.userModel.findOne({ email: email }).exec()
    if (!user) {
      return null
    }
    const result = {
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      isActive: user.isActive
    }
    console.log(result)
    return result
  }
}
