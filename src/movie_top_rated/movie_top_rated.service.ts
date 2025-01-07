import { Injectable } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import { Model } from "mongoose"
import {
  MoviesTopRated,
  MoviesTopRatedDocument
} from "../models/movie_top_rated.schema"

@Injectable()
export class MoviesTopRatedService {
  constructor(
    @InjectModel(MoviesTopRated.name)
    private moviesTopRatedModel: Model<MoviesTopRatedDocument>
  ) {}

  async findAll(page: number, limit: number): Promise<MoviesTopRated[]> {
    const skip = (page - 1) * limit
    return this.moviesTopRatedModel.find().skip(skip).limit(limit).exec()
  }

  async findOne(id: string): Promise<MoviesTopRated> {
    return this.moviesTopRatedModel.findById(id).exec()
  }
}
