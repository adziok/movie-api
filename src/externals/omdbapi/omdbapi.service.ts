import { classToPlain } from 'class-transformer';
import { OmdbapiMovieAdapter } from './adapters/omdbapi-movie.adapter';
import { OmdbapiResponseInterface } from './interfaces/omdbapi-response.interface';
import { ConfigService } from './../../shared/modules/config/config.service';
import { Injectable, Scope, InternalServerErrorException, BadRequestException } from '@nestjs/common';
import axios, { AxiosInstance, AxiosResponse } from 'axios'

import { SearchMoviesDto } from '@shared/dtos/search-movies.dto';
import { OmdbapiErrorResponseInterface } from './interfaces/omdbapi-error-response.interface';

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

    public async search(searchParams: SearchMoviesDto) {
        const { data: apiResponse} = await this.callOmdbapi(searchParams)

        const movie = this.adapteApiResponse(apiResponse)

        return movie
    }

    private adapteApiResponse(omdbapiResponse: OmdbapiResponseInterface & OmdbapiErrorResponseInterface) {
        if (omdbapiResponse.Error) {
            throw new BadRequestException(omdbapiResponse.Error)
        }

        return classToPlain(new OmdbapiMovieAdapter(omdbapiResponse as OmdbapiResponseInterface)) || new InternalServerErrorException('Problem with imdbapi.com')
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
