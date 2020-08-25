import { Module } from '@nestjs/common'
import { TypegooseModule } from 'nestjs-typegoose'

import { CommentsController } from './comments.controller'
import { CommentsService } from './comments.service'
import { Comment } from './model/comment.model'
import { CommentRepository } from './model/comment.repository'

@Module({
    imports: [TypegooseModule.forFeature([Comment])],
    controllers: [CommentsController],
    providers: [CommentsService, CommentRepository],
    exports: [CommentsService],
})
export class CommentsModule {}
