import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { MovieCast } from './movie-cast.entity'

@Entity('casts')
export class Cast {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  avatar: string

  @OneToMany(() => MovieCast, (movieCast) => movieCast.cast)
  movies: MovieCast[]
}
