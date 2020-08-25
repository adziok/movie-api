import { IsNumber, Min, Max } from 'class-validator'

export class GetCommentsDto {
    @IsNumber()
    @Min(1)
    @Max(20)
    limit = 10

    @IsNumber()
    @Min(0)
    skip = 0

}
