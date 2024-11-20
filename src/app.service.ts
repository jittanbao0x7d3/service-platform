import { Injectable } from "@nestjs/common"

@Injectable()
export class AppService {
  ching(): string {
    return "chong"
  }
}
