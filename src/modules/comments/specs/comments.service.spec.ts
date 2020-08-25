import { GetCommentsDto } from './../dtos/get-comments.dto';
import { Types } from 'mongoose';
import { Test, TestingModule } from '@nestjs/testing';

import { CreateCommentDto } from '../dtos/create-comment.dto';
import { CommentRepository } from '../model/comment.repository';
import { CommentsService } from '../comments.service';
import { repositoryMockFactory, MockType } from './comments.repository.fake';
import { Comment } from '../model/comment.model';

describe("-- Comments Service --", () => {
    let commentsService: CommentsService
    let commentRepositoryMock: MockType<CommentRepository>

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommentsService,
                {
                    provide: 'CommentRepository',
                    useFactory: repositoryMockFactory,
                },
            ],
        }).compile()

        commentsService = module.get(CommentsService);
        commentRepositoryMock = module.get('CommentRepository');
    });

    describe('* Create Comment', () => {
        it('should return comment', async () => {
            const createCommentDto = new CreateCommentDto()

            createCommentDto.content = 'Hello Roman! :)'
            createCommentDto.owner = 'user420'

            const newComment: Comment = {
                content: 'Hello Roman ;)',
                owner: 'user420',
                createdAt: new Date(),
                updatedAt: new Date(),
                _id: Types.ObjectId()
            }

            commentRepositoryMock.create.mockReturnValue(newComment)

            const commentsServiceCreateComment = jest
                .spyOn(commentsService, 'createComment');

            const result = await commentsService.createComment(createCommentDto);

            expect(commentsServiceCreateComment).toHaveBeenCalledWith(createCommentDto);

            expect(result).toEqual(newComment);
        });
    });

    describe('* Get Comments', () => {
        it('should return comments', async () => {
            const getCommentsDto = new GetCommentsDto()
            const comments = [new Comment()]

            commentRepositoryMock.find.mockReturnValue(comments)

            const commentsServiceCreateComment = jest
                .spyOn(commentsService, 'getComments');

            const result = await commentsService.getComments(getCommentsDto)

            expect(commentsServiceCreateComment).toHaveBeenCalledWith(getCommentsDto)

            expect(result).toEqual(comments)
        });
    });
});
