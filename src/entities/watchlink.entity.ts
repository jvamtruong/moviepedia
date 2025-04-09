import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Movie } from './movie.entity'

@Entity('watch_links')
export class Watchlink {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  link: string

  @ManyToOne(() => Movie, (movie) => movie.watchLinks)
  @JoinColumn({ name: 'movie_id' })
  movie: Movie
}
