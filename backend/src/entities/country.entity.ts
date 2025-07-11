import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { MovieCountry } from './movie-country.entity'

@Entity('countries')
export class Country {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @OneToMany(() => MovieCountry, (movieCountry) => movieCountry.country)
  movies: MovieCountry[]
}
