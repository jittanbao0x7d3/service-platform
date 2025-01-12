import { Injectable } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import { Model } from "mongoose"
import { Movie, MovieDocument } from "../models/movie.schema"

@Injectable()
export class MoviesService {
  constructor(
    @InjectModel(Movie.name) private movieModel: Model<MovieDocument>
  ) {}

  async findAll(page: number, limit: number): Promise<Movie[]> {
    const skip = (page - 1) * limit
    return this.movieModel.find().skip(skip).limit(limit).exec()
  }

  async findOne(id: string): Promise<Movie> {
    return this.movieModel.findById(id).exec()
  }

  async search(query: string, page: number, limit: number): Promise<Movie[]> {
    const skip = (page - 1) * limit
    return this.movieModel
      .find({ original_title: { $regex: query, $options: "i" } }) // Case-insensitive search
      .skip(skip)
      .limit(limit)
      .exec()
  }
}
