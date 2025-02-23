import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Movie } from './movie.entity'

@Entity('episodes')
export class Episode {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  season: number

  @Column()
  number: number

  @Column()
  title: string

  @Column()
  link: string

  @ManyToOne(() => Movie, (movie) => movie.episodes, { onDelete: 'CASCADE' })
  movie: Movie
}
