import { Injectable } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import { Model } from "mongoose"
import {
  MoviesNowPlaying,
  MoviesNowPlayingDocument
} from "../models/movie_now_playing.schema"

@Injectable()
export class MoviesNowPlayingService {
  constructor(
    @InjectModel(MoviesNowPlaying.name)
    private moviesNowPlayingModel: Model<MoviesNowPlayingDocument>
  ) {}

  async findAll(page: number, limit: number): Promise<MoviesNowPlaying[]> {
    const skip = (page - 1) * limit
    return this.moviesNowPlayingModel.find().skip(skip).limit(limit).exec()
  }

  async findOne(id: string): Promise<MoviesNowPlaying> {
    return this.moviesNowPlayingModel.findById(id).exec()
  }
}
