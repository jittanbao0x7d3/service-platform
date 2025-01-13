import { Body, Controller, Get, Param, Post, Query } from "@nestjs/common"
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

  @Get("search")
  async search(
    @Query("query") query: string,
    @Query("page") page: number = 1,
    @Query("limit") limit: number = 10
  ): Promise<Movie[]> {
    return this.moviesService.search(query, page, limit)
  }

  @Get(":id")
  async findOne(@Param("id") id: string): Promise<Movie> {
    return this.moviesService.findOne(id)
  }

  @Post("find-many")
  async findMany(@Body() body: { path: string[] }) {
    return this.moviesService.findMany(body.path)
  }
}
