import { Injectable } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import { Model } from "mongoose"
import { Rating } from "../models/rating.schema"

@Injectable()
export class RatingsService {
  constructor(@InjectModel(Rating.name) private ratingModel: Model<Rating>) {}

  async addRating(
    userId: string,
    movieId: string,
    movieTitle: string,
    rating: number
  ): Promise<Rating> {
    const existingRating = await this.ratingModel.findOne({ userId, movieId })
    if (existingRating) {
      return this.updateRating(userId, movieId, movieTitle, rating)
    }
    const newRating = new this.ratingModel({
      userId,
      movieId,
      movieTitle,
      rating
    })
    return newRating.save()
  }

  async getRatings(movieId: string): Promise<Rating[]> {
    return this.ratingModel.find({ movieId }).exec()
  }

  async updateRating(
    userId: string,
    movieId: string,
    movieTitle: string,
    rating: number
  ): Promise<Rating> {
    return this.ratingModel
      .findOneAndUpdate(
        { userId, movieId, movieTitle },
        { rating },
        { new: true }
      )
      .exec()
  }

  async getUserRatings(userId: string): Promise<Rating[]> {
    return this.ratingModel.find({ userId }).exec()
  }
}
