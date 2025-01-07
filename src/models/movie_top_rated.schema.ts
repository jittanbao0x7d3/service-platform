import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Document } from "mongoose"

export type MoviesTopRatedDocument = MoviesTopRated & Document

@Schema({ collection: "movies_top_rated" })
export class MoviesTopRated {
  @Prop()
  tmdb_id: number

  @Prop()
  adult: boolean

  @Prop()
  backdrop_path: string

  @Prop([Number])
  genre_ids: number[]

  @Prop()
  id: number

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

export const MoviesTopRatedSchema = SchemaFactory.createForClass(MoviesTopRated)
