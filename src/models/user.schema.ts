import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Document } from "mongoose"

export type UserDocument = User & Document

@Schema()
export class User {
  @Prop({ required: true })
  firstName: string

  @Prop({ required: true })
  lastName: string

  @Prop({ required: true })
  email: string

  @Prop({ required: true })
  password: string

  @Prop({ default: false })
  isActive: boolean

  @Prop({ type: String, default: null })
  resetPasswordToken: string | null

  @Prop({ type: Date, default: null })
  resetPasswordExpires: Date | null
}

export const UserSchema = SchemaFactory.createForClass(User)
