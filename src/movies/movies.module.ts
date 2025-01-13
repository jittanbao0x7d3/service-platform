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
import { HttpModule } from "@nestjs/axios"
import { People, PeopleSchema } from "../models/people.schema"
import { PeopleService } from "../people/people.service"

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Movie.name, schema: MovieSchema },
      { name: MoviesPopular.name, schema: MoviesPopularSchema },
      { name: MoviesTrendingDay.name, schema: MoviesTrendingDaySchema },
      { name: MoviesTrendingWeek.name, schema: MovieTrendingWeekSchema },
      { name: MoviesTopRated.name, schema: MoviesTopRatedSchema },
      { name: MoviesUpcoming.name, schema: MoviesUpcomingSchema },
      { name: People.name, schema: PeopleSchema }
    ]),
    HttpModule.register({
      timeout: 10000,
      maxRedirects: 5
    })
  ],
  controllers: [MoviesController],
  providers: [MoviesService, PeopleService]
})
export class MoviesModule {}
