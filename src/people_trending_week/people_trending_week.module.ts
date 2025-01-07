import { Module } from "@nestjs/common"
import { MongooseModule } from "@nestjs/mongoose"
import { PeopleTrendingWeekService } from "./people_trending_week.service"
import { PeopleTrendingWeekController } from "./people_trending_week.controller"
import {
  PeopleTrendingWeek,
  PeopleTrendingWeekSchema
} from "../models/people_trending_week.schema"

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PeopleTrendingWeek.name, schema: PeopleTrendingWeekSchema }
    ])
  ],
  controllers: [PeopleTrendingWeekController],
  providers: [PeopleTrendingWeekService]
})
export class PeopleTrendingWeekModule {}
