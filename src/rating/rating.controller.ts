import { Controller, Post, Get, Put, Body, Param } from "@nestjs/common"
import { RatingsService } from "../rating/rating.service"

@Controller("ratings")
export class RatingsController {
  constructor(private readonly ratingsService: RatingsService) {}

  @Post()
  async addRating(
    @Body() body: { userId: string; movieId: string; rating: number }
  ) {
    return this.ratingsService.addRating(body.userId, body.movieId, body.rating)
  }

  @Get(":movieId")
  async getRatings(@Param("movieId") movieId: string) {
    return this.ratingsService.getRatings(movieId)
  }

  @Put()
  async updateRating(
    @Body() body: { userId: string; movieId: string; rating: number }
  ) {
    return this.ratingsService.updateRating(
      body.userId,
      body.movieId,
      body.rating
    )
  }
}
