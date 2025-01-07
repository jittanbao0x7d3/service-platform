import { Controller, Get, Param, Query } from "@nestjs/common"
import { MoviesTopRatedService } from "./movie_top_rated.service"
import { MoviesTopRated } from "../models/movie_top_rated.schema"

@Controller("movies-top-rated")
export class MoviesTopRatedController {
  constructor(private readonly moviesTopRatedService: MoviesTopRatedService) {}

  @Get()
  async findAll(
    @Query("page") page: number = 1,
    @Query("limit") limit: number = 10
  ): Promise<MoviesTopRated[]> {
    return this.moviesTopRatedService.findAll(page, limit)
  }

  @Get(":id")
  async findOne(@Param("id") id: string): Promise<MoviesTopRated> {
    return this.moviesTopRatedService.findOne(id)
  }
}
