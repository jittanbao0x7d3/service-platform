import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Document } from "mongoose"

export type PeopleDocument = People & Document

@Schema({ collection: "people" })
export class People {
  @Prop()
  tmdb_id: number

  @Prop()
  adult: boolean

  @Prop([String])
  also_known_as: string[]

  @Prop()
  biography: string

  @Prop()
  birthday: string

  @Prop({ type: String, default: null })
  deathday: string | null

  @Prop()
  gender: number

  @Prop()
  homepage: string

  @Prop()
  id: number

  @Prop()
  imdb_id: string

  @Prop()
  known_for_department: string

  @Prop()
  name: string

  @Prop()
  place_of_birth: string

  @Prop()
  popularity: number

  @Prop()
  profile_path: string

  @Prop({ type: Object })
  movie_credits: {
    cast: {
      adult: boolean
      backdrop_path: string | null
      genre_ids: number[]
      id: number
      original_language: string
      original_title: string
      overview: string
      popularity: number
      poster_path: string
      release_date: string
      title: string
      video: boolean
      vote_average: number
      vote_count: number
      character: string
      credit_id: string
      order: number
    }[]
    crew: any[]
  }
}

export const PeopleSchema = SchemaFactory.createForClass(People)
