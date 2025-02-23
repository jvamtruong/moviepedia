import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { MovieCountry } from './movie-country.entity'
import { MovieCast } from './movie-cast.entity'
import { MovieGenre } from './movie-genre.entity'
import { Watchlink } from './watchlink.entity'
import { Episode } from './episode.entity'
import { MovieProduction } from './movie-production.entity'

@Entity('movies')
export class Movie {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  title: string

  @Column()
  releasedAt: string

  @Column()
  src: string

  @Column()
  duration: string

  @Column()
  poster: string

  @Column({ type: 'text' })
  description: string

  @Column()
  imdbRating: string

  @Column()
  seasons: number

  @OneToMany(() => MovieGenre, (movieGenre) => movieGenre.movie, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  genres: MovieGenre[]

  @OneToMany(() => MovieCountry, (movieCountry) => movieCountry.movie, {
    cascade: true,
  })
  countries: MovieCountry[]

  @OneToMany(() => MovieCast, (movieCast) => movieCast.movie, {
    cascade: true,
  })
  casts: MovieCast[]

  @OneToMany(
    () => MovieProduction,
    (movieProduction) => movieProduction.movie,
    {
      cascade: true,
    },
  )
  productions: MovieProduction[]

  @OneToMany(() => Watchlink, (watchlink) => watchlink.movie, {
    cascade: true,
  })
  watchLinks: Watchlink[]

  @OneToMany(() => Episode, (episode) => episode.movie, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  episodes: Episode[]
}
