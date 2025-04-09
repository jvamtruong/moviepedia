import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Country } from './country.entity'
import { Movie } from './movie.entity'

@Entity('movie_country')
export class MovieCountry {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => Movie, (movie) => movie.countries)
  @JoinColumn({ name: 'movie_id' })
  movie: Movie

  @ManyToOne(() => Country, (country) => country.movies)
  @JoinColumn({ name: 'country_id' })
  country: Country
}
