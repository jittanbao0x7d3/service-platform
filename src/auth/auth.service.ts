import { Injectable } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import { Model } from "mongoose"
import { User, UserDocument } from "src/models/user.schema"
import bcrypt from "bcryptjs"
import { JwtService } from "@nestjs/jwt"

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService
  ) {}

  async register(email: string, name: string, password: string): Promise<any> {
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
      email,
      name,
      password: hashedPassword
    })
    await user.save()
    return {
      status: "success",
      message: "User registered successfully"
    }
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user._id }
    return {
      access_token: this.jwtService.sign(payload),
      user: { name: user.name, email: user.email }
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
}
