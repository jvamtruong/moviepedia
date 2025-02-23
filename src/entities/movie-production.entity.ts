import { Movie } from './movie.entity'
import { Production } from './production.entity'
import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

@Entity('movie_production')
export class MovieProduction {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => Movie, (movie) => movie.productions)
  movie: Movie

  @ManyToOne(() => Production, (production) => production.movies)
  production: Production
}
