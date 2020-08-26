import { Movie } from './model/movie.model'
import { Injectable } from '@nestjs/common'

import { OmdbapiService } from '@externals/omdbapi/omdbapi.service'
import { SearchMoviesDto } from '@shared/dtos/search-movies.dto'
import { MovieRepository } from './model/movie.repository'
import { GetSavedMoviesDto } from './dtos/get-saved-movies.dto'

@Injectable()
export class MoviesService {
    constructor(
        private movieRepository: MovieRepository,
        private omdbapiService: OmdbapiService,
    ) {}

    public async searchMovie(searchParams: SearchMoviesDto) {
        const movie = await this.omdbapiService.search(searchParams)

        const savedMovie = await this.saveMovie(movie)

        return savedMovie
    }

    public async getSavedMovies(getSavedMoviesDto: GetSavedMoviesDto) {
        const savedMovies = await this.movieRepository.find(getSavedMoviesDto)

        return savedMovies
    }

    private async saveMovie(dto: Movie) {
        return await this.movieRepository.createIfNotExists(dto)
    }
}
