import { IsNumber, IsString, Min, Max, IsNotEmpty } from 'class-validator'

export class SearchMoviesDto {
    @IsNumber()
    @Min(1)
    @Max(20)
    perPage = 10

    @IsString()
    @IsNotEmpty()
    search: string
}
