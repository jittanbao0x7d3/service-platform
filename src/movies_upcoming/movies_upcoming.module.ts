import { Module } from "@nestjs/common"
import { MongooseModule } from "@nestjs/mongoose"
import { MoviesUpcomingService } from "./movies_upcoming.service"
import { MoviesUpcomingController } from "./movies_upcoming.controller"
import {
  MoviesUpcoming,
  MoviesUpcomingSchema
} from "../models/movie_upcoming.schema"

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: MoviesUpcoming.name, schema: MoviesUpcomingSchema }
    ])
  ],
  controllers: [MoviesUpcomingController],
  providers: [MoviesUpcomingService]
})
export class MoviesUpcomingModule {}
