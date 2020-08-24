import { prop } from '@typegoose/typegoose';

export class MovieRate {
    @prop()
    source: string

    @prop()
    value: string
}
