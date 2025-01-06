import { Injectable } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import { Model } from "mongoose"
import {
  MoviesPopular,
  MoviesPopularDocument
} from "../models/movie_popular.schema"

@Injectable()
export class MoviesPopularService {
  constructor(
    @InjectModel(MoviesPopular.name)
    private moviesPopularModel: Model<MoviesPopularDocument>
  ) {}

  async findAll(page: number, limit: number): Promise<MoviesPopular[]> {
    const skip = (page - 1) * limit
    return this.moviesPopularModel.find().skip(skip).limit(limit).exec()
  }

  async findOne(id: string): Promise<MoviesPopular> {
    return this.moviesPopularModel.findById(id).exec()
  }
}
