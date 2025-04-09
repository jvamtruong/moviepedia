import { Movie } from './movie.entity'
import { Production } from './production.entity'
import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

@Entity('movie_production')
export class MovieProduction {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => Movie, (movie) => movie.productions)
  @JoinColumn({ name: 'movie_id' })
  movie: Movie

  @ManyToOne(() => Production, (production) => production.movies)
  @JoinColumn({ name: 'production_id' })
  production: Production
}