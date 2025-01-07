import { Module } from "@nestjs/common"
import { MongooseModule } from "@nestjs/mongoose"
import { PeoplePopularService } from "./people_popular.service"
import { PeoplePopularController } from "./people_popular.controller"
import {
  PeoplePopular,
  PeoplePopularSchema
} from "../models/people_popular.schema"

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PeoplePopular.name, schema: PeoplePopularSchema }
    ])
  ],
  controllers: [PeoplePopularController],
  providers: [PeoplePopularService]
})
export class PeoplePopularModule {}
