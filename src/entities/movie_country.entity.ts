import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Country } from './country.entity'
import { Movie } from './movie.entity'

@Entity('movie_country')
export class MovieCountry {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => Movie, (movie) => movie.countries)
  movie: Movie

  @ManyToOne(() => Country, (country) => country.movies)
  country: Country
}
