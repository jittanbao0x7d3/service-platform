import { Controller, Get, Param, Query } from "@nestjs/common"
import { MoviesNowPlayingService } from "./movie_now_playing.service"
import { MoviesNowPlaying } from "../models/movie_now_playing.schema"

@Controller("movies-now-playing")
export class MoviesNowPlayingController {
  constructor(
    private readonly moviesNowPlayingService: MoviesNowPlayingService
  ) {}

  @Get()
  async findAll(
    @Query("page") page: number = 1,
    @Query("limit") limit: number = 10
  ): Promise<MoviesNowPlaying[]> {
    return this.moviesNowPlayingService.findAll(page, limit)
  }

  @Get(":id")
  async findOne(@Param("id") id: string): Promise<MoviesNowPlaying> {
    return this.moviesNowPlayingService.findOne(id)
  }
}
