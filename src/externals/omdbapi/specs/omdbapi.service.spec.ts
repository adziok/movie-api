import { Test, TestingModule } from '@nestjs/testing'
import {
    BadRequestException,
    InternalServerErrorException,
} from '@nestjs/common'

import {
    omdbapiResponseMock,
    adaptedOmdbapiResponseMock,
    omdbapiErrorResponseMock,
} from './mocks/omdbapi-response.mock'
import { OmdbapiService } from '../omdbapi.service'
import { SearchMoviesDto } from '@shared/dtos/search-movies.dto'

describe('-- Omdbapi Service --', () => {
    let omdbapiService: OmdbapiService

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                OmdbapiService,
                {
                    provide: 'ConfigService',
                    useValue: {},
                },
            ],
        }).compile()

        omdbapiService = module.get<OmdbapiService>(OmdbapiService)
    })

    describe('* Adapte Api Response', () => {
        it('should return movie', async () => {
            const omdbapiResponse = omdbapiResponseMock

            const commentsServiceCreateComment = jest.spyOn(
                omdbapiService as any,
                'adapteApiResponse',
            )

            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            const result = omdbapiService.adapteApiResponse(omdbapiResponse)

            expect(commentsServiceCreateComment).toHaveBeenCalledWith(
                omdbapiResponse,
            )

            expect(result).toEqual(adaptedOmdbapiResponseMock)
        })

        it('should thow BadRequestException', async () => {
            try {
                const omdbapiErrorResponse = omdbapiErrorResponseMock

                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                omdbapiService.adapteApiResponse(omdbapiErrorResponse)
            } catch (error) {
                const instanceofBadRequestException =
                    error instanceof BadRequestException

                expect(instanceofBadRequestException).toBeTruthy()
            }
        })
    })

    describe('* Search', () => {
        it('should return movie', async () => {
            const searchMoviesDto = new SearchMoviesDto()

            const commentsServiceSearch = jest.spyOn(
                omdbapiService as any,
                'search',
            )

            const callOmdbapi = jest
                .spyOn(omdbapiService as any, 'callOmdbapi')
                .mockResolvedValue({ data: omdbapiResponseMock })

            const adapteApiResponse = jest
                .spyOn(omdbapiService as any, 'adapteApiResponse')
                .mockResolvedValue(adaptedOmdbapiResponseMock)

            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            const result = await omdbapiService.search(searchMoviesDto)

            expect(commentsServiceSearch).toHaveBeenCalledWith(searchMoviesDto)

            expect(callOmdbapi).toBeCalledWith(searchMoviesDto)

            expect(adapteApiResponse).toBeCalledWith(omdbapiResponseMock)

            expect(result).toEqual(adaptedOmdbapiResponseMock)
        })

        it('should thow InternalServerErrorException', async () => {
            try {
                const searchMoviesDto = new SearchMoviesDto()

                jest.spyOn(
                    omdbapiService as any,
                    'callOmdbapi',
                ).mockResolvedValue({ data: omdbapiResponseMock })

                jest.spyOn(
                    omdbapiService as any,
                    'adapteApiResponse',
                ).mockResolvedValue(null)

                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                await omdbapiService.search(searchMoviesDto)
            } catch (error) {
                const instanceofInternalServerErrorException =
                    error instanceof InternalServerErrorException

                expect(instanceofInternalServerErrorException).toBeTruthy()
            }
        })
    })
})
