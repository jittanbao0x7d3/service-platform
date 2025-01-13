import { Injectable } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import { Model } from "mongoose"
import { People, PeopleDocument } from "../models/people.schema"

@Injectable()
export class PeopleService {
  constructor(
    @InjectModel(People.name) private peopleModel: Model<PeopleDocument>
  ) {}

  async findAll(page: number, limit: number): Promise<People[]> {
    const skip = (page - 1) * limit
    return this.peopleModel.find().skip(skip).limit(limit).exec()
  }

  async findOne(id: string): Promise<People> {
    return this.peopleModel.findOne({id: id}).exec()
  }

  async findMany(
    ids: string[],
    page: number,
    limit: number
  ): Promise<People[]> {
    const skip = (page - 1) * limit
    return this.peopleModel
      .find()
      .where("_id")
      .in(ids)
      .skip(skip)
      .limit(limit)
      .exec()
  }

  async search(query: string, page: number, limit: number): Promise<People[]> {
    const skip = (page - 1) * limit

    return this.peopleModel
      .find({ name: { $regex: query, $options: "i" } }) // Case-insensitive search
      .skip(skip)
      .limit(limit)
      .exec()
  }
}
