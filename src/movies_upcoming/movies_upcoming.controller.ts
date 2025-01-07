import { Controller, Get, Param, Query } from "@nestjs/common"
import { MoviesUpcomingService } from "./movies_upcoming.service"
import { MoviesUpcoming } from "../models/movie_upcoming.schema"

@Controller("movies-upcoming")
export class MoviesUpcomingController {
  constructor(private readonly moviesUpcomingService: MoviesUpcomingService) {}

  @Get()
  async findAll(
    @Query("page") page: number = 1,
    @Query("limit") limit: number = 10
  ): Promise<MoviesUpcoming[]> {
    return this.moviesUpcomingService.findAll(page, limit)
  }

  @Get(":id")
  async findOne(@Param("id") id: string): Promise<MoviesUpcoming> {
    return this.moviesUpcomingService.findOne(id)
  }
}
