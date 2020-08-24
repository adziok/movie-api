import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from "@typegoose/typegoose";

import { Movie } from './movie.model';
import { GetSavedMoviesDto } from '../dto/get-saved-movies.dto';

@Injectable()
export class MovieRepository {
    constructor(@InjectModel(Movie) private readonly movieModel: ReturnModelType<typeof Movie>) { }

    public async createIfNotExists(dto: Movie): Promise<Movie> {
        const existingMovie = await this.movieModel.findOne({ title: dto.title, relasedAt: dto.relasedAt })

        if (existingMovie) {
            return existingMovie;
        }

        return this.movieModel.create(dto)
    }

    public async find({ limit, skip }: GetSavedMoviesDto): Promise<Movie[]> {
        return this.movieModel.find().limit(limit).skip(skip)
    }
}
