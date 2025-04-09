import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { MovieProduction } from './movie-production.entity'

@Entity('productions')
export class Production {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @OneToMany(
    () => MovieProduction,
    (movieProduction) => movieProduction.production,
  )
  movies: MovieProduction[]
}
