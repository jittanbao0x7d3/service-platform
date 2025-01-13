import { Module } from "@nestjs/common"
import { MongooseModule } from "@nestjs/mongoose"
import { FavoritesController } from "../favorite/favorite.controller"
import { FavoritesService } from "../favorite/favorite.service"
import { Favorite, FavoriteSchema } from "../models/favorite.schema"

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Favorite.name, schema: FavoriteSchema }])
  ],
  controllers: [FavoritesController],
  providers: [FavoritesService]
})
export class FavoriteModule {}
