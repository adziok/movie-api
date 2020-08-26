import { GetSavedMoviesDto } from './../dtos/get-saved-movies.dto';
import { SearchMoviesDto } from './../../../shared/dtos/search-movies.dto';
import { Test, TestingModule } from '@nestjs/testing'

import { MovieRepository } from '../model/movie.repository'
import { MoviesService } from '../movies.service'
import { MockType, repositoryMockFactory } from '@shared/utils/specs.utils'
import { Movie } from '../model/movie.model'
import { mockOmdbapiServiceFactory } from './mocks/mock-omdbapi.service.factory';
import { OmdbapiService } from '@externals/omdbapi/omdbapi.service';

describe('-- Movies Service --', () => {
    let moviesService: MoviesService
    let movieRepositoryMock: MockType<MovieRepository>
    let omdbapiServiceMock: MockType<OmdbapiService>

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                MoviesService,
                {
                    provide: 'OmdbapiService',
                    useFactory: mockOmdbapiServiceFactory
                },
                {
                    provide: 'MovieRepository',
                    useFactory: repositoryMockFactory,
                },
            ],
        }).compile()

        moviesService = module.get(MoviesService)
        movieRepositoryMock = module.get('MovieRepository')
        omdbapiServiceMock = module.get('OmdbapiService')
    })

    describe('* Search Movie', () => {
        it('get movie from external service, save in database and return saved movie', async () => {
            const searchMoviesDto = new SearchMoviesDto()

            const newMovie = new Movie()

            jest.spyOn(omdbapiServiceMock, 'search').mockReturnValue(
                newMovie,
            )

            jest.spyOn(movieRepositoryMock, 'createIfNotExists').mockReturnValue(
                newMovie,
            )

            const moviesServiceSearchMovie = jest.spyOn(
                moviesService,
                'searchMovie',
            )

            const result = await moviesService.searchMovie(searchMoviesDto)

            expect(moviesServiceSearchMovie).toHaveBeenCalledWith(
                searchMoviesDto,
            )

            expect(result).toEqual(newMovie)
        })
    })
    
    describe('* Get Saved Movies', () => {
        it('return saved movies in database', async () => {
            const gerSavedMoviesDto = new GetSavedMoviesDto()

            const movies = [new Movie()]

            jest.spyOn(movieRepositoryMock, 'find').mockReturnValue(
                movies,
            )

            const moviesServiceGetSavedMovies = jest.spyOn(
                moviesService,
                'getSavedMovies',
            )

            const result = await moviesService.getSavedMovies(gerSavedMoviesDto)

            expect(moviesServiceGetSavedMovies).toHaveBeenCalledWith(
                gerSavedMoviesDto,
            )

            expect(result).toEqual(movies)
        })
    })
})
