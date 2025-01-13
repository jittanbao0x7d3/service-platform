import {
  Controller,
  Post,
  Get,
  Put,
  Body,
  Param,
  UseGuards
} from "@nestjs/common"
import { RatingsService } from "../rating/rating.service"
import { JwtAuthGuard } from "src/guard/jwt-auth.guard"

@Controller("ratings")
export class RatingsController {
  constructor(private readonly ratingsService: RatingsService) {}

  @UseGuards(JwtAuthGuard)
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

  @UseGuards(JwtAuthGuard)
  @Get("/user/:userId")
  async getUserRatings(@Param("userId") userId: string) {
    return this.ratingsService.getUserRatings(userId)
  }
}
