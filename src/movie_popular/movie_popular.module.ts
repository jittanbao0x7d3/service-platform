import { Module } from "@nestjs/common"
import { MongooseModule } from "@nestjs/mongoose"
import { MoviesPopularService } from "./movie_popular.service"
import { MoviesPopularController } from "./movie_popular.controller"
import {
  MoviesPopular,
  MoviesPopularSchema
} from "../models/movie_popular.schema"

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: MoviesPopular.name, schema: MoviesPopularSchema }
    ])
  ],
  controllers: [MoviesPopularController],
  providers: [MoviesPopularService]
})
export class MoviesPopularModule {}
