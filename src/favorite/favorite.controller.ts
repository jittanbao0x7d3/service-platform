import {
  Controller,
  Post,
  Get,
  Delete,
  Body,
  Param,
  UseGuards
} from "@nestjs/common"
import { FavoritesService } from "../favorite/favorite.service"
import { JwtAuthGuard } from "../guard/jwt-auth.guard"

@Controller("favorites")
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async addFavorite(@Body() body: { userId: string; movieId: string }) {
    return this.favoritesService.addFavorite(body.userId, body.movieId)
  }

  @UseGuards(JwtAuthGuard)
  @Get(":userId")
  async getFavorites(@Param("userId") userId: string) {
    return this.favoritesService.getFavorites(userId)
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  async removeFavorite(@Body() body: { userId: string; movieId: string }) {
    return this.favoritesService.removeFavorite(body.userId, body.movieId)
  }
}
