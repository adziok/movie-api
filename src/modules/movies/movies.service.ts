import { Injectable } from '@nestjs/common';

import { OmdbapiService } from '@externals/omdbapi/omdbapi.service';
import { MovieRepository } from './model/movie.repository';
import { SearchMoviesDto } from '@shared/dtos/search-movies.dto';

@Injectable()
export class MoviesService {
    constructor(
        private movieRepository: MovieRepository,
        private omdbapiService: OmdbapiService,    
    ) {}

    public async searchMovie(searchParams: SearchMoviesDto) {
        return this.omdbapiService.search(searchParams)
    }

}
