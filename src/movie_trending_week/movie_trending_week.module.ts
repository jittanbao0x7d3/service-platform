import { Module } from "@nestjs/common"
import { MongooseModule } from "@nestjs/mongoose"
import { MoviesTrendingWeekService } from "./movie_trending_week.service"
import { MoviesTrendingWeekController } from "./movie_trending_week.controller"
import {
  MoviesTrendingWeek,
  MovieTrendingWeekSchema
} from "../models/movie_trending_week.schema"

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: MoviesTrendingWeek.name, schema: MovieTrendingWeekSchema }
    ])
  ],
  controllers: [MoviesTrendingWeekController],
  providers: [MoviesTrendingWeekService]
})
export class MoviesTrendingWeekModule {}
