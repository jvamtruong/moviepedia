import { Episode } from 'src/entities/episode.entity'

export class RawMovieDto {
  title: string
  src: string
  releasedAt: string
  description: string
  poster: string
  duration: string
  seasons: number
  imdbRating: string
  genres: string[]
  countries: string[]
  productions: string[]
  casts: string[]
  episodes: Episode[]
}
