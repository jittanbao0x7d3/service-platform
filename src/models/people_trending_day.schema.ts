import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Document } from "mongoose"

export type PeopleTrendingDayDocument = PeopleTrendingDay & Document

@Schema({ collection: "people_trending_day" })
export class PeopleTrendingDay {
  @Prop()
  tmdb_id: number

  @Prop()
  adult: boolean

  @Prop([String])
  categories: string[]

  @Prop()
  gender: number

  @Prop()
  id: number

  @Prop()
  known_for_department: string

  @Prop()
  media_type: string

  @Prop()
  name: string

  @Prop()
  original_name: string

  @Prop()
  popularity: number

  @Prop()
  profile_path: string
}

export const PeopleTrendingDaySchema =
  SchemaFactory.createForClass(PeopleTrendingDay)
