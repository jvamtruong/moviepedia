import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Movie } from './movie.entity'
import { Cast } from './cast.entity'

@Entity('movie_cast')
export class MovieCast {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => Movie, (movie) => movie.casts)
  movie: Movie

  @ManyToOne(() => Cast, (cast) => cast.movies)
  cast: Cast
}
