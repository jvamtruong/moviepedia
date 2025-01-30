import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { MovieCountry } from './movie_country.entity'

@Entity('movies')
export class Movie {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  releasedAt: string

  // genres

  @OneToMany(() => MovieCountry, (movieCountry) => movieCountry.movie, {
    cascade: true,
  })
  countries: MovieCountry[]
  // casts
  // productions

  @Column()
  page_url: string

  // watch_links

  @Column()
  duration: string

  @Column()
  poster: string

  @Column()
  trailer: string

  @Column({ type: 'text' })
  description: string

  @Column()
  imdbRating: string

  @Column()
  seasons: number

  // episodes
}
