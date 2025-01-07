import { Injectable } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import { Model } from "mongoose"
import {
  MoviesTrendingDay,
  MoviesTrendingDayDocument
} from "../models/movie_trending_day.schema"

@Injectable()
export class MoviesTrendingDayService {
  constructor(
    @InjectModel(MoviesTrendingDay.name)
    private moviesTrendingDayModel: Model<MoviesTrendingDayDocument>
  ) {}

  async findAll(page: number, limit: number): Promise<MoviesTrendingDay[]> {
    const skip = (page - 1) * limit
    return this.moviesTrendingDayModel.find().skip(skip).limit(limit).exec()
  }

  async findOne(id: string): Promise<MoviesTrendingDay> {
    return this.moviesTrendingDayModel.findById(id).exec()
  }
}
