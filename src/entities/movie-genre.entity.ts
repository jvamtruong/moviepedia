import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Movie } from './movie.entity'
import { Genre } from './genre.entity'

@Entity('movie_genre')
export class MovieGenre {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => Movie, (movie) => movie.genres)
  movie: Movie

  @ManyToOne(() => Genre, (genre) => genre.movies, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  genre: Genre
}
