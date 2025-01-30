import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { MovieCountry } from './movie_country.entity'

@Entity('countries')
export class Country {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ unique: true })
  name: string

  @OneToMany(() => MovieCountry, (movieCountry) => movieCountry.country, {
    cascade: true,
  })
  movies: MovieCountry[]
}
