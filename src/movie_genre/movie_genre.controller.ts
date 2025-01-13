import { Controller, Get } from "@nestjs/common"
import { MovieGenreService } from "./movie_genre.service"
import { MovieGenre } from "../models/movie_genre.schema"

@Controller("movie-genres")
export class MovieGenreController {
  constructor(private readonly movieGenreService: MovieGenreService) {}

  @Get()
  async findAll(): Promise<MovieGenre[]> {
    return this.movieGenreService.findAll()
  }

  @Get(":ids")
  async byId(ids: string): Promise<MovieGenre[]> {
    return this.movieGenreService.findMany(ids)
  }
}
