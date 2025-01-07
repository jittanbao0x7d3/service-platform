import { Module } from "@nestjs/common"
import { MongooseModule } from "@nestjs/mongoose"
import { MoviesTrendingDayService } from "./movie_trending_day.service"
import { MoviesTrendingDayController } from "./movie_trending_day.controller"
import {
  MoviesTrendingDay,
  MoviesTrendingDaySchema
} from "../models/movie_trending_day.schema"

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: MoviesTrendingDay.name, schema: MoviesTrendingDaySchema }
    ])
  ],
  controllers: [MoviesTrendingDayController],
  providers: [MoviesTrendingDayService]
})
export class MoviesTrendingDayModule {}
