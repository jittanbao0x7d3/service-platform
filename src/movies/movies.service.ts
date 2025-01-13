import { Injectable } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import { Model } from "mongoose"
import { Movie, MovieDocument } from "../models/movie.schema"
import {
  MoviesTrendingDay,
  MoviesTrendingDayDocument
} from "../models/movie_trending_day.schema"
import {
  MoviesTrendingWeek,
  MoviesTrendingWeekDocument
} from "../models/movie_trending_week.schema"
import {
  MoviesTopRated,
  MoviesTopRatedDocument
} from "../models/movie_top_rated.schema"
import {
  MoviesUpcoming,
  MoviesUpcomingDocument
} from "../models/movie_upcoming.schema"
import {
  MoviesPopular,
  MoviesPopularDocument
} from "../models/movie_popular.schema"

type Path = "today" | "week" | "popular" | "topRated" | "upcoming"

const convertBack = {
  "movies-trending-day": "today",
  "movie-trending-week": "week",
  "movies-popular": "popular",
  "movies-top-rated": "topRated",
  "movie-upcoming": "upcoming"
}

type Mapper = Record<Path, Model<any>>

@Injectable()
export class MoviesService {
  mapper: Mapper = {
    today: undefined,
    week: undefined,
    popular: undefined,
    topRated: undefined,
    upcoming: undefined
  }

  constructor(
    @InjectModel(Movie.name)
    private movieModel: Model<MovieDocument>,

    @InjectModel(MoviesPopular.name)
    private popularModel: Model<MoviesPopularDocument>,

    @InjectModel(MoviesTrendingDay.name)
    private trendingDayModel: Model<MoviesTrendingDayDocument>,

    @InjectModel(MoviesTrendingWeek.name)
    private trendingWeekModel: Model<MoviesTrendingWeekDocument>,

    @InjectModel(MoviesTopRated.name)
    private topRatedDocumentModel: Model<MoviesTopRatedDocument>,

    @InjectModel(MoviesUpcoming.name)
    private upcomingModel: Model<MoviesUpcomingDocument>
  ) {
    this.mapper["today"] = this.trendingDayModel
    this.mapper["week"] = this.trendingWeekModel
    this.mapper["upcoming"] = this.upcomingModel
    this.mapper["popular"] = this.popularModel
    this.mapper["topRated"] = this.topRatedDocumentModel
  }

  async findMany(inputPath: string[]): Promise<Movie[]> {
    const promises = inputPath
      .map((data) => data.split("_"))
      .map(([dataPoint, id]) => {
        const path = convertBack[dataPoint]
        return (this.mapper[path] as Model<any>).findById(id).exec()
      })

    return Promise.all(promises)
  }

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
