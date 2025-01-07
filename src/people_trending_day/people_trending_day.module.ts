import { Module } from "@nestjs/common"
import { MongooseModule } from "@nestjs/mongoose"
import { PeopleTrendingDayService } from "./people_trending_day.service"
import { PeopleTrendingDayController } from "./people_trending_day.controller"
import {
  PeopleTrendingDay,
  PeopleTrendingDaySchema
} from "../models/people_trending_day.schema"

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PeopleTrendingDay.name, schema: PeopleTrendingDaySchema }
    ])
  ],
  controllers: [PeopleTrendingDayController],
  providers: [PeopleTrendingDayService]
})
export class PeopleTrendingDayModule {}
