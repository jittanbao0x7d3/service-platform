import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Document } from "mongoose"

export type MovieGenreDocument = MovieGenre & Document

@Schema({ collection: "movie_genres" })
export class MovieGenre {
  @Prop()
  tmdb_id: number

  @Prop()
  id: number

  @Prop()
  name: string
}

export const MovieGenreSchema = SchemaFactory.createForClass(MovieGenre)
