import { GetCommentsDto } from './dtos/get-comments.dto'
import { Controller, Get, Body, Post, Query } from '@nestjs/common'

import { CommentsService } from './comments.service'
import { CreateCommentDto } from './dtos/create-comment.dto'

@Controller('/comments')
export class CommentsController {
    constructor(private readonly commentsService: CommentsService) {}

    @Post()
    public createComment(@Body() dto: CreateCommentDto) {
        return this.commentsService.createComment(dto)
    }

    @Get()
    public getComments(@Query() query: GetCommentsDto) {
        return this.commentsService.getComments(query)
    }
}
