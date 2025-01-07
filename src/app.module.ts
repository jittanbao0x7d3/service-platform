import { Module } from "@nestjs/common"
import { AppController } from "./app.controller"
import { AppService } from "./app.service"
import { AuthModule } from "./auth/auth.module"
import { MongooseModule } from "@nestjs/mongoose"
import { ConfigModule } from "@nestjs/config"
import { MoviesModule } from "./movies/movies.module"
import { MovieGenreModule } from "./movie_genre/movie_genre.module"
import { MoviesNowPlayingModule } from "./movie_now_playing/movie_now_playing.module"
import { MoviesPopularModule } from "./movie_popular/movie_popular.module"
import { MoviesTopRatedModule } from "./movie_top_rated/movie_top_rated.module"
import { MoviesTrendingDayModule } from "./movie_trending_day/movie_trending_day.module"
import { MoviesTrendingWeekModule } from "./movie_trending_week/movie_trending_week.module"
import { MoviesUpcomingModule } from "./movie_upcoming/movie_upcoming.module"
import { PeopleModule } from "./people/people.module"

@Module({
  imports: [
    MongooseModule.forRoot(process.env.DATABASE_URI),
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true
    }),
    MoviesModule,
    MovieGenreModule,
    MoviesNowPlayingModule,
    MoviesPopularModule,
    MoviesTopRatedModule,
    MoviesTrendingDayModule,
    MoviesTrendingWeekModule,
    MoviesUpcomingModule,
    PeopleModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
