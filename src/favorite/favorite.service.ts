import { Injectable } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import { Model } from "mongoose"
import { Favorite } from "../models/favorite.schema"

@Injectable()
export class FavoritesService {
  constructor(
    @InjectModel(Favorite.name) private favoriteModel: Model<Favorite>
  ) {}

  async addFavorite(userId: string, movieIds: string): Promise<Favorite> {
    // Check if the user already has a favorite list
    const favorite = await this.favoriteModel.findOne({ userId }).exec()
    if (favorite) {
      // Check if the movie is already in the user's favorite list
      if (favorite.movieIds.includes(movieIds)) {
        return favorite
      }
      // Add the movie to the user's favorite list
      favorite.movieIds.push(movieIds)
      return favorite.save()
    } else {
      // Create a new favorite list for the user
      return this.favoriteModel.create({ userId, movieIds: [movieIds] })
    }
  }

  async getFavorites(userId: string): Promise<Favorite[]> {
    return this.favoriteModel.find({ userId }).exec()
  }

  async removeFavorite(userId: string, movieId: string): Promise<any> {
    return this.favoriteModel
      .updateOne({ userId }, { $pull: { movieIds: movieId } })
      .exec()
  }
}
