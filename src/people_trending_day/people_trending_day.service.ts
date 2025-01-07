import { Injectable } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import { Model } from "mongoose"
import {
  PeopleTrendingDay,
  PeopleTrendingDayDocument
} from "../models/people_trending_day.schema"

@Injectable()
export class PeopleTrendingDayService {
  constructor(
    @InjectModel(PeopleTrendingDay.name)
    private peopleTrendingDayModel: Model<PeopleTrendingDayDocument>
  ) {}

  async findAll(page: number, limit: number): Promise<PeopleTrendingDay[]> {
    const skip = (page - 1) * limit
    return this.peopleTrendingDayModel.find().skip(skip).limit(limit).exec()
  }

  async findOne(id: string): Promise<PeopleTrendingDay> {
    return this.peopleTrendingDayModel.findById(id).exec()
  }
}
