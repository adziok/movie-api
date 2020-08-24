import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from "@typegoose/typegoose";

import { Movie } from './movie.model';

const logger = new Logger('MovieRepository');

@Injectable()
export class MovieRepository {
    constructor(@InjectModel(Movie) private readonly movieModel: ReturnModelType<typeof Movie>) { }
}
