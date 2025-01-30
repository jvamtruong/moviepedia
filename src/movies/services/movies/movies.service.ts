import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Movie } from 'src/entities/movie.entity'
import { MovieCountry } from 'src/entities/movie_country.entity'
import { Repository } from 'typeorm'

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,
    @InjectRepository(MovieCountry)
    private readonly movieCountryRepository: Repository<MovieCountry>,
  ) {}

  async getMovies(): Promise<Movie[]> {
    const movies = await this.movieRepository.find({ take: 32 })
    console.log('movie service')
    return movies
  }

  async getCountriesByMovie(movieId: number) {
    return await this.movieRepository.findOne({
      where: { id: movieId },
      relations: ['countries', 'countries.country'],
    })
  }

  async getMovieCountries() {
    return await this.movieCountryRepository.find({
      relations: ['movie', 'country'],
    })
  }
}
