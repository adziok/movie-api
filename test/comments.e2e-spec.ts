import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication, ValidationPipe } from '@nestjs/common'
import * as request from 'supertest';

import { SearchMoviesDto } from './../src/shared/dtos/search-movies.dto';
import { CoreModule } from '../src/core/core.module'

describe('-- Movies Controller --', () => {
    let app: INestApplication

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [CoreModule],
        })
        .compile()

        app = moduleFixture.createNestApplication()
    
        app.useGlobalPipes(new ValidationPipe({ transform: true }))

        app.get('D')

        await app.init()
    })

    afterAll(async () => {
        await app.close()
    });

    describe('* POST /movies', () => {
        it('should return status 201 and object with _id key', async () => {
            const dto: SearchMoviesDto = {
                search: 'Rocky'
            }
    
            const data = await request(app.getHttpServer())
                .post('/movies')
                .send(dto)
                .expect(201)
            
            const isMongoIdExists = !!data.body._id
    
            expect(isMongoIdExists).toBeTruthy()
        })

        it('should return status 400 when search param is to short', async () => {
            const dto: SearchMoviesDto = {
                search: ''
            }
    
            await request(app.getHttpServer())
                .post('/movies')
                .send(dto)
                .expect(400)
        })

        it('should return status 400 when search param is not provided', async () => {
            const dto = {}
    
            await request(app.getHttpServer())
                .post('/movies')
                .send(dto)
                .expect(400)
        })
    })

    describe('* GET /movies', () => {
        it('should return status 200 and object with empty array', async () => {
            const data = await request(app.getHttpServer())
                .get('/movies')
                .expect(200)

            expect(data.body).toEqual([])
        })
        // it('should create object and next return array with one object', async () => {
        //     const dto: SearchMoviesDto = {
        //         search: 'Rocky 2'
        //     }
    
        //     await request(app.getHttpServer())
        //         .post('/movies')
        //         .send(dto)
        //         .expect(201)
            
        //     const data = await request(app.getHttpServer())
        //         .get('/movies')
        //         .expect(200)
    
        //     expect(data.length).toEqual([])
        // })
    })
})
