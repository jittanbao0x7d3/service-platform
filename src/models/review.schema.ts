import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Document } from "mongoose"

@Schema()
export class Review extends Document {
  @Prop({ required: true })
  userId: string

  @Prop({ required: true })
  name: string

  @Prop({ required: true })
  movieId: string

  @Prop({ required: true })
  review: string
}

export const ReviewSchema = SchemaFactory.createForClass(Review)
