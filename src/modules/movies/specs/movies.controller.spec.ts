import { Test, TestingModule } from '@nestjs/testing'
import { getModelToken } from 'nestjs-typegoose'

import { SearchMoviesDto } from '@shared/dtos/search-movies.dto'
import { GetSavedMoviesDto } from './../dtos/get-saved-movies.dto'
import { Movie } from './../model/movie.model'
import { MoviesController } from './../movies.controller'
import { MoviesService } from '../movies.service'
import { MovieRepository } from '../model/movie.repository'
import { mockOmdbapiServiceFactory } from './mocks/mock-omdbapi.service.factory'

describe('-- Movies Controller --', () => {
    const fakeMovieModel = jest.fn()

    let module: TestingModule
    let moviesService: MoviesService
    let moviesController: MoviesController

    beforeAll(async () => {
        module = await Test.createTestingModule({
            controllers: [MoviesController],
            providers: [
                MoviesService,
                MovieRepository,
                {
                    provide: 'OmdbapiService',
                    useFactory: mockOmdbapiServiceFactory,
                },
                {
                    provide: getModelToken('Movie'),
                    useValue: fakeMovieModel,
                },
            ],
        }).compile()

        moviesService = module.get(MoviesService)
        moviesController = module.get(MoviesController)
    })

    afterEach(() => {
        jest.resetAllMocks()
    })

    describe('* Get Saved Movies', () => {
        it('should return an entity of client if successful', async () => {
            const expectedResult = [new Movie()]
            const queryParms = new GetSavedMoviesDto()

            jest.spyOn(moviesService, 'getSavedMovies').mockResolvedValue(
                expectedResult,
            )

            expect(await moviesController.getSaved(queryParms)).toBe(
                expectedResult,
            )
        })
    })

    describe('* Search Movie ', () => {
        const dto = new SearchMoviesDto()

        it('should return comment', async () => {
            const expectedResult = new Movie()

            jest.spyOn(moviesService, 'searchMovie').mockResolvedValue(
                expectedResult,
            )

            expect(await moviesService.searchMovie(dto)).toBe(expectedResult)
        })
    })
})
