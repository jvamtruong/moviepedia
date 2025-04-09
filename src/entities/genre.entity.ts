import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { MovieGenre } from './movie-genre.entity'

@Entity('genres')
export class Genre {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @OneToMany(() => MovieGenre, (movieGenre) => movieGenre.genre)
  movies: MovieGenre[]
}
