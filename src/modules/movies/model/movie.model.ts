import { MovieRate } from './movie-rate.model'
import { prop, arrayProp } from '@typegoose/typegoose'

import { BaseDBOBject } from '@shared/classes/base-db-model'
import { ImdbInfo } from './imdb-info.model'

export class Movie extends BaseDBOBject {
    @prop({ required: true })
    title: string

    @prop({ required: true })
    relasedAt: Date

    @prop()
    rated: string

    @prop()
    runtimeInMinutes: number

    @arrayProp({ items: String })
    genre: string[]

    @prop({ required: true })
    director: string

    @prop()
    writer: string

    @arrayProp({ items: String })
    actors: string[]

    @prop()
    plot: string

    @prop()
    language: string

    @prop()
    country: string

    @prop()
    awards: string

    @prop()
    poster: string

    @arrayProp({ items: MovieRate, _id: false })
    ratings: MovieRate[]

    @prop()
    metascore: number

    @prop({ _id: false })
    imdbInfo: ImdbInfo

    @prop()
    type: string

    @prop()
    dvdRelasedAt?: any

    @prop()
    boxOffice: string

    @prop()
    production: string

    @prop()
    website: string
}
