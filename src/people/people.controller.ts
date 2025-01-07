import { Controller, Get, Param, Query } from "@nestjs/common"
import { PeopleService } from "./people.service"
import { People } from "../models/people.schema"

@Controller("people")
export class PeopleController {
  constructor(private readonly peopleService: PeopleService) {}

  @Get()
  async findAll(
    @Query("page") page: number = 1,
    @Query("limit") limit: number = 10
  ): Promise<People[]> {
    return this.peopleService.findAll(page, limit)
  }

  @Get(":id")
  async findOne(@Param("id") id: string): Promise<People> {
    return this.peopleService.findOne(id)
  }
}
