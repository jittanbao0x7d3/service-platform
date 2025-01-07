import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Document } from "mongoose"

export type MoviesTrendingDayDocument = MoviesTrendingDay & Document

@Schema({ collection: "movies_trending_day" })
export class MoviesTrendingDay {
  @Prop()
  tmdb_id: number

  @Prop()
  adult: boolean

  @Prop()
  backdrop_path: string

  @Prop([String])
  categories: string[]

  @Prop([Number])
  genre_ids: number[]

  @Prop()
  id: number

  @Prop()
  media_type: string

  @Prop()
  original_language: string

  @Prop()
  original_title: string

  @Prop()
  overview: string

  @Prop()
  popularity: number

  @Prop()
  poster_path: string

  @Prop()
  release_date: string

  @Prop()
  title: string

  @Prop()
  video: boolean

  @Prop()
  vote_average: number

  @Prop()
  vote_count: number
}

export const MoviesTrendingDaySchema =
  SchemaFactory.createForClass(MoviesTrendingDay)
