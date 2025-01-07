import { Controller, Get, Param, Query } from "@nestjs/common"
import { MoviesTrendingDayService } from "./movie_trending_day.service"
import { MoviesTrendingDay } from "../models/movie_trending_day.schema"

@Controller("movies-trending-day")
export class MoviesTrendingDayController {
  constructor(
    private readonly moviesTrendingDayService: MoviesTrendingDayService
  ) {}

  @Get()
  async findAll(
    @Query("page") page: number = 1,
    @Query("limit") limit: number = 10
  ): Promise<MoviesTrendingDay[]> {
    return this.moviesTrendingDayService.findAll(page, limit)
  }

  @Get(":id")
  async findOne(@Param("id") id: string): Promise<MoviesTrendingDay> {
    return this.moviesTrendingDayService.findOne(id)
  }
}
