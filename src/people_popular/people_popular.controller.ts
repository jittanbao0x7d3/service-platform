import { Controller, Get, Param, Query } from "@nestjs/common"
import { PeoplePopularService } from "./people_popular.service"
import { PeoplePopular } from "../models/people_popular.schema"

@Controller("people-popular")
export class PeoplePopularController {
  constructor(private readonly peoplePopularService: PeoplePopularService) {}

  @Get()
  async findAll(
    @Query("page") page: number = 1,
    @Query("limit") limit: number = 10
  ): Promise<PeoplePopular[]> {
    return this.peoplePopularService.findAll(page, limit)
  }

  @Get(":id")
  async findOne(@Param("id") id: string): Promise<PeoplePopular> {
    return this.peoplePopularService.findOne(id)
  }
}
