import { Injectable } from '@nestjs/common'

import { CreateCommentDto } from './dtos/create-comment.dto'
import { GetCommentsDto } from './dtos/get-comments.dto'
import { CommentRepository } from './model/comment.repository'

@Injectable()
export class CommentsService {
    constructor(private commentRepository: CommentRepository) {}

    public async getComments(getCommentsQuery: GetCommentsDto) {
        return this.commentRepository.find(getCommentsQuery)
    }

    public async createComment(createCommentDto: CreateCommentDto) {
        return this.commentRepository.create(createCommentDto)
    }
}
