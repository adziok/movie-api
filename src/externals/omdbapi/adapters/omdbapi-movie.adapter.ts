import { MovieRateAdapter } from './movie-rate.adapter';
import { Exclude, Expose, classToPlain } from 'class-transformer'

import { UNDEF_VAL } from '@shared/constants/undefined-value.const'
import { OmdbapiResponseInterface } from './../interfaces/omdbapi-response.interface'
import { ImdbInfoAdapter } from './imdb-info.adapter';


export class OmdbapiMovieAdapter {

    @Exclude()
    private adaptee: OmdbapiResponseInterface

    constructor(adaptee: OmdbapiResponseInterface) {
        this.adaptee = adaptee
    }

    @Expose()
    get title() {
        return this.adaptee.Title
    }

    @Expose()
    get relasedAt() {
        return this.adaptee.Released && new Date(this.adaptee.Released) || UNDEF_VAL
    }

    @Expose()
    get rated() {
        return this.adaptee.Rated
    }

    @Expose()
    get runtimeInMinutes(): number {
        return Number(this.adaptee?.Runtime?.split(' ')[0]) || undefined
    }

    @Expose()
    get genre(): string[] {
        return this.adaptee?.Genre?.split(',').map(genere => genere.trim()) || []
    }

    @Expose()
    get director() {
        return this.adaptee.Director
    }

    @Expose()
    get writer() {
        return this.adaptee.Writer || UNDEF_VAL
    }

    @Expose()
    get actors() {
        return this.adaptee.Actors?.split(',').map(genere => genere.trim()) || []
    }

    @Expose()
    get plot() {
        return this.adaptee.Plot
    }

    @Expose()
    get language() {
        return this.adaptee.Language
    }

    @Expose()
    get country() {
        return this.adaptee.Country
    }

    @Expose()
    get awards() {
        return this.adaptee.Awards
    }

    @Expose()
    get poster() {
        return this.adaptee.Poster
    }

    @Expose()
    get ratings() {
        return this.adaptee.Ratings?.map(rate => classToPlain(new MovieRateAdapter(rate))) || []
    }

    @Expose()
    get metascore(): number {
        return Number(this.adaptee.Metascore) || undefined 
    }

    @Expose()
    get imdbInfo() {
        return classToPlain(new ImdbInfoAdapter(this.adaptee)) || {}
    }

    @Expose()
    get type() {
        return this.adaptee.Type
    }

    @Expose()
    get dvdRelasedAt() {
        return this.adaptee.DVD && new Date(this.adaptee.DVD)
    }

    @Expose()
    get boxOffice() {
        return this.adaptee.BoxOffice
    }

    @Expose()
    get production() {
        return this.adaptee.Production
    }

    @Expose()
    get website() {
        return this.adaptee.Website
    }

}
