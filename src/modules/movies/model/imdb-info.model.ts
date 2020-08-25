import { prop } from '@typegoose/typegoose'

export class ImdbInfo {
    @prop()
    rating: number

    @prop()
    votes: number

    @prop()
    id: string
}
