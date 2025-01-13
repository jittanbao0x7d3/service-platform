import { Module } from "@nestjs/common"
import { MongooseModule } from "@nestjs/mongoose"
import { MoviesService } from "./movies.service"
import { MoviesController } from "./movies.controller"
import { Movie, MovieSchema } from "../models/movie.schema"
import {
  MoviesPopular,
  MoviesPopularSchema
} from "../models/movie_popular.schema"
import {
  MoviesTrendingWeek,
  MovieTrendingWeekSchema
} from "../models/movie_trending_week.schema"
import {
  MoviesTrendingDay,
  MoviesTrendingDaySchema
} from "../models/movie_trending_day.schema"
import {
  MoviesTopRated,
  MoviesTopRatedSchema
} from "../models/movie_top_rated.schema"
import {
  MoviesUpcoming,
  MoviesUpcomingSchema
} from "../models/movie_upcoming.schema"

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Movie.name, schema: MovieSchema },
      { name: MoviesPopular.name, schema: MoviesPopularSchema },
      { name: MoviesTrendingDay.name, schema: MoviesTrendingDaySchema },
      { name: MoviesTrendingWeek.name, schema: MovieTrendingWeekSchema },
      { name: MoviesTopRated.name, schema: MoviesTopRatedSchema },
      { name: MoviesUpcoming.name, schema: MoviesUpcomingSchema }
    ])
  ],
  controllers: [MoviesController],
  providers: [MoviesService]
})
export class MoviesModule {}
