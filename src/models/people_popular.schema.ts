import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Document } from "mongoose"

export type PeoplePopularDocument = PeoplePopular & Document

@Schema({ collection: "people_popular" })
export class PeoplePopular {
  @Prop()
  tmdb_id: number

  @Prop()
  adult: boolean

  @Prop()
  gender: number

  @Prop()
  id: number

  @Prop({ type: Object })
  known_for: {
    backdrop_path: string
    id: number
    title: string
    original_title: string
    overview: string
    poster_path: string
    media_type: string
    adult: boolean
    original_language: string
    genre_ids: number[]
    popularity: number
    release_date: string
    video: boolean
    vote_average: number
    vote_count: number
  }[]

  @Prop()
  known_for_department: string

  @Prop()
  name: string

  @Prop()
  original_name: string

  @Prop()
  popularity: number

  @Prop()
  profile_path: string
}

export const PeoplePopularSchema = SchemaFactory.createForClass(PeoplePopular)
