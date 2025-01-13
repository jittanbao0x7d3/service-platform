import {
  Controller,
  Post,
  Get,
  Put,
  Body,
  Param,
  UseGuards
} from "@nestjs/common"
import { ReviewsService } from "../review/review.service"
import { JwtAuthGuard } from "src/guard/jwt-auth.guard"

@Controller("reviews")
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async addReview(
    @Body() body: { userId: string; movieId: string; review: string }
  ) {
    return this.reviewsService.addReview(body.userId, body.movieId, body.review)
  }

  @Get(":movieId")
  async getReviews(@Param("movieId") movieId: string) {
    return this.reviewsService.getReviews(movieId)
  }

  @UseGuards(JwtAuthGuard)
  @Put()
  async updateReview(
    @Body() body: { userId: string; movieId: string; review: string }
  ) {
    return this.reviewsService.updateReview(
      body.userId,
      body.movieId,
      body.review
    )
  }
}
