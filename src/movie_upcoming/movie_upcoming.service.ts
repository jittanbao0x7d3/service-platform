import { Injectable } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import { Model } from "mongoose"
import {
  MoviesUpcoming,
  MoviesUpcomingDocument
} from "../models/movie_upcoming.schema"

@Injectable()
export class MoviesUpcomingService {
  constructor(
    @InjectModel(MoviesUpcoming.name)
    private moviesUpcomingModel: Model<MoviesUpcomingDocument>
  ) {}

  async findAll(page: number, limit: number): Promise<MoviesUpcoming[]> {
    const skip = (page - 1) * limit
    return this.moviesUpcomingModel.find().skip(skip).limit(limit).exec()
  }

  async findOne(id: string): Promise<MoviesUpcoming> {
    return this.moviesUpcomingModel.findById(id).exec()
  }
}
