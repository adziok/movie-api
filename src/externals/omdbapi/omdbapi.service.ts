import axios, { AxiosInstance, AxiosResponse } from 'axios'
import { classToPlain } from 'class-transformer';
import { Injectable, Scope, InternalServerErrorException, BadRequestException } from '@nestjs/common';

import { OmdbapiMovieAdapter } from './adapters/omdbapi-movie.adapter';
import { OmdbapiResponseInterface } from './interfaces/omdbapi-response.interface';
import { ConfigService } from './../../shared/modules/config/config.service';
import { SearchMoviesDto } from '@shared/dtos/search-movies.dto';
import { OmdbapiErrorResponseInterface } from './interfaces/omdbapi-error-response.interface';
import { Movie } from '@modules/movies/model/movie.model';

@Injectable({ scope: Scope.DEFAULT })
export class OmdbapiService {
    private requestOmdbapi: AxiosInstance

    constructor(private config: ConfigService) {
        this.requestOmdbapi = axios.create({
            baseURL: this.config.omdbapiApiUrl,
            timeout: 10000,
            params: {
                apikey: this.config.omdbapiApiKey
            }
        });
    }

    public async search(searchParams: SearchMoviesDto): Promise<Movie> {
        const { data: apiResponse} = await this.callOmdbapi(searchParams)

        const movie = this.adapteApiResponse(apiResponse) 

        if (!movie) {
            throw new InternalServerErrorException('Problem with searching video on omdbapi.com')
        }

        return movie
    }

    private adapteApiResponse(omdbapiResponse: OmdbapiResponseInterface & OmdbapiErrorResponseInterface): Movie {
        if (omdbapiResponse.Error) {
            throw new BadRequestException(omdbapiResponse.Error)
        }

        return classToPlain(new OmdbapiMovieAdapter(omdbapiResponse)) as Movie
    }

    private callOmdbapi({ search }: SearchMoviesDto): Promise<AxiosResponse> {
        return this.requestOmdbapi({
            params: {
                t: search,
                v: 1,
            }
        })
    }

}
