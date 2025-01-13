import { Injectable } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import { Model } from "mongoose"
import { Favorite } from "../models/favorite.schema"

@Injectable()
export class FavoritesService {
  constructor(
    @InjectModel(Favorite.name) private favoriteModel: Model<Favorite>
  ) {}

  async addFavorite(userId: string, movieId: string): Promise<Favorite> {
    const favorite = new this.favoriteModel({ userId, movieId })
    return favorite.save()
  }

  async getFavorites(userId: string): Promise<Favorite[]> {
    return this.favoriteModel.find({ userId }).exec()
  }

  async removeFavorite(userId: string, movieId: string): Promise<any> {
    return this.favoriteModel.deleteOne({ userId, movieId }).exec()
  }
}
