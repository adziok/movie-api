import { IsString, Length, IsNotEmpty } from 'class-validator'

export class CreateCommentDto {
    @IsString()
    @IsNotEmpty()
    @Length(1, 20)
    owner: string

    @IsString()
    @IsNotEmpty()
    @Length(1, 2048)
    content: string

}
