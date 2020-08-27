import { prop, modelOptions, Severity } from '@typegoose/typegoose'
import { Schema } from 'mongoose'

import { MovieRate } from './movie-rate.model'
import { BaseDBOBject } from '@shared/classes/base-db-model'
import { ImdbInfo } from './imdb-info.model'

@modelOptions({ options: { allowMixed: Severity.ALLOW } })
export class Movie extends BaseDBOBject {
    @prop({ required: true })
    title: string

    @prop({ required: true })
    relasedAt: Date

    @prop()
    rated: string

    @prop()
    runtimeInMinutes: number

    @prop({ type: String })
    genre: string[]

    @prop({ required: true })
    director: string

    @prop()
    writer: string

    @prop({ type: String })
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

    @prop({ type: MovieRate, _id: false })
    ratings: MovieRate[]

    @prop()
    metascore: number

    @prop({ _id: false })
    imdbInfo: ImdbInfo

    @prop()
    type: string

    @prop({ type: Schema.Types.Mixed })
    dvdRelasedAt?: any

    @prop()
    boxOffice: string

    @prop()
    production: string

    @prop()
    website: string
}
