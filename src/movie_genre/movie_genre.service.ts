import { Injectable } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import { Model } from "mongoose"
import { MovieGenre, MovieGenreDocument } from "../models/movie_genre.schema"

@Injectable()
export class MovieGenreService {
  constructor(
    @InjectModel(MovieGenre.name)
    private movieGenreModel: Model<MovieGenreDocument>
  ) {}

  async findAll(): Promise<MovieGenre[]> {
    return this.movieGenreModel.find().exec()
  }

  async findMany(ids: string): Promise<MovieGenre[]> {
    const idArray = ids.split("_").map((id) => parseInt(id))
    return this.movieGenreModel
      .find({
        id: { $in: idArray }
      })
      .exec()
  }
}
