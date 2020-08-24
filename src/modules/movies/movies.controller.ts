import { Controller, Get, Query } from '@nestjs/common';

import { MoviesService } from './movies.service';
import { SearchMoviesDto } from '@shared/dtos/search-movies.dto';

@Controller('/movies')
export class MoviesController {
    constructor(private readonly moviesService: MoviesService) {}

    @Get()
    public search(@Query() searchParams: SearchMoviesDto) {
        return this.moviesService.searchMovie(searchParams)
    }

}
