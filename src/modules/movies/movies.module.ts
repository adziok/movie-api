import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';

import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';
import { Movie } from './model/movie.model';
import { MovieRepository } from './model/movie.repository';
import { OmdbapiModule } from '@externals/omdbapi/omdbapi.module';

@Module({
    imports: [
        TypegooseModule.forFeature([Movie]),
        OmdbapiModule,
    ],
    controllers: [MoviesController],
    providers: [MoviesService, MovieRepository],
    exports: [MoviesService],
})
export class MoviesModule {}
