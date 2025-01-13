import { Injectable } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import { Model } from "mongoose"
import { Review } from "../models/review.schema"

@Injectable()
export class ReviewsService {
  constructor(@InjectModel(Review.name) private reviewModel: Model<Review>) {}

  async addReview(
    userId: string,
    movieId: string,
    review: string
  ): Promise<Review> {
    const newReview = new this.reviewModel({ userId, movieId, review })
    return newReview.save()
  }

  async getReviews(movieId: string): Promise<Review[]> {
    return this.reviewModel.find({ movieId }).exec()
  }

  async updateReview(
    userId: string,
    movieId: string,
    review: string
  ): Promise<Review> {
    return this.reviewModel
      .findOneAndUpdate({ userId, movieId }, { review }, { new: true })
      .exec()
  }
}
