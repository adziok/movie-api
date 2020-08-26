import { IsString, IsNotEmpty } from 'class-validator'

export class SearchMoviesDto {
    @IsString()
    @IsNotEmpty()
    search: string
}
