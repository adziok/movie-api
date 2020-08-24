import { Types } from 'mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { validate } from 'class-validator';

import { MovieRepository } from './../model/movie.repository';
import { MoviesService } from './../movies.service';
import { MovieRepositoryFake } from './movie.repository.fake';
import { Movie } from './../model/movie.model';

describe('MoviesService', () => {
    let moviesService: MoviesService;
    let movieRepository: MovieRepository;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                MoviesService,
                {
                    provide: MovieRepository,
                    useClass: MovieRepositoryFake,
                },
            ],
        }).compile();

        moviesService = module.get(MoviesService);
        movieRepository = module.get(MovieRepository);
    });

    describe('Create Movie', () => {
        it('calls the service with correct paramaters', async () => {
            // const newRoundAnswer: RoundAnswer = {
            //     ...createRoundAnswerDto,
            //     createdAt: new Date(),
            //     updatedAt: new Date(),
            //     _id: Types.ObjectId()
            // };

            // const roundAnswerServiceCreatePlayerAnswer = jest
            //     .spyOn(roundAnswerService, 'createPlayerAnswer')
            //     .mockResolvedValue(newRoundAnswer);

            // const result = await roundAnswerService.createPlayerAnswer(createRoundAnswerDto);

            // expect(roundAnswerServiceCreatePlayerAnswer).toHaveBeenCalledWith(createRoundAnswerDto);

            // expect(result).toEqual(await newRoundAnswer);
        });
    });

});

