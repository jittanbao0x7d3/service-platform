import { Module } from "@nestjs/common"
import { MongooseModule } from "@nestjs/mongoose"
import { MovieGenreService } from "./movie_genre.service"
import { MovieGenreController } from "./movie_genre.controller"
import { MovieGenre, MovieGenreSchema } from "../models/movie_genre.schema"

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: MovieGenre.name, schema: MovieGenreSchema }
    ])
  ],
  controllers: [MovieGenreController],
  providers: [MovieGenreService]
})
export class MovieGenreModule {}
