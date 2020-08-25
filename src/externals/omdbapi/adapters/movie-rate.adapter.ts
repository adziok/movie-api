import { Exclude, Expose } from 'class-transformer'

import { OmdbapiRatingInterface } from '../interfaces/omdbapi-rating.interface'

export class MovieRateAdapter {
    @Exclude()
    private adaptee: OmdbapiRatingInterface

    constructor(adaptee: OmdbapiRatingInterface) {
        this.adaptee = adaptee
    }

    @Expose()
    get source() {
        return this.adaptee.Source
    }

    @Expose()
    get value() {
        return this.adaptee.Value
    }
}
