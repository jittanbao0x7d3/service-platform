import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Document } from "mongoose"

export type MoviesNowPlayingDocument = MoviesNowPlaying & Document

@Schema({ collection: "movies_now_playing" })
export class MoviesNowPlaying {
  @Prop()
  _id: string

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

export const MoviesNowPlayingSchema =
  SchemaFactory.createForClass(MoviesNowPlaying)
