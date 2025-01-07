import { Controller, Get, Param, Query } from "@nestjs/common"
import { MoviesTrendingWeekService } from "./movie_trending_week.service"
import { MoviesTrendingWeek } from "../models/movie_trending_week.schema"

@Controller("movie-trending-week")
export class MoviesTrendingWeekController {
  constructor(
    private readonly MoviesTrendingWeekService: MoviesTrendingWeekService
  ) {}

  @Get()
  async findAll(
    @Query("page") page: number = 1,
    @Query("limit") limit: number = 10
  ): Promise<MoviesTrendingWeek[]> {
    return this.MoviesTrendingWeekService.findAll(page, limit)
  }

  @Get(":id")
  async findOne(@Param("id") id: string): Promise<MoviesTrendingWeek> {
    return this.MoviesTrendingWeekService.findOne(id)
  }
}
