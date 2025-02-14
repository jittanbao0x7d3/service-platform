import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Document } from "mongoose"

@Schema()
export class Rating extends Document {
  @Prop({ required: true })
  userId: string

  @Prop({ required: true })
  movieId: string

  @Prop({ required: true })
  movieTitle: string

  @Prop({ required: true })
  rating: number
}

export const RatingSchema = SchemaFactory.createForClass(Rating)
