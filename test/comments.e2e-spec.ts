import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication, ValidationPipe } from '@nestjs/common'
import * as request from 'supertest'

import { CreateCommentDto } from '@modules/comments/dtos/create-comment.dto'
import { CoreModule } from '@core/core.module'
import { ConfigService } from '@shared/modules/config/config.service'
import { drooDatabase } from './test.utils'

describe('-- Comments Controller --', () => {
    let app: INestApplication

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [CoreModule],
        }).compile()

        app = moduleFixture.createNestApplication()

        app.useGlobalPipes(new ValidationPipe({ transform: true }))

        const config = app.get<ConfigService>(ConfigService)

        await app.init()

        await drooDatabase(config.mongoConnectionString)
    })

    afterAll(async () => {
        await app.close()
    })

    describe('* POST /comments', () => {
        it('should return status 201 and object with _id key', async () => {
            const dto: CreateCommentDto = {
                content: 'Hello Roman :)',
                owner: 'User420',
            }

            const data = await request(app.getHttpServer())
                .post('/comments')
                .send(dto)
                .expect(201)

            const isMongoIdExists = !!data.body._id

            expect(isMongoIdExists).toBeTruthy()
        })

        it('should return status 400 when content param is to short', async () => {
            const dto: CreateCommentDto = {
                content: '',
                owner: 'User420',
            }

            await request(app.getHttpServer())
                .post('/comments')
                .send(dto)
                .expect(400)
        })

        it('should return status 400 when owner param is too shrot', async () => {
            const dto: CreateCommentDto = {
                content: 'Hello Roman :)',
                owner: '',
            }

            await request(app.getHttpServer())
                .post('/comments')
                .send(dto)
                .expect(400)
        })

        it('should return status 400 when params are not provided', async () => {
            const dto = {}

            await request(app.getHttpServer())
                .post('/comments')
                .send(dto)
                .expect(400)
        })
    })

    describe('* GET /commnets', () => {
        it('should return status 200 and empty array', async () => {
            const data = await request(app.getHttpServer())
                .get('/comments')
                .expect(200)

            expect(data.body).toEqual([])
        })

        it('should create object and next return array with one object', async () => {
            const dto: CreateCommentDto = {
                content: 'Hello Roman :)',
                owner: 'User420',
            }

            await request(app.getHttpServer())
                .post('/comments')
                .send(dto)
                .expect(201)

            const data = await request(app.getHttpServer())
                .get('/comments')
                .expect(200)

            expect(data.body.length).toEqual(1)
            expect(data.body[0].content).toEqual('Hello Roman :)')
        })
    })
})
