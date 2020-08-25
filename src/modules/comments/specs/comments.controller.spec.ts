import { GetCommentsDto } from './../dtos/get-comments.dto'
import { Test, TestingModule } from '@nestjs/testing'

import { getModelToken } from 'nestjs-typegoose'
import { CreateCommentDto } from './../dtos/create-comment.dto'
import { CommentsService } from './../comments.service'
import { CommentsController } from '../comments.controller'
import { CommentRepository } from '../model/comment.repository'
import { Comment } from './../model/comment.model'

describe('-- Comment Controller --', () => {
    const fakeCommentModel = jest.fn()

    let module: TestingModule
    let commentsService: CommentsService
    let commentsController: CommentsController

    beforeAll(async () => {
        module = await Test.createTestingModule({
            controllers: [CommentsController],
            providers: [
                CommentsService,
                CommentRepository,
                {
                    provide: getModelToken('Comment'),
                    useValue: fakeCommentModel,
                },
            ],
        }).compile()

        commentsService = module.get<CommentsService>(CommentsService)
        commentsController = module.get(CommentsController)
    })

    afterEach(() => {
        jest.resetAllMocks()
    })

    describe('* Get comments', () => {
        it('should return an entity of client if successful', async () => {
            const expectedResult = [new Comment()]
            const queryParms = new GetCommentsDto()

            jest.spyOn(commentsService, 'getComments').mockResolvedValue(
                expectedResult,
            )
            expect(await commentsController.getComments(queryParms)).toBe(
                expectedResult,
            )
        })
    })

    describe('* Create Comment ', () => {
        const dto = new CreateCommentDto()

        it('should return comment', async () => {
            const expectedResult = new Comment()

            jest.spyOn(commentsService, 'createComment').mockResolvedValue(
                Promise.resolve(expectedResult),
            )

            expect(await commentsController.createComment(dto)).toBe(
                expectedResult,
            )
        })
    })
})
