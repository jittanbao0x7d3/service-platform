import { Module } from "@nestjs/common"
import { MongooseModule } from "@nestjs/mongoose"
import { ReviewsController } from "../review/review.controller"
import { ReviewsService } from "../review/review.service"
import { Review, ReviewSchema } from "../models/review.schema"

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Review.name, schema: ReviewSchema }])
  ],
  controllers: [ReviewsController],
  providers: [ReviewsService]
})
export class ReviewsModule {}
