import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Movie } from './movie.entity'
import { Cast } from './cast.entity'

@Entity('movie_cast')
export class MovieCast {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => Movie, (movie) => movie.casts)
  @JoinColumn({ name: 'movie_id'})
  movie: Movie

  @ManyToOne(() => Cast, (cast) => cast.movies)
  @JoinColumn({ name: 'cast_id'})
  cast: Cast
}
