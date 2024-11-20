import { Injectable } from "@nestjs/common"
import * as bcrypt from "bcrypt"

@Injectable()
export class PasswordService {
  round = 10
  constructor(round?: number) {
    this.round = round
  }

  async hash(password: string): Promise<string> {
    return bcrypt.hash(password, await bcrypt.genSalt(this.round))
  }
  async check(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash)
  }
}
