import { Module } from "@nestjs/common"
import { AppController } from "./app.controller"
import { AppService } from "./app.service"
import { AuthModule } from "./auth/auth.module"
import { MongooseModule } from "@nestjs/mongoose"
import { ConfigModule } from "@nestjs/config"
import { MoviesModule } from "./movies/movies.module"
import { MovieGenreModule } from "./movie_genre/movie_genre.module"
import { MoviesNowPlayingModule } from "./movie_now_playing/movie_now_playing.module"

@Module({
  imports: [
    MongooseModule.forRoot(process.env.DATABASE_URI),
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true
    }),
    MoviesModule,
    MovieGenreModule,
    MoviesNowPlayingModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
