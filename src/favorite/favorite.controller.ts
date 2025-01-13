import { Controller, Post, Get, Delete, Body, Param } from "@nestjs/common"
import { FavoritesService } from "../favorite/favorite.service"

@Controller("favorites")
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Post()
  async addFavorite(@Body() body: { userId: string; movieId: string }) {
    return this.favoritesService.addFavorite(body.userId, body.movieId)
  }

  @Get(":userId")
  async getFavorites(@Param("userId") userId: string) {
    return this.favoritesService.getFavorites(userId)
  }

  @Delete()
  async removeFavorite(@Body() body: { userId: string; movieId: string }) {
    return this.favoritesService.removeFavorite(body.userId, body.movieId)
  }
}
