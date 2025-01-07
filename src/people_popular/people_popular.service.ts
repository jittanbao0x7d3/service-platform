import { Injectable } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import { Model } from "mongoose"
import {
  PeoplePopular,
  PeoplePopularDocument
} from "../models/people_popular.schema"

@Injectable()
export class PeoplePopularService {
  constructor(
    @InjectModel(PeoplePopular.name)
    private peoplePopularModel: Model<PeoplePopularDocument>
  ) {}

  async findAll(page: number, limit: number): Promise<PeoplePopular[]> {
    const skip = (page - 1) * limit
    return this.peoplePopularModel.find().skip(skip).limit(limit).exec()
  }

  async findOne(id: string): Promise<PeoplePopular> {
    return this.peoplePopularModel.findById(id).exec()
  }
}
