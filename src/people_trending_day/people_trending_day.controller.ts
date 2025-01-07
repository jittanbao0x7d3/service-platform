import { Controller, Get, Param, Query } from "@nestjs/common"
import { PeopleTrendingDayService } from "./people_trending_day.service"
import { PeopleTrendingDay } from "../models/people_trending_day.schema"

@Controller("people-trending-day")
export class PeopleTrendingDayController {
  constructor(
    private readonly peopleTrendingDayService: PeopleTrendingDayService
  ) {}

  @Get()
  async findAll(
    @Query("page") page: number = 1,
    @Query("limit") limit: number = 10
  ): Promise<PeopleTrendingDay[]> {
    return this.peopleTrendingDayService.findAll(page, limit)
  }

  @Get(":id")
  async findOne(@Param("id") id: string): Promise<PeopleTrendingDay> {
    return this.peopleTrendingDayService.findOne(id)
  }
}
