import { Injectable } from '@nestjs/common'
import { InjectModel } from 'nestjs-typegoose'
import { ReturnModelType } from '@typegoose/typegoose'

import { Comment } from './comment.model'
import { DefaultFindOptionsType } from '@shared/types/default-find-options.type'

@Injectable()
export class CommentRepository {
    constructor(
        @InjectModel(Comment)
        private readonly commentModel: ReturnModelType<typeof Comment>,
    ) {}

    public async create(dto: Comment): Promise<Comment> {
        return (await this.commentModel.create(dto)).toObject()
    }

    public async find({
        skip,
        limit,
    }: DefaultFindOptionsType): Promise<Comment[]> {
        return this.commentModel
            .find()
            .limit(limit)
            .skip(skip)
    }
}
