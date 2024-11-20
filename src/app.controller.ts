import { Controller, Get, Logger } from "@nestjs/common"
import { AppService } from "./app.service"

@Controller()
export class AppController {
  private readonly logger = new Logger(AppController.name)

  constructor(private readonly appService: AppService) {}

  @Get()
  ching(): string {
    this.logger.log("hello tui may")
    return this.appService.ching()
  }
}
