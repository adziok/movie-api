import { OmdbapiErrorResponseInterface } from './../../interfaces/omdbapi-error-response.interface'
import { Movie } from './../../../../modules/movies/model/movie.model'
import { OmdbapiResponseInterface } from '../../interfaces/omdbapi-response.interface'

export const omdbapiErrorResponseMock: OmdbapiErrorResponseInterface = {
    Response: 'False',
    Error: 'Movie not found!',
}

export const omdbapiResponseMock: OmdbapiResponseInterface = {
    Title: 'Rocky',
    Year: '1976',
    Rated: 'PG',
    Released: '03 Dec 1976',
    Runtime: '120 min',
    Genre: 'Drama, Sport',
    Director: 'John G. Avildsen',
    Writer: 'Sylvester Stallone',
    Actors: 'Sylvester Stallone, Talia Shire, Burt Young, Carl Weathers',
    Plot:
        'A small-time boxer gets a supremely rare chance to fight a heavy-weight champion in a bout in which he strives to go the distance for his self-respect.',
    Language: 'English',
    Country: 'USA',
    Awards: 'Won 3 Oscars. Another 17 wins & 21 nominations.',
    Poster:
        'https://m.media-amazon.com/images/M/MV5BMTY5MDMzODUyOF5BMl5BanBnXkFtZTcwMTQ3NTMyNA@@._V1_SX300.jpg',
    Ratings: [
        {
            Source: 'Internet Movie Database',
            Value: '8.1/10',
        },
        {
            Source: 'Rotten Tomatoes',
            Value: '94%',
        },
        {
            Source: 'Metacritic',
            Value: '70/100',
        },
    ],
    Metascore: '70',
    imdbRating: '8.1',
    imdbVotes: '504,019',
    imdbID: 'tt0075148',
    Type: 'movie',
    DVD: '07 Aug 2006',
    BoxOffice: 'N/A',
    Production: 'United Artists',
    Website: 'N/A',
    Response: 'True',
}

export const adaptedOmdbapiResponseMock: Movie = {
    actors: [
        'Sylvester Stallone',
        'Talia Shire',
        'Burt Young',
        'Carl Weathers',
    ],
    awards: 'Won 3 Oscars. Another 17 wins & 21 nominations.',
    boxOffice: 'N/A',
    country: 'USA',
    director: 'John G. Avildsen',
    dvdRelasedAt: new Date('2006-08-06T22:00:00.000Z'),
    genre: ['Drama', 'Sport'],
    imdbInfo: {
        id: 'tt0075148',
        rating: 8.1,
        votes: 504019,
    },
    language: 'English',
    metascore: 70,
    plot:
        'A small-time boxer gets a supremely rare chance to fight a heavy-weight champion in a bout in which he strives to go the distance for his self-respect.',
    poster:
        'https://m.media-amazon.com/images/M/MV5BMTY5MDMzODUyOF5BMl5BanBnXkFtZTcwMTQ3NTMyNA@@._V1_SX300.jpg',
    production: 'United Artists',
    rated: 'PG',
    ratings: [
        {
            source: 'Internet Movie Database',
            value: '8.1/10',
        },
        {
            source: 'Rotten Tomatoes',
            value: '94%',
        },
        {
            source: 'Metacritic',
            value: '70/100',
        },
    ],
    relasedAt: new Date('1976-12-02T23:00:00.000Z'),
    runtimeInMinutes: 120,
    title: 'Rocky',
    type: 'movie',
    website: 'N/A',
    writer: 'Sylvester Stallone',
}
