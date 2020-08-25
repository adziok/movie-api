import { Controller, Get, Query, Post, Body } from '@nestjs/common'

import { MoviesService } from './movies.service'
import { SearchMoviesDto } from '@shared/dtos/search-movies.dto'
import { GetSavedMoviesDto } from './dtos/get-saved-movies.dto'

@Controller('/movies')
export class MoviesController {
    constructor(private readonly moviesService: MoviesService) {}

    @Post()
    public search(@Body() searchParams: SearchMoviesDto) {
        return this.moviesService.searchMovie(searchParams)
    }

    @Get()
    public getSaved(@Query() params: GetSavedMoviesDto) {
        return this.moviesService.getSavedMovies(params)
    }
}
