import { Module } from "@nestjs/common"
import { MongooseModule } from "@nestjs/mongoose"
import { MoviesTopRatedService } from "./movie_top_rated.service"
import { MoviesTopRatedController } from "./movie_top_rated.controller"
import {
  MoviesTopRated,
  MoviesTopRatedSchema
} from "../models/movie_top_rated.schema"

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: MoviesTopRated.name, schema: MoviesTopRatedSchema }
    ])
  ],
  controllers: [MoviesTopRatedController],
  providers: [MoviesTopRatedService]
})
export class MoviesTopRatedModule {}
