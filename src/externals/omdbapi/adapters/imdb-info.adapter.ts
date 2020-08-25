import { Exclude, Expose } from 'class-transformer'

import { OmdbapiResponseInterface } from '../interfaces/omdbapi-response.interface'

export class ImdbInfoAdapter {
    @Exclude()
    private adaptee: OmdbapiResponseInterface

    constructor(adaptee: OmdbapiResponseInterface) {
        this.adaptee = adaptee
    }

    @Expose()
    get rating() {
        return Number(this.adaptee.imdbRating) || undefined
    }

    @Expose()
    get votes() {
        return Number(this.adaptee?.imdbVotes?.replace(/\D+/g, '')) || undefined
    }

    @Expose()
    get id() {
        return this.adaptee.imdbID
    }
}
