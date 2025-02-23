import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Movie } from './movie.entity'

@Entity('watch_links')
export class Watchlink {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ unique: true })
  link: string

  @ManyToOne(() => Movie, (movie) => movie.watchLinks)
  movie: Movie
}
