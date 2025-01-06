import { Controller, Get, Param, Query } from "@nestjs/common"
import { MoviesPopularService } from "./movie_popular.service"
import { MoviesPopular } from "../models/movie_popular.schema"

@Controller("movies-popular")
export class MoviesPopularController {
  constructor(private readonly moviesPopularService: MoviesPopularService) {}

  @Get()
  async findAll(
    @Query("page") page: number = 1,
    @Query("limit") limit: number = 10
  ): Promise<MoviesPopular[]> {
    return this.moviesPopularService.findAll(page, limit)
  }

  @Get(":id")
  async findOne(@Param("id") id: string): Promise<MoviesPopular> {
    return this.moviesPopularService.findOne(id)
  }
}
