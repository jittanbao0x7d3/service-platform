import { Controller, Get, Param, Query } from "@nestjs/common"
import { PeopleTrendingWeekService } from "./people_trending_week.service"
import { PeopleTrendingWeek } from "../models/people_trending_week.schema"

@Controller("people-trending-week")
export class PeopleTrendingWeekController {
  constructor(
    private readonly peopleTrendingWeekService: PeopleTrendingWeekService
  ) {}

  @Get()
  async findAll(
    @Query("page") page: number = 1,
    @Query("limit") limit: number = 10
  ): Promise<PeopleTrendingWeek[]> {
    return this.peopleTrendingWeekService.findAll(page, limit)
  }

  @Get(":id")
  async findOne(@Param("id") id: string): Promise<PeopleTrendingWeek> {
    return this.peopleTrendingWeekService.findOne(id)
  }
}
