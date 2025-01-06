import { Controller, Get, Param, Query } from "@nestjs/common"
import { MoviesService } from "./movies.service"
import { Movie } from "../models/movie.schema"

@Controller("movies")
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  async findAll(
    @Query("page") page: number = 1,
    @Query("limit") limit: number = 10
  ): Promise<Movie[]> {
    return this.moviesService.findAll(page, limit)
  }

  @Get(":id")
  async findOne(@Param("id") id: string): Promise<Movie> {
    return this.moviesService.findOne(id)
  }
}
