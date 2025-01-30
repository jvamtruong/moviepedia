import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common'
import { MoviesService } from 'src/movies/services/movies/movies.service'

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  getAllMovies() {
    const movies = this.moviesService.getMovies()
    console.log('movie controller')
    return movies
  }

  @Get(':id/countries')
  getCountriesByMovie(@Param('id', ParseIntPipe) id: number) {
    return this.moviesService.getCountriesByMovie(id)
  }

  @Get('countries')
  getMovieCountries() {
    return this.moviesService.getMovieCountries()
  }
}

