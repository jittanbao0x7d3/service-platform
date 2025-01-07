import { Injectable } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import { Model } from "mongoose"
import {
  MoviesTrendingWeek,
  MoviesTrendingWeekDocument
} from "../models/movie_trending_week.schema"

@Injectable()
export class MoviesTrendingWeekService {
  constructor(
    @InjectModel(MoviesTrendingWeek.name)
    private MoviesTrendingWeekModel: Model<MoviesTrendingWeekDocument>
  ) {}

  async findAll(page: number, limit: number): Promise<MoviesTrendingWeek[]> {
    const skip = (page - 1) * limit
    return this.MoviesTrendingWeekModel.find().skip(skip).limit(limit).exec()
  }

  async findOne(id: string): Promise<MoviesTrendingWeek> {
    return this.MoviesTrendingWeekModel.findById(id).exec()
  }
}
