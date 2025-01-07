import { Injectable } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import { Model } from "mongoose"
import {
  PeopleTrendingWeek,
  PeopleTrendingWeekDocument
} from "../models/people_trending_week.schema"

@Injectable()
export class PeopleTrendingWeekService {
  constructor(
    @InjectModel(PeopleTrendingWeek.name)
    private peopleTrendingWeekModel: Model<PeopleTrendingWeekDocument>
  ) {}

  async findAll(page: number, limit: number): Promise<PeopleTrendingWeek[]> {
    const skip = (page - 1) * limit
    return this.peopleTrendingWeekModel.find().skip(skip).limit(limit).exec()
  }

  async findOne(id: string): Promise<PeopleTrendingWeek> {
    return this.peopleTrendingWeekModel.findById(id).exec()
  }
}
