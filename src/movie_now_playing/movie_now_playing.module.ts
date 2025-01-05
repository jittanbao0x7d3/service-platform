import { Module } from "@nestjs/common"
import { MongooseModule } from "@nestjs/mongoose"
import { MoviesNowPlayingService } from "./movie_now_playing.service"
import { MoviesNowPlayingController } from "./movie_now_playing.controller"
import {
  MoviesNowPlaying,
  MoviesNowPlayingSchema
} from "../models/movie_now_playing.schema"

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: MoviesNowPlaying.name, schema: MoviesNowPlayingSchema }
    ])
  ],
  controllers: [MoviesNowPlayingController],
  providers: [MoviesNowPlayingService]
})
export class MoviesNowPlayingModule {}
